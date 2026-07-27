import * as THREE from 'three'

/**
 * 스크롤 구동 5장면 캐릭터 스토리.
 * 대기 → 넥타이 비행 → 넥타이 착용 → 노트북 비행 → 자신 있게 제시.
 *
 * 전부 절차 생성 지오메트리다. 텍스처에 글자를 그리지 않고,
 * 노트북 화면도 추상 그래픽(선·노드·파형)만 캔버스로 그린다.
 * progress는 0~5 연속값이고, 스크롤을 되감으면 정확히 역재생된다.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
const smooth = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/** 천이 자리 잡을 때의 부드러운 오버슈트 */
const outBack = (t: number) => {
  const c = 1.9
  const u = t - 1
  return 1 + (c + 1) * u * u * u + c * u * u
}

/* ---------- 재질 팔레트 (흰 배경 · 차콜 · 은은한 블루 파이핑) ---------- */
const M = {
  skin: new THREE.MeshStandardMaterial({ color: 0xf5cfae, roughness: 0.58 }),
  hair: new THREE.MeshStandardMaterial({ color: 0x1b1b1e, roughness: 0.82 }),
  suit: new THREE.MeshStandardMaterial({ color: 0x2c2c31, roughness: 0.76 }),
  trouser: new THREE.MeshStandardMaterial({ color: 0x1c1c1f, roughness: 0.8 }),
  shirt: new THREE.MeshStandardMaterial({ color: 0xfafbfc, roughness: 0.55 }),
  tie: new THREE.MeshStandardMaterial({ color: 0x131317, roughness: 0.68 }),
  piping: new THREE.MeshStandardMaterial({ color: 0x1e4a8f, roughness: 0.55 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x232326, roughness: 0.75 }),
  laptop: new THREE.MeshStandardMaterial({ color: 0xc9cdd4, roughness: 0.34, metalness: 0.6 }),
  bezel: new THREE.MeshStandardMaterial({ color: 0x232428, roughness: 0.5, metalness: 0.3 }),
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  m.castShadow = true
  return m
}

