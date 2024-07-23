import { fetchWithResponse } from "./fetcher.jsx";

export function getUserHouseholds() {
    return fetchWithResponse('households', {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}

export function getHouseholdById(householdId) {
    return fetchWithResponse(`households/${householdId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}