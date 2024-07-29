import { fetchWithResponse, fetchWithoutResponse } from "./fetcher.jsx";


export function getFeedByHouseId(householdId) {
    return fetchWithResponse(`feed?household=${householdId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("chore_token")).token}`,
          }
    })
}