export function navigate(path: string): void {
  if ('Navigation' in Window) {
    navigation.navigate(path)
  } else {
    window.location.href = path;
  }
}

export function redirect(path: string): void {
  if (typeof window === 'undefined') return;
  window.location.href = path;
}
