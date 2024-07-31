import { fetchWithResponse, fetchWithoutResponse } from "./fetcher.jsx";


export function getFeedByHouseId(householdId) {
    return fetchWithResponse(`feed?household=${householdId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}

export function addFeed(newFeed) {
    return fetchWithoutResponse(`feed`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newFeed)
    })
}

export function deleteFeed(feedId) {
    return fetchWithResponse(`feed/${feedId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
        'Content-Type': 'application/json'
      },
    })
  }
