import { addFeed, getFeedByHouseId } from "../data/feed.jsx"
import { useState } from "react"


function FeedModal({setShowFeedModal, householdId, setFeed}) {
    const [newFeed, setNewFeed] = useState({ householdId, name: "", url:"", totalServings: 0})
    const refresh = () => {
        getFeedByHouseId(householdId).then((data) => {
          setFeed(data)
      })}

    return(
        <>
<div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Supply</p>
          <button
            onClick={() => {
              setShowFeedModal(false)
              setNewFeed({ householdId, name: '', url: "",  totalServings: 0 })
            }}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">New Supply Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={newFeed?.name}
                onChange={(event) => {
                  const copy = { ...newFeed }
                  copy.name = event.target.value
                  setNewFeed(copy)
                }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Link to Purchase Supplies</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={newFeed?.url}
                onChange={(event) => {
                  const copy = { ...newFeed }
                  copy.url = event.target.value
                  setNewFeed(copy)
                }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Total Number of Servings/Uses</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={newFeed?.totalServings}
                onChange={(event) => {
                  const copy = { ...newFeed }
                  copy.totalServings = event.target.value
                  setNewFeed(copy)
                }}
              />
            </div>
          </div>
        </section>
    <footer className="modal-card-foot">
      <button className="button is-success"
        onClick={async () => {
          await addFeed(newFeed).then(() => {
            refresh()
            setNewFeed({ householdId, name: '', url: "", totalServings: 0 })
            setShowFeedModal(false)

          })
        }}
      >Save changes</button>
      <button
        onClick={() => {
          setShowFeedModal(false)
          setNewFeed({ householdId, name: '', url: "",  totalServings: 0 })
        }}
        className="button">
        Cancel
      </button>
    </footer>
      </div >
      </>
    )
    }
    export default FeedModal