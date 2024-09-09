export const setInLocal = (key, value) => {
  if (!value) return
  if (typeof value === 'object') value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
}

export const getFromLocal = key => {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error("qualcosa non ha funzionato( window.sessionStorage )", e);
  }
}

export const clearLocal = () => {
  window.localStorage.clear();
}
