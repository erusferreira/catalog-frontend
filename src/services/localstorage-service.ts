export const localStorageService = () => {
  
  const setToken = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getToken = (key: string) => {
    if (isTokenSaved(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  const isTokenSaved = (key: string): boolean => {
    return !!(localStorage.getItem(key) && localStorage.getItem(key) !== null);
  }

  const clear = () => {
    localStorage.clear();
  }

  return {
    setToken, 
    getToken,
    isTokenSaved, 
    clear
  }
}
