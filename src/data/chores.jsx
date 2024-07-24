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

export function updateChore() {
    // return fetchWithoutResponse(`chores`, {
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(newChore)
    // })
}