export function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function scrollProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const total = h.scrollHeight - h.clientHeight;
  return total > 0 ? scrolled / total : 0;
}
