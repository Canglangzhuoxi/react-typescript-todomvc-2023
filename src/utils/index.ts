const getLocalStorage = (key: string): string | null => window.localStorage.getItem(key)

export { getLocalStorage }
