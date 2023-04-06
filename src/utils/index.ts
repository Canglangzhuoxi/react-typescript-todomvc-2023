const getLocalStorage = (key: string): string | null => window.localStorage.getItem(key)
const setLocalStorage = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value)
  } catch (e) {
    alert('存储空间已满！')
  }
}
const removeLocalStorage = (key: string): void => window.localStorage.removeItem(key)

export { getLocalStorage, removeLocalStorage, setLocalStorage }