/** 노트북 화면: 글자·숫자·기호 없이 추상 그래픽만 그린다. */
function drawScreen(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 336
  const ctx = c.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, 0, 336)
  g.addColorStop(0, '#081831')
  g.addColorStop(1, '#050f22')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 512, 336)

  ctx.strokeStyle = 'rgba(110, 180, 255, 0.06)'
  ctx.lineWidth = 1
  for (let x = 32; x < 512; x += 48) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 336)
    ctx.stroke()
  }
  for (let y = 28; y < 336; y += 44) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }

  ctx.shadowColor = 'rgba(90, 210, 255, 0.9)'
  ctx.shadowBlur = 10
  ctx.strokeStyle = 'rgba(110, 216, 255, 0.85)'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0; x <= 512; x += 4) {
    const y = 226 + Math.sin(x * 0.021) * 16 + Math.sin(x * 0.052 + 1.4) * 7
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  const pts: Array<[number, number]> = [
    [86, 84], [168, 56], [256, 96], [344, 62], [420, 104],
    [128, 142], [230, 158], [330, 140], [408, 168],
  ]
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [2, 6], [3, 7], [4, 8], [5, 6], [6, 7]]
  ctx.shadowBlur = 0
  ctx.strokeStyle = 'rgba(110, 190, 255, 0.28)'
  ctx.lineWidth = 1.2
  for (const [a, b] of links) {
    ctx.beginPath()
    ctx.moveTo(pts[a][0], pts[a][1])
    ctx.lineTo(pts[b][0], pts[b][1])
    ctx.stroke()
  }
  ctx.shadowColor = 'rgba(90, 210, 255, 1)'
  ctx.shadowBlur = 8
  ctx.fillStyle = 'rgba(150, 226, 255, 0.95)'
  for (const [x, y] of pts) {
    ctx.beginPath()
    ctx.arc(x, y, 3.4, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.shadowBlur = 0
  ctx.strokeStyle = 'rgba(130, 200, 255, 0.35)'
  ctx.fillStyle = 'rgba(90, 160, 240, 0.08)'
  ctx.lineWidth = 1.5
  const panel = (x: number, y: number, w: number, h: number) => {
    ctx.beginPath()
    if (typeof ctx.roundRect === 'function') ctx.roundRect(x, y, w, h, 8)
    else ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
  }
  panel(28, 250, 120, 62)
  panel(372, 236, 112, 54)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

interface Limb {
  shoulder: THREE.Group
  elbow: THREE.Group
}

function buildArm(side: 1 | -1): Limb {
  const shoulder = new THREE.Group()
  shoulder.position.set(0.19 * side, 1.475, 0)
  const upper = mesh(new THREE.CapsuleGeometry(0.047, 0.19, 6, 12), M.suit, 0, -0.13, 0)
  shoulder.add(upper)
  const elbow = new THREE.Group()
  elbow.position.set(0, -0.255, 0)
  const fore = mesh(new THREE.CapsuleGeometry(0.041, 0.16, 6, 12), M.suit, 0, -0.105, 0)
  elbow.add(fore)
  const hand = mesh(new THREE.SphereGeometry(0.05, 14, 12), M.skin, 0, -0.23, 0)
  hand.scale.set(0.82, 1.0, 0.6)
  elbow.add(hand)
  shoulder.add(elbow)
  return { shoulder, elbow }
}

export interface Story {
  update(p: number, time: number, reduce: boolean): void
  render(): void
  setSize(w: number, h: number): void
  setParallax(x: number, y: number): void
  dispose(): void
}

export function createStory(canvas: HTMLCanvasElement): Story {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setClearColor(0xffffff)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40)

  /* ---------- 조명: 좌상단 키 + 정면 필 + 차가운 림 ---------- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe3e7ee, 0.95))
  const key = new THREE.DirectionalLight(0xffffff, 2.0)
  key.position.set(-1.6, 4.6, 2.4)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -1.4
  key.shadow.camera.right = 1.4
  key.shadow.camera.top = 3
  key.shadow.camera.bottom = -0.5
  key.shadow.radius = 7
  key.shadow.bias = -0.0004
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.6)
  fill.position.set(0.6, 1.6, 4)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(0xcfe0ff, 0.9)
  rim.position.set(1.8, 2.6, -2.6)
  scene.add(rim)

  // 바닥: 흰 무광판(빛·톤매핑 무시 — ACES가 순백을 회색으로 누르면 지평선 띠가 생긴다)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)
  const shadowCatcher = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.ShadowMaterial({ opacity: 0.13 })
  )
  shadowCatcher.rotation.x = -Math.PI / 2
  shadowCatcher.position.y = 0.001
  shadowCatcher.receiveShadow = true
  scene.add(shadowCatcher)

  /* ---------- 캐릭터 ---------- */
  const figure = new THREE.Group()
  scene.add(figure)

  // 다리·엉덩이 — 재킷 밑단 안쪽으로 넣는다. 반지름이 겹치면 밑단에 z-fight 줄이 생긴다.
  const hips = mesh(new THREE.CylinderGeometry(0.116, 0.104, 0.2, 20), M.trouser, 0, 0.92, 0)
  hips.scale.z = 0.72
  figure.add(hips)
  for (const s of [1, -1] as const) {
    const leg = mesh(new THREE.CapsuleGeometry(0.06, 0.7, 6, 12), M.trouser, 0.066 * s, 0.46, 0)
    figure.add(leg)
    const shoe = mesh(new THREE.SphereGeometry(0.068, 12, 10), M.dark, 0.066 * s, 0.034, 0.045)
    shoe.scale.set(0.85, 0.5, 1.55)
    figure.add(shoe)
  }

  // 몸통(재킷) — 어깨는 넓고 허리로 좁아진다. 앞뒤로 눌러 통짜 원통 느낌을 뺀다.
  const torso = new THREE.Group()
  figure.add(torso)
  const jacket = mesh(new THREE.CylinderGeometry(0.168, 0.126, 0.5, 24), M.suit, 0, 1.27, 0)
  jacket.scale.z = 0.76
  torso.add(jacket)
  for (const s of [1, -1] as const) {
    const pad = mesh(new THREE.SphereGeometry(0.095, 14, 12), M.suit, 0.155 * s, 1.485, 0)
    pad.scale.set(1.05, 0.72, 0.82)
    torso.add(pad)
  }
  // 셔츠 가슴판 — 재킷 앞섶 사이 좁은 V. 위 끝은 라펠 뒤로 숨긴다.
  const chest = mesh(new THREE.BoxGeometry(0.08, 0.2, 0.016), M.shirt, 0, 1.4, 0.118)
  chest.rotation.x = -0.05
  torso.add(chest)
  // 라펠 — 가슴판을 덮을 만큼 넓게
  for (const s of [1, -1] as const) {
    const lapel = mesh(new THREE.BoxGeometry(0.074, 0.235, 0.016), M.suit, 0.064 * s, 1.415, 0.126)
    lapel.rotation.z = -0.21 * s
    lapel.rotation.x = -0.05
    torso.add(lapel)
    const pipe = mesh(new THREE.BoxGeometry(0.005, 0.21, 0.017), M.piping, 0.031 * s, 1.41, 0.127)
    pipe.rotation.z = -0.21 * s
    pipe.rotation.x = -0.05
    torso.add(pipe)
  }
  // 셔츠 칼라 — 장면 3에서 닫힌다
  const collars: THREE.Mesh[] = []
  for (const s of [1, -1] as const) {
    const col = mesh(new THREE.BoxGeometry(0.04, 0.028, 0.011), M.shirt, 0.029 * s, 1.542, 0.094)
    col.rotation.y = -0.55 * s
    col.rotation.z = -0.08 * s
    collars.push(col)
    torso.add(col)
  }

  const armR = buildArm(1)
  const armL = buildArm(-1)
  torso.add(armR.shoulder, armL.shoulder)

  // 목·머리
  torso.add(mesh(new THREE.CylinderGeometry(0.046, 0.052, 0.1, 12), M.skin, 0, 1.57, 0))
  const head = new THREE.Group()
  head.position.set(0, 1.615, 0)
  torso.add(head)
  const skull = mesh(new THREE.SphereGeometry(0.147, 26, 22), M.skin, 0, 0.13, 0)
  skull.scale.set(0.93, 1.06, 0.96)
  head.add(skull)
  for (const s of [1, -1] as const) {
    const ear = mesh(new THREE.SphereGeometry(0.027, 10, 8), M.skin, 0.132 * s, 0.11, -0.012)
    ear.scale.set(0.5, 1, 0.7)
    head.add(ear)
  }
  // 헤어: 넉넉한 돔 하나로 이마 위 일자 앞머리 라인을 만든다.
  // 조각을 여러 개 붙이면 정수리 z-fight·혹처럼 보이는 문제가 생겨서 단순하게 간다.
  const dome = mesh(
    new THREE.SphereGeometry(0.158, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.4),
    M.hair,
    0,
    0.14,
    -0.01
  )
  dome.scale.set(0.98, 1.0, 0.98)
  dome.rotation.x = 0.1
  head.add(dome)
  // 옆머리는 귀 뒤로 붙인다 — 앞으로 나오면 헤드폰처럼 보인다
  for (const s of [1, -1] as const) {
    const side = mesh(new THREE.SphereGeometry(0.06, 12, 10), M.hair, 0.122 * s, 0.14, -0.022)
    side.scale.set(0.38, 0.8, 0.68)
    head.add(side)
  }
  const nape = mesh(new THREE.SphereGeometry(0.09, 14, 12), M.hair, 0, 0.09, -0.095)
  nape.scale.set(1.0, 0.75, 0.45)
  head.add(nape)
  // 눈·눈썹·코·입 — 두피 밖으로 확실히 내민다
  const eyes: THREE.Mesh[] = []
  const brows: THREE.Mesh[] = []
  for (const s of [1, -1] as const) {
    const eye = mesh(new THREE.SphereGeometry(0.019, 12, 10), M.hair, 0.052 * s, 0.14, 0.134)
    eye.scale.set(1.2, 0.55, 0.5)
    eyes.push(eye)
    head.add(eye)
    const brow = mesh(new THREE.BoxGeometry(0.05, 0.0085, 0.007), M.hair, 0.054 * s, 0.182, 0.138)
    brow.rotation.z = -0.05 * s
    brows.push(brow)
    head.add(brow)
  }
  const nose = mesh(new THREE.SphereGeometry(0.017, 10, 8), M.skin, 0, 0.1, 0.148)
  nose.scale.set(0.7, 1.05, 0.75)
  head.add(nose)
  const mouthLine = mesh(new THREE.BoxGeometry(0.042, 0.0058, 0.005), M.hair, 0, 0.052, 0.142)
  head.add(mouthLine)
  const mouthOpen = mesh(new THREE.SphereGeometry(0.015, 12, 10), M.hair, 0, 0.05, 0.139)
  mouthOpen.scale.set(0.9, 0.01, 0.4)
  head.add(mouthOpen)
  const smileArc = 1.7
  const mouthSmile = mesh(new THREE.TorusGeometry(0.024, 0.0048, 8, 16, smileArc), M.hair, 0, 0.062, 0.139)
  mouthSmile.rotation.z = 1.5 * Math.PI - smileArc / 2
  mouthSmile.scale.setScalar(0.001)
  head.add(mouthSmile)

  /* ---------- 넥타이 ---------- */
  // 넥타이: 매듭 + 두 마디 블레이드. 아랫마디가 접히며 날면 막대가 아니라 리본으로 읽힌다.
  const tie = new THREE.Group()
  const knot = mesh(new THREE.SphereGeometry(0.028, 10, 8), M.tie, 0, 0, 0)
  knot.scale.set(0.95, 0.85, 0.6)
  tie.add(knot)
  const bladeTop = mesh(new THREE.BoxGeometry(0.044, 0.15, 0.011), M.tie, 0, -0.09, 0.004)
  tie.add(bladeTop)
  const bladeLow = new THREE.Group()
  bladeLow.position.set(0, -0.163, 0.004)
  const bladeLowMesh = mesh(new THREE.BoxGeometry(0.042, 0.13, 0.01), M.tie, 0, -0.065, 0)
  const tip = mesh(new THREE.ConeGeometry(0.028, 0.04, 4), M.tie, 0, -0.148, 0)
  tip.rotation.y = Math.PI / 4
  tip.rotation.x = Math.PI
  tip.scale.z = 0.26
  bladeLow.add(bladeLowMesh, tip)
  tie.add(bladeLow)
  tie.visible = false
  scene.add(tie)
  const tiePath = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(1.25, 2.05, 0.5),
    new THREE.Vector3(0.55, 1.82, 0.5),
    new THREE.Vector3(0.02, 1.6, 0.18)
  )
  const tieHome = new THREE.Vector3(0, 1.548, 0.128)

  /* ---------- 노트북 — 힌지는 카메라 쪽. 열리면 화면이 관객을 향한다 ---------- */
  const laptop = new THREE.Group()
  const base = mesh(new THREE.BoxGeometry(0.42, 0.016, 0.29), M.laptop, 0, 0, 0)
  laptop.add(base)
  const lid = new THREE.Group()
  lid.position.set(0, 0.01, 0.142)
  const lidPlate = mesh(new THREE.BoxGeometry(0.42, 0.013, 0.28), M.laptop, 0, 0.006, -0.14)
  lid.add(lidPlate)
  const bezelPlate = mesh(new THREE.BoxGeometry(0.4, 0.002, 0.262), M.bezel, 0, 0.0135, -0.14)
  lid.add(bezelPlate)
  const screenTex = drawScreen()
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.382, 0.244),
    new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false })
  )
  screen.rotation.x = -Math.PI / 2
  screen.rotation.z = Math.PI
  screen.position.set(0, 0.0155, -0.14)
  lid.add(screen)
  laptop.add(lid)
  laptop.visible = false
  scene.add(laptop)
  const lapPath = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-1.45, 2.3, 0.7),
    new THREE.Vector3(-0.75, 1.85, 0.68),
    new THREE.Vector3(-0.14, 1.42, 0.5)
  )
  const lapHome = new THREE.Vector3(0, 1.17, 0.42)

  /* ---------- 카메라 키프레임 (장면 경계 0~5) ---------- */
  const camPos = [
    new THREE.Vector3(0, 1.34, 2.6),
    new THREE.Vector3(0, 1.37, 2.52),
    new THREE.Vector3(0, 1.45, 2.24),
    new THREE.Vector3(0, 1.44, 2.28),
    new THREE.Vector3(0, 1.37, 2.66),
    new THREE.Vector3(0, 1.3, 2.5),
  ]
  const camLook = [
    new THREE.Vector3(0, 1.29, 0),
    new THREE.Vector3(0, 1.33, 0),
    new THREE.Vector3(0, 1.46, 0),
    new THREE.Vector3(0, 1.44, 0),
    new THREE.Vector3(0, 1.32, 0),
    new THREE.Vector3(0, 1.26, 0),
  ]
  const cp = new THREE.Vector3()
  const cl = new THREE.Vector3()
  const par = new THREE.Vector2()
  const parTarget = new THREE.Vector2()
  let aspect = 1

  const v3 = new THREE.Vector3()

  function update(p: number, time: number, reduce: boolean) {
    /* 카메라 */
    const i = Math.min(4, Math.floor(p))
    const t = smooth(clamp01(p - i))
    cp.lerpVectors(camPos[i], camPos[i + 1], t)
    cl.lerpVectors(camLook[i], camLook[i + 1], t)
    if (aspect < 0.85) cp.z *= Math.pow(0.85 / aspect, 0.9)
    if (!reduce) {
      par.lerp(parTarget, 0.06)
      cp.x += par.x * 0.06
      cp.y += par.y * 0.04
    }
    camera.position.copy(cp)
    camera.lookAt(cl)

    /* 유휴 호흡 — 시간 기반, 감속 모드에선 정지 */
    const breath = reduce ? 0 : Math.sin(time * 1.7) * 0.005
    torso.scale.y = 1 + breath
    figure.rotation.y = reduce ? 0 : Math.sin(time * 0.4) * 0.016

    /* 넥타이 비행 (1→2) — 넓은 면이 카메라를 보도록 리본처럼 기울여 난다 */
    const tf = smooth(seg(p, 1.05, 2))
    tie.visible = p > 0.98
    if (p < 2) {
      tiePath.getPoint(tf, v3)
      tie.position.copy(v3)
      tie.rotation.set(
        (reduce ? 0 : Math.sin(tf * 12) * 0.25 * (1 - tf)) + lerp(0.35, 0, tf),
        lerp(0.85, 0.1, tf),
        lerp(-0.95, 0.04, tf)
      )
      knot.scale.setScalar(0.001)
      // 아랫마디가 펄럭인다 — 천이라는 신호는 여기서 나온다
      bladeLow.rotation.x = (reduce ? 0.3 : Math.sin(tf * 11 + 1) * 0.7) * (1 - tf)
    } else {
      /* 착용 (2→3): 오버슈트로 자리 잡는 천 */
      const w = seg(p, 2, 2.8)
      const wb = outBack(smooth(w))
      tie.position.lerpVectors(tiePath.getPoint(1, v3), tieHome, smooth(w))
      tie.rotation.set(-0.4 * (1 - wb), 0.1 * (1 - wb), 0.04 * (1 - wb))
      const ks = smooth(seg(p, 2.1, 2.5))
      knot.scale.set(0.95 * ks, 0.85 * ks, 0.6 * ks)
      bladeLow.rotation.x = 0.35 * (1 - wb)
      bladeTop.scale.y = lerp(0.8, 1, wb)
    }
    const cc = smooth(seg(p, 2.15, 2.75))
    collars[0].rotation.y = lerp(-0.55, -0.16, cc)
    collars[1].rotation.y = lerp(0.55, 0.16, cc)

    /* 노트북 비행 (3→4) → 제시 (4→5) */
    laptop.visible = p > 2.98
    const lf = smooth(seg(p, 3.05, 3.95))
    const lh = smooth(seg(p, 4, 4.75))
    if (p < 4) {
      lapPath.getPoint(lf, v3)
      laptop.position.copy(v3)
      laptop.rotation.set(
        (reduce ? 0 : Math.sin(lf * 9) * 0.18 * (1 - lf)) + lerp(0.45, 0.08, lf),
        lerp(-2.2, -0.2, lf),
        lerp(0.4, 0.05, lf)
      )
      lid.rotation.x = 0.1
    } else {
      laptop.position.lerpVectors(lapPath.getPoint(1, v3), lapHome, lh)
      laptop.rotation.set(lerp(0.08, -0.05, lh), lerp(-0.2, 0, lh), lerp(0.05, 0, lh))
      lid.rotation.x = lerp(0.1, 1.8, smooth(seg(p, 4.2, 4.8)))
    }

    /* 팔 포즈 */
    const reach = smooth(seg(p, 3.15, 3.9))
    const hold = smooth(seg(p, 4, 4.65))
    armR.shoulder.rotation.x = lerp(lerp(-0.05, -1.02, reach), -0.9, hold)
    armR.shoulder.rotation.z = lerp(0.07, 0.1, hold)
    armR.elbow.rotation.x = lerp(lerp(-0.06, -0.4, reach), -0.66, hold)
    armL.shoulder.rotation.x = lerp(-0.4, -0.9, hold)
    armL.shoulder.rotation.z = lerp(-0.06, -0.1, hold)
    armL.elbow.rotation.x = lerp(0.85, -0.66, hold)

    /* 얼굴 */
    const s1 = smooth(seg(p, 1.2, 1.6)) * (1 - smooth(seg(p, 2.35, 2.85)))
    const s2 = smooth(seg(p, 3.15, 3.55)) * (1 - smooth(seg(p, 4.15, 4.55)))
    const surprise = Math.max(s1, s2)
    const smile = smooth(seg(p, 4.45, 4.95))
    let blink = 0
    if (!reduce && surprise < 0.4) {
      const b = time % 3.6
      if (b < 0.24) blink = 1 - Math.abs(b / 0.12 - 1)
    }
    const eyeY = (0.55 + 0.45 * surprise) * (1 - 0.3 * smile) * (1 - 0.92 * blink)
    for (const e of eyes) e.scale.set(1.2 - 0.2 * surprise, Math.max(0.06, eyeY), 0.5)
    brows[0].position.y = 0.182 + 0.012 * surprise
    brows[1].position.y = 0.182 + 0.012 * surprise
    mouthOpen.scale.set(0.9, Math.max(0.01, surprise * 1.3), 0.4)
    mouthLine.scale.x = Math.max(0.001, (1 - surprise) * (1 - smile))
    mouthSmile.scale.setScalar(Math.max(0.001, smile))

    /* 머리가 날아오는 노트북을 좇는다 */
    const track = smooth(seg(p, 3.1, 3.5)) * (1 - smooth(seg(p, 3.95, 4.4)))
    head.rotation.y = -0.28 * track
    head.rotation.x = -0.18 * track + 0.05 * hold * (1 - smile)
  }

  function render() {
    renderer.render(scene, camera)
  }

  function setSize(w: number, h: number) {
    aspect = w / h
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
  }

  function setParallax(x: number, y: number) {
    parTarget.set(x, y)
  }

  function dispose() {
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) o.geometry.dispose()
    })
    for (const m of Object.values(M)) m.dispose()
    screenTex.dispose()
    renderer.dispose()
  }

  return { update, render, setSize, setParallax, dispose }
}
