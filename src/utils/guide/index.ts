const CACHE_NAME = 'letga_guide'

export function hasGuide (key: string): boolean {
  const guides = localStorage.getItem(CACHE_NAME)?.split(',') || []
  return guides.includes(key)
}

export function setGuide (key: string): void {
  const guides = localStorage.getItem(CACHE_NAME)?.split(',') || []
  if (!hasGuide(key)) {
    guides.push(key)
    localStorage.setItem(CACHE_NAME, guides.join(','))
  }
}