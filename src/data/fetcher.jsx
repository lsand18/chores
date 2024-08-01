const API_URL = 'http://localhost:8000'

const checkError = (res) => {
  console.log("checkError")
  if (!res.ok) {
    throw Error(res.status);
  }
  return res
}

const checkErrorJson = (res) => {
  console.log("checkErrorJson")
  if (res.status !== 200 && res.status !== 201) {
    throw Error(res.status);
  } else {
    return res.json()
  }
}


const catchError = (err) => {
  if (err.message === '401') {
    window.location.href = "/login"
  }
  if (err.message === '404') {
    throw Error(err.message);
  }
  if(err.message === '500'){
    window.alert("You cannot delete this supply item because it is currently connected to a Chore. If you would like to delete this supply, please remove it from the chore first.")
  }
  if(err.message === '403'){
    window.alert("You cannot delete yourself from the household.")
  }
}

export const fetchWithResponse = (resource, options) => {
  return fetch(`${API_URL}/${resource}`, options)
  .then(checkErrorJson)
  .catch(catchError)
}

export const fetchWithoutResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(checkError)
  .catch(catchError)
