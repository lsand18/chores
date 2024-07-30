import { fetchWithResponse, fetchWithoutResponse } from "./fetcher.jsx";

export function getHouseholdChores(householdId) {
    return fetchWithResponse(`chores?household=${householdId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}

export function addChore(newChore) {
    return fetchWithoutResponse(`chores`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newChore)
    })
}

export function updateChore(choreId) {
    return fetchWithoutResponse(`chores/${choreId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}

export function getChoreById(choreId) {
    return fetchWithResponse(`chores/${choreId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}

export function deleteChore(choreId) {
    return fetchWithoutResponse(`chores/${choreId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
        'Content-Type': 'application/json'
      },
    })
  }

  export function updateChoreContent(choreObj) {
    return fetchWithoutResponse(`chores/${choreObj.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(choreObj)
    })
}