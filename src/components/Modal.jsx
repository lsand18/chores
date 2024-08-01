import { useParams } from "react-router-dom"
import { addChore } from "../data/chores.jsx"
import { useEffect, useState } from "react"
import { getFeedByHouseId, addFeed } from "../data/feed.jsx"
import FeedModal from "./FeedModal.jsx"
import "./modal.css"

function Modal({ setShow, transientChore }) {

  const { householdId } = useParams()
  const [newChore, setNewChore] = useState({ householdId, name: "", feedId:"" })
  const [houseFeed, setHouseFeed] = useState([])
  const [showFeedModal, setShowFeedModal] = useState(false)
  const active = showFeedModal ? ("is-active") : ("")
  const [showFeedButtons, setShowFeedButtons] = useState(false)
 
const refresh = () => {
  getFeedByHouseId(householdId).then((data) => {
    setHouseFeed(data)
})}

  useEffect(() => {
    refresh()
  }, [householdId])

  return (
    <>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Chore</p>
          <button
            onClick={() => {
              setShow(false)
              setShowFeedButtons(false)
              setNewChore({ householdId, name: '', feedId: "" })
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
          <hr className="bd-hr"></hr>
          {showFeedButtons ? (
            <>
            <div className="select is-primary">
            <select 
            value={newChore.feedId}
            onChange={(event) => {
                  const copy = { ...newChore }
                  copy.feedId = parseInt(event.target.value)
                  setNewChore(copy)}}>
              
            <option disabled value="">Select Supply Item </option>
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
          <button className="button is-primary"
          onClick={()=>{
            setShowFeedModal(true)
          }}
          >
            <span className='icon is-small'>
      <i className="fa-solid fa-plus"></i>
    </span>
    <span>Add  New Supply</span>
          </button>
          </>
        ):(
          <>
          <p className="title is-6">Does this chore require supplies?</p>

<div className="btn-container2">

  <button className='button'
    onClick={() => {
      setShowFeedButtons(true)
      }}
  >Yes</button>
  <button className='button'
  >No</button>
</div>
</>)}
        </section>
          {/* <div className="select is-primary">
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
          <button className="button is-primary"
          onClick={()=>{
            setShowFeedModal(true)
          }}
          >
            Add New Feed
          </button>
        </section> */}
    <footer className="modal-card-foot">
      <button className="button is-success"
        onClick={async () => {
          await addChore(newChore).then(() => {
            setNewChore({ householdId, name: '', feedId: "" })
            setShow(false)
            setShowFeedButtons(false)

          })
        }}
      >Save Chore</button>
      <button
        onClick={() => {
          setShow(false)
          setShowFeedButtons(false)
          setNewChore({ householdId, name: '', feedId: "" })
        }}
        className="button">
        Cancel
      </button>
    </footer>
      </div >

{/* Feed Modal */}
      <div className={`modal ${active}`}>
      <FeedModal setShowFeedModal={setShowFeedModal} householdId={householdId} setFeed={setHouseFeed}/>
      </div>
    </>
  )
}

export default Modal