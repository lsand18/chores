import { useParams } from "react-router-dom"
import { addChore } from "../data/chores.jsx"
import { useState } from "react"

function Modal ({setShowChoreModal}){
    
    const {householdId} = useParams()
    const [newChore, setNewChore] = useState({householdId})

    return(
        <>
        <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Chore</p>
              <button
                onClick={()=>{setShowChoreModal(false)}}
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
                    onChange={(event)=>{
                        const copy = {...newChore}
                        copy.name = event.target.value
                        setNewChore(copy)
                    }}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success"
                onClick={async ()=>{
                await addChore(newChore).then(()=> {
                    setShowChoreModal(false)
                    setNewChore({})
              })
              }}
              >Save changes</button>
              <button 
                onClick={()=>{setShowChoreModal(false)}}
                className="button">
                Cancel
              </button>
            </footer>
          </div>
</>
            )}

            export default Modal