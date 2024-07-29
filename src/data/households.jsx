import { fetchWithResponse, fetchWithoutResponse } from "./fetcher.jsx";

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

export function getHouseholdMembersByHouseholdId(householdId) {
    return fetchWithResponse(`householdmembers?household=${householdId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}

export function addHousehold(newHousehold) {
    return fetchWithoutResponse(`households`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newHousehold)
    })
}

export function deleteMember(memberId) {
    return fetchWithoutResponse(`householdmembers/${memberId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
        'Content-Type': 'application/json'
      },
    })
  }
