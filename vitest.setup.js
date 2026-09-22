/**
 * jsdom does not implement the browser APIs the animation layer relies on,
 * so provide minimal stubs before any test module is imported.
 */
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16)
  window.cancelAnimationFrame = (id) => clearTimeout(id)
}

// jsdom has no WebGL (or 2D) context — return null so the Three.js layer
// detects the lack of support and skips initialisation quietly.
HTMLCanvasElement.prototype.getContext = () => null
