
export const setInSession = (key, value) => {
  if(!value) return
  if (typeof value === 'object') value = JSON.stringify(value);
  else if(typeof value === 'boolean') value = JSON.stringify(value)
  window.sessionStorage.setItem(key, value);
}

export const getFromSession = (key) => {
  const value = window.sessionStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error("qualcosa non ha funzionato( window.sessionStorage )", e);
  }
}

export const clearSession = () => {
  window.sessionStorage.clear();
}

export const loadSession = () =>{
  return {
    currentUser: getFromSession("currentUser"),
    userStatus: getFromSession("connected")
  }
}
