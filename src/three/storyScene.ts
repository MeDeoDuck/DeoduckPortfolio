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

/* ---------- 재질 팔레트 (3색 규율: 흰 배경 · 차콜 · 은은한 블루 파이핑) ---------- */
const M = {
  skin: new THREE.MeshStandardMaterial({ color: 0xf0d0b8, roughness: 0.62 }),
  hair: new THREE.MeshStandardMaterial({ color: 0x17171a, roughness: 0.85 }),
  suit: new THREE.MeshStandardMaterial({ color: 0x2a2a2f, roughness: 0.78 }),
  trouser: new THREE.MeshStandardMaterial({ color: 0x1a1a1d, roughness: 0.8 }),
  shirt: new THREE.MeshStandardMaterial({ color: 0xfafbfc, roughness: 0.55 }),
  tie: new THREE.MeshStandardMaterial({ color: 0x121216, roughness: 0.7 }),
  piping: new THREE.MeshStandardMaterial({ color: 0x1b3f7d, roughness: 0.6 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x232326, roughness: 0.75 }),
  laptop: new THREE.MeshStandardMaterial({ color: 0xc7cbd2, roughness: 0.35, metalness: 0.65 }),
  bezel: new THREE.MeshStandardMaterial({ color: 0x25262b, roughness: 0.5, metalness: 0.3 }),
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

  // 옅은 격자
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

  // 파형
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

  // 연결 노드 (고정 좌표 — 매 로드 동일)
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

  // 반투명 패널 두 장 (내용 없는 빈 판)
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
  shoulder.position.set(0.185 * side, 1.487, 0)
  const upper = mesh(new THREE.CapsuleGeometry(0.049, 0.2, 6, 12), M.suit, 0, -0.14, 0)
  shoulder.add(upper)
  const elbow = new THREE.Group()
  elbow.position.set(0, -0.27, 0)
  const fore = mesh(new THREE.CapsuleGeometry(0.043, 0.17, 6, 12), M.suit, 0, -0.115, 0)
  elbow.add(fore)
  const hand = mesh(new THREE.SphereGeometry(0.05, 14, 12), M.skin, 0, -0.245, 0)
  hand.scale.set(0.85, 1.05, 0.62)
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
  renderer.toneMappingExposure = 1.05

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  // 바닥 끝선을 안개로 숨긴다 — 모서리 없는 무한 스튜디오
  scene.fog = new THREE.Fog(0xffffff, 5.5, 11)

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40)

  /* ---------- 조명: 좌상단 키 + 정면 필 + 차가운 림 ---------- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe4ec, 0.85))
  const key = new THREE.DirectionalLight(0xffffff, 2.1)
  key.position.set(-2.2, 4.2, 3.2)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -1.6
  key.shadow.camera.right = 1.6
  key.shadow.camera.top = 3
  key.shadow.camera.bottom = -0.5
  key.shadow.radius = 6
  key.shadow.bias = -0.0004
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.55)
  fill.position.set(0.6, 1.6, 4)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(0xcfe0ff, 0.9)
  rim.position.set(1.8, 2.6, -2.6)
  scene.add(rim)

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
  )
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  /* ---------- 캐릭터 ---------- */
  const figure = new THREE.Group()
  scene.add(figure)

  // 다리
  for (const s of [1, -1] as const) {
    const leg = mesh(new THREE.CapsuleGeometry(0.062, 0.72, 6, 12), M.trouser, 0.085 * s, 0.48, 0)
    figure.add(leg)
    const shoe = mesh(new THREE.SphereGeometry(0.07, 12, 10), M.dark, 0.085 * s, 0.035, 0.03)
    shoe.scale.set(0.9, 0.5, 1.5)
    figure.add(shoe)
  }

  // 몸통(재킷) — 호흡용으로 그룹에 담는다
  const torso = new THREE.Group()
  figure.add(torso)
  const jacket = mesh(new THREE.CylinderGeometry(0.152, 0.14, 0.56, 24), M.suit, 0, 1.24, 0)
  torso.add(jacket)
  for (const s of [1, -1] as const) {
    const pad = mesh(new THREE.SphereGeometry(0.085, 14, 12), M.suit, 0.148 * s, 1.475, 0)
    pad.scale.set(1, 0.8, 0.9)
    torso.add(pad)
  }
  // 셔츠 가슴판 (재킷 앞섶 사이)
  const chest = mesh(new THREE.BoxGeometry(0.11, 0.26, 0.02), M.shirt, 0, 1.41, 0.136)
  chest.rotation.x = -0.06
  torso.add(chest)
  // 라펠 + 블루 파이핑
  for (const s of [1, -1] as const) {
    const lapel = mesh(new THREE.BoxGeometry(0.05, 0.24, 0.018), M.suit, 0.075 * s, 1.41, 0.142)
    lapel.rotation.z = -0.24 * s
    lapel.rotation.x = -0.06
    torso.add(lapel)
    const pipe = mesh(new THREE.BoxGeometry(0.006, 0.23, 0.02), M.piping, 0.053 * s, 1.405, 0.143)
    pipe.rotation.z = -0.24 * s
    pipe.rotation.x = -0.06
    torso.add(pipe)
  }
  // 셔츠 칼라 — 장면 3에서 닫힌다
  const collars: THREE.Mesh[] = []
  for (const s of [1, -1] as const) {
    const col = mesh(new THREE.BoxGeometry(0.055, 0.045, 0.014), M.shirt, 0.042 * s, 1.548, 0.115)
    col.rotation.y = -0.55 * s
    col.rotation.z = -0.12 * s
    collars.push(col)
    torso.add(col)
  }

  // 팔
  const armR = buildArm(1)
  const armL = buildArm(-1)
  torso.add(armR.shoulder, armL.shoulder)

  // 목·머리
  torso.add(mesh(new THREE.CylinderGeometry(0.047, 0.05, 0.1, 12), M.skin, 0, 1.575, 0))
  const head = new THREE.Group()
  head.position.set(0, 1.62, 0)
  torso.add(head)
  const skull = mesh(new THREE.SphereGeometry(0.152, 24, 20), M.skin, 0, 0.135, 0)
  skull.scale.set(0.93, 1.06, 0.96)
  head.add(skull)
  for (const s of [1, -1] as const) {
    const ear = mesh(new THREE.SphereGeometry(0.028, 10, 8), M.skin, 0.138 * s, 0.115, -0.01)
    ear.scale.set(0.5, 1, 0.7)
    head.add(ear)
  }
  // 헤어 — 가운데 가르마
  const cap = mesh(new THREE.SphereGeometry(0.158, 24, 18), M.hair, 0, 0.175, -0.012)
  cap.scale.set(0.97, 0.92, 0.99)
  head.add(cap)
  for (const s of [1, -1] as const) {
    const fringe = mesh(new THREE.SphereGeometry(0.09, 14, 12), M.hair, 0.052 * s, 0.225, 0.088)
    fringe.scale.set(0.72, 0.42, 0.5)
    fringe.rotation.z = 0.32 * s
    head.add(fringe)
    const side = mesh(new THREE.SphereGeometry(0.06, 12, 10), M.hair, 0.128 * s, 0.15, 0.01)
    side.scale.set(0.42, 0.85, 0.8)
    head.add(side)
  }
  // 눈·눈썹·코·입
  const eyes: THREE.Mesh[] = []
  const brows: THREE.Mesh[] = []
  for (const s of [1, -1] as const) {
    const eye = mesh(new THREE.SphereGeometry(0.02, 12, 10), M.hair, 0.055 * s, 0.15, 0.122)
    eye.scale.set(1.15, 0.5, 0.4)
    eyes.push(eye)
    head.add(eye)
    const brow = mesh(new THREE.BoxGeometry(0.052, 0.009, 0.008), M.hair, 0.057 * s, 0.192, 0.126)
    brow.rotation.z = -0.06 * s
    brows.push(brow)
    head.add(brow)
  }
  const nose = mesh(new THREE.SphereGeometry(0.018, 10, 8), M.skin, 0, 0.105, 0.145)
  nose.scale.set(0.7, 1.1, 0.8)
  head.add(nose)
  const mouthLine = mesh(new THREE.BoxGeometry(0.044, 0.006, 0.006), M.hair, 0, 0.052, 0.135)
  head.add(mouthLine)
  const mouthOpen = mesh(new THREE.SphereGeometry(0.016, 12, 10), M.hair, 0, 0.05, 0.132)
  mouthOpen.scale.set(0.9, 0.01, 0.4)
  head.add(mouthOpen)
  const smileArc = 1.7
  const mouthSmile = mesh(new THREE.TorusGeometry(0.026, 0.005, 8, 16, smileArc), M.hair, 0, 0.062, 0.132)
  mouthSmile.rotation.z = 1.5 * Math.PI - smileArc / 2
  mouthSmile.scale.setScalar(0.001)
  head.add(mouthSmile)

  /* ---------- 넥타이 ---------- */
  const tie = new THREE.Group()
  const knot = mesh(new THREE.SphereGeometry(0.03, 10, 8), M.tie, 0, 0, 0)
  knot.scale.set(0.95, 0.85, 0.6)
  tie.add(knot)
  const blade = mesh(new THREE.BoxGeometry(0.046, 0.3, 0.012), M.tie, 0, -0.165, 0.004)
  const tip = mesh(new THREE.ConeGeometry(0.033, 0.05, 4), M.tie, 0, -0.335, 0.004)
  tip.rotation.y = Math.PI / 4
  tip.rotation.x = Math.PI
  tip.scale.z = 0.28
  tie.add(blade, tip)
  tie.visible = false
  scene.add(tie)
  const tiePath = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(1.7, 2.45, 0.6),
    new THREE.Vector3(0.6, 1.95, 0.55),
    new THREE.Vector3(0.02, 1.62, 0.2)
  )
  const tieHome = new THREE.Vector3(0, 1.545, 0.148)

  /* ---------- 노트북 ---------- */
  const laptop = new THREE.Group()
  const base = mesh(new THREE.BoxGeometry(0.42, 0.016, 0.29), M.laptop, 0, 0, 0)
  laptop.add(base)
  const lid = new THREE.Group()
  lid.position.set(0, 0.008, -0.142)
  const lidPlate = mesh(new THREE.BoxGeometry(0.42, 0.013, 0.28), M.laptop, 0, 0.006, 0.14)
  lid.add(lidPlate)
  const bezelPlate = mesh(new THREE.BoxGeometry(0.4, 0.002, 0.262), M.bezel, 0, 0.0135, 0.14)
  lid.add(bezelPlate)
  const screenTex = drawScreen()
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.382, 0.244),
    new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false })
  )
  screen.rotation.x = -Math.PI / 2
  screen.position.set(0, 0.0155, 0.14)
  lid.add(screen)
  laptop.add(lid)
  laptop.visible = false
  scene.add(laptop)
  const lapPath = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-1.8, 2.55, 0.75),
    new THREE.Vector3(-0.85, 1.95, 0.75),
    new THREE.Vector3(-0.14, 1.44, 0.55)
  )
  const lapHome = new THREE.Vector3(0, 1.13, 0.47)

  /* ---------- 카메라 키프레임 (장면 경계 0~5) ---------- */
  const camPos = [
    new THREE.Vector3(0, 1.38, 3.2),
    new THREE.Vector3(0, 1.4, 3.08),
    new THREE.Vector3(0, 1.46, 2.72),
    new THREE.Vector3(0, 1.44, 2.68),
    new THREE.Vector3(0, 1.38, 3.06),
    new THREE.Vector3(0, 1.28, 2.9),
  ]
  const camLook = [
    new THREE.Vector3(0, 1.3, 0),
    new THREE.Vector3(0, 1.33, 0),
    new THREE.Vector3(0, 1.44, 0),
    new THREE.Vector3(0, 1.43, 0),
    new THREE.Vector3(0, 1.34, 0),
    new THREE.Vector3(0, 1.24, 0),
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
    // 좁은 화면은 뒤로 물러나 전신 프레이밍 유지
    if (aspect < 0.85) cp.z *= Math.pow(0.85 / aspect, 0.9)
    if (!reduce) {
      par.lerp(parTarget, 0.06)
      cp.x += par.x * 0.07
      cp.y += par.y * 0.045
    }
    camera.position.copy(cp)
    camera.lookAt(cl)

    /* 유휴 호흡 — 시간 기반, 감속 모드에선 정지 */
    const breath = reduce ? 0 : Math.sin(time * 1.7) * 0.006
    torso.scale.y = 1 + breath
    figure.rotation.y = reduce ? 0 : Math.sin(time * 0.4) * 0.018

    /* 넥타이 비행 (1→2) */
    const tf = smooth(seg(p, 1.05, 2))
    tie.visible = p > 0.98
    if (p < 2) {
      tiePath.getPoint(tf, v3)
      tie.position.copy(v3)
      tie.rotation.set(
        lerp(-0.7, 0, tf) + (reduce ? 0 : Math.sin(tf * 13) * 0.3 * (1 - tf)),
        lerp(2.6, 0.1, tf),
        lerp(0.9, 0.05, tf)
      )
      knot.scale.setScalar(0.001)
      blade.rotation.z = Math.sin(tf * 9) * 0.35 * (1 - tf)
    } else {
      /* 착용 (2→3): 오버슈트로 자리 잡는 천 */
      const w = seg(p, 2, 2.8)
      const wb = outBack(smooth(w))
      tie.position.lerpVectors(tiePath.getPoint(1, v3), tieHome, smooth(w))
      tie.rotation.set(-0.45 * (1 - wb), 0.1 * (1 - wb), 0.05 * (1 - wb))
      const ks = smooth(seg(p, 2.1, 2.5))
      knot.scale.set(0.95 * ks, 0.85 * ks, 0.6 * ks)
      blade.rotation.z = 0
      blade.scale.y = lerp(0.7, 1, wb)
    }
    // 칼라 닫힘
    const cc = smooth(seg(p, 2.15, 2.75))
    collars[0].rotation.y = lerp(-0.55, -0.18, cc)
    collars[1].rotation.y = lerp(0.55, 0.18, cc)

    /* 노트북 비행 (3→4) → 제시 (4→5) */
    laptop.visible = p > 2.98
    const lf = smooth(seg(p, 3.05, 3.95))
    const lh = smooth(seg(p, 4, 4.75))
    if (p < 4) {
      lapPath.getPoint(lf, v3)
      laptop.position.copy(v3)
      laptop.rotation.set(
        (reduce ? 0 : Math.sin(lf * 9) * 0.2 * (1 - lf)) + lerp(0.5, 0.1, lf),
        lerp(-2.3, -0.25, lf),
        lerp(0.45, 0.06, lf)
      )
      lid.rotation.x = -0.12
    } else {
      laptop.position.lerpVectors(lapPath.getPoint(1, v3), lapHome, lh)
      laptop.rotation.set(lerp(0.1, -0.06, lh), lerp(-0.25, 0, lh), lerp(0.06, 0, lh))
      lid.rotation.x = lerp(-0.12, -1.82, smooth(seg(p, 4.2, 4.8)))
    }

    /* 팔 포즈 */
    const reach = smooth(seg(p, 3.15, 3.9))
    const hold = smooth(seg(p, 4, 4.65))
    // 오른팔: 대기 → 뻗기 → 받치기
    armR.shoulder.rotation.x = lerp(lerp(-0.05, -1.08, reach), -0.95, hold)
    armR.shoulder.rotation.z = lerp(0.08, 0.17, hold)
    armR.elbow.rotation.x = lerp(lerp(-0.06, -0.32, reach), -0.52, hold)
    // 왼팔: 주머니 → 받치기
    armL.shoulder.rotation.x = lerp(-0.42, -0.95, hold)
    armL.shoulder.rotation.z = lerp(-0.07, -0.17, hold)
    armL.elbow.rotation.x = lerp(0.88, -0.52, hold)

    /* 얼굴 */
    const s1 = smooth(seg(p, 1.2, 1.6)) * (1 - smooth(seg(p, 2.35, 2.85)))
    const s2 = smooth(seg(p, 3.15, 3.55)) * (1 - smooth(seg(p, 4.15, 4.55)))
    const surprise = Math.max(s1, s2)
    const smile = smooth(seg(p, 4.45, 4.95))
    // 깜빡임 — 시간 기반, 놀람·감속 중에는 생략
    let blink = 0
    if (!reduce && surprise < 0.4) {
      const b = time % 3.6
      if (b < 0.24) blink = 1 - Math.abs(b / 0.12 - 1)
    }
    const eyeY = (0.5 + 0.5 * surprise) * (1 - 0.28 * smile) * (1 - 0.92 * blink)
    for (const e of eyes) e.scale.set(1.15 - 0.15 * surprise, Math.max(0.05, eyeY), 0.4)
    brows[0].position.y = 0.192 + 0.014 * surprise
    brows[1].position.y = 0.192 + 0.014 * surprise
    mouthOpen.scale.set(0.9, Math.max(0.01, surprise * 1.4), 0.4)
    mouthLine.scale.x = Math.max(0.001, (1 - surprise) * (1 - smile))
    mouthSmile.scale.setScalar(Math.max(0.001, smile))

    /* 머리가 날아오는 노트북을 좇는다 */
    const track = smooth(seg(p, 3.1, 3.5)) * (1 - smooth(seg(p, 3.95, 4.4)))
    head.rotation.y = -0.3 * track
    head.rotation.x = -0.2 * track + 0.06 * hold * (1 - smile)
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
