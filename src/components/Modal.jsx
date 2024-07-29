import { useParams } from "react-router-dom"
import { addChore } from "../data/chores.jsx"
import { useEffect, useState } from "react"
import { getFeedByHouseId } from "../data/feed.jsx"
import "./modal.css"

function Modal({ setShowChoreModal }) {

  const { householdId } = useParams()
  const [newChore, setNewChore] = useState({ householdId, name: "", feedId:"" })
  const [houseFeed, setHouseFeed] = useState([])
 

  useEffect(() => {
    getFeedByHouseId(householdId).then((data) => {
      setHouseFeed(data)
    })
  }, [householdId])

  return (
    <>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Chore</p>
          <button
            onClick={() => {
              setShowChoreModal(false)
              setNewChore({ householdId, name: '' })
            }}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">New Chore Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={newChore.name}
                onChange={(event) => {
                  const copy = { ...newChore }
                  copy.name = event.target.value
                  setNewChore(copy)
                }}
              />
            </div>
          </div>
          <div className="feed">
          <div className="select is-primary">
            <select 
            value={newChore.feedId}
            onChange={(event) => {
                  const copy = { ...newChore }
                  copy.feedId = parseInt(event.target.value)
                  setNewChore(copy)}}>
              
            <option disabled value="">Select a Feed </option>
          {houseFeed.map((feed) => {
            return (
              <option key={feed.id} value={feed.id}>
              {feed.name}
              </option>
            )
          })}
          </select>
          </div>
          <div>
          <p className="title is-6"> OR </p>
          </div>
          <div className="button-container">
          <button className="button is-primary"
          // onClick={()=>{
          //   setShowFeedModal
          // }}
          >
            Add New Feed
          </button>
          </div>
          </div>
        </section>
    <footer className="modal-card-foot">
      <button className="button is-success"
        onClick={async () => {
          await addChore(newChore).then(() => {
            setNewChore({ householdId, name: '', feedId: "" })
            setShowChoreModal(false)

          })
        }}
      >Save changes</button>
      <button
        onClick={() => {
          setShowChoreModal(false)
          setNewChore({ householdId, name: '', feedId: "" })
        }}
        className="button">
        Cancel
      </button>
    </footer>
      </div >
    </>
  )
}

export default Modal