import { useParams } from "react-router-dom"
import { updateChoreContent } from "../data/chores.jsx"
import { useEffect, useState } from "react"
import { getFeedByHouseId } from "../data/feed.jsx"
import "./modal.css"

function EditModal({ setShow, transientChore, setTransientChore }) {

  const { householdId } = useParams()
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
          <p className="modal-card-title">Edit Chore</p>
          <button
            onClick={() => {
              setShow(false)
              setTransientChore({})
            }}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Chore Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={transientChore.name}
                onChange={(event) => {
                  const copy = { ...transientChore }
                  copy.name = event.target.value
                  setTransientChore(copy)
                }}
              />
            </div>
          </div>
          <div className="select is-primary">
            <select 
            value={transientChore.feed ? (transientChore.feed.id):("")}
            onChange={(event) => {
                  const copy = { ...transientChore }
                  copy.feed = houseFeed.find(item => item.id === parseInt(event.target.value));

                  setTransientChore(copy)}}>
              
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
                const copy = { ...transientChore }
                copy.feed = null
                setTransientChore(copy)
          }}
          >
            Remove Feed
          </button>
        </section>
    <footer className="modal-card-foot">
      <button className="button is-success"
        onClick={async () => {
          await updateChoreContent(transientChore).then(() => {
            setTransientChore({})
            setShow(false)

          })
        }}
      >Save Chore</button>
      <button
        onClick={() => {
          setShow(false)
          setTransientChore({})
        }}
        className="button">
        Cancel
      </button>
    </footer>
      </div >
    </>
  )
}

export default EditModal