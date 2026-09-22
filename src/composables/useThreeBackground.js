import { onBeforeUnmount, onMounted, unref } from 'vue'
import { isBrowser, prefersReducedMotion } from './useReducedMotion'

/**
 * Lightweight drifting particle field used behind the hero.
 *
 * Three.js is imported dynamically so it lands in its own chunk and never
 * blocks the first paint. Bails out silently when WebGL is unavailable.
 *
 * @param {import('vue').Ref<HTMLCanvasElement|null>} canvasRef
 * @param {object} [options]
 * @param {number} [options.count=900] particle count on desktop
 * @param {string} [options.color='#22d3ee']
 */
export function useThreeBackground(canvasRef, options = {}) {
  const { count = 900, color = '#22d3ee' } = options

  let renderer = null
  let scene = null
  let camera = null
  let points = null
  let geometry = null
  let material = null
  let frameId = null
  let resizeObserver = null
  let intersectionObserver = null
  let disposed = false
  let onScreen = true

  const pointer = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }

  const onPointerMove = (event) => {
    target.x = (event.clientX / window.innerWidth - 0.5) * 2
    target.y = (event.clientY / window.innerHeight - 0.5) * 2
  }

  const resize = () => {
    const canvas = unref(canvasRef)
    if (!renderer || !camera || !canvas) return

    const { clientWidth: width, clientHeight: height } = canvas
    if (!width || !height) return

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height, false)
  }

  const render = () => {
    if (!renderer || !scene || !camera) return
    renderer.render(scene, camera)
  }

  const animate = () => {
    frameId = requestAnimationFrame(animate)

    if (points) {
      points.rotation.y += 0.00045
      points.rotation.x += 0.00018
    }

    // Ease the camera toward the pointer for a subtle parallax effect.
    pointer.x += (target.x - pointer.x) * 0.04
    pointer.y += (target.y - pointer.y) * 0.04

    if (camera) {
      camera.position.x = pointer.x * 0.55
      camera.position.y = -pointer.y * 0.35
      camera.lookAt(0, 0, 0)
    }

    render()
  }

  const stop = () => {
    if (frameId !== null) cancelAnimationFrame(frameId)
    frameId = null
  }

  const start = () => {
    if (frameId === null && onScreen && !document.hidden && !prefersReducedMotion()) animate()
  }

  const onVisibilityChange = () => (document.hidden ? stop() : start())

  /** Cheap capability probe — avoids three.js logging its own WebGL error. */
  const supportsWebGL = (canvas) => {
    try {
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      return false
    }
  }

  const init = async () => {
    const canvas = unref(canvasRef)
    if (!isBrowser || !canvas || !supportsWebGL(canvas)) return

    const {
      AdditiveBlending,
      BufferGeometry,
      Color,
      Float32BufferAttribute,
      PerspectiveCamera,
      Points,
      PointsMaterial,
      Scene,
      WebGLRenderer,
    } = await import('three')

    // The component may have unmounted while the chunk was loading.
    if (disposed || !unref(canvasRef)) return

    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      })
    } catch {
      return // No WebGL — the CSS gradient backdrop is enough.
    }

    scene = new Scene()
    camera = new PerspectiveCamera(62, 1, 0.1, 100)
    camera.position.z = 14

    const total = window.innerWidth < 768 ? Math.round(count * 0.45) : count
    const positions = new Float32Array(total * 3)
    const scales = new Float32Array(total)

    for (let i = 0; i < total; i += 1) {
      const radius = 6 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = radius * Math.cos(phi)
      scales[i] = Math.random()
    }

    geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('aScale', new Float32BufferAttribute(scales, 1))

    material = new PointsMaterial({
      color: new Color(color),
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: AdditiveBlending,
    })

    points = new Points(geometry, material)
    scene.add(points)

    resize()
    render()

    if (prefersReducedMotion()) return

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(canvas)
    }

    // Stop rendering once the hero scrolls away — no point burning GPU cycles
    // on a canvas nobody can see.
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting
          if (onScreen) start()
          else stop()
        },
        { threshold: 0 },
      )
      intersectionObserver.observe(canvas)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    start()
  }

  const dispose = () => {
    disposed = true
    stop()
    resizeObserver?.disconnect()
    resizeObserver = null
    intersectionObserver?.disconnect()
    intersectionObserver = null

    if (isBrowser) {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }

    geometry?.dispose()
    material?.dispose()
    renderer?.dispose()

    geometry = material = renderer = scene = camera = points = null
  }

  onMounted(() => {
    // Fire and forget: the dynamic import resolves after the first paint.
    init().catch(() => dispose())
  })
  onBeforeUnmount(dispose)

  return { start, stop, dispose }
}

export default useThreeBackground
