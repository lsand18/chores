import { useEffect, useState } from 'react'
import { getHouseholdChores, addChore } from '../data/chores.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { getHouseholdById } from '../data/households.jsx'
import './Chores.css'
import 'bulma/css/bulma.css'

function Chores() {
const [chores, setChores] = useState([])
const [household, setHousehold] = useState({})
const navigate = useNavigate()
const {householdId} = useParams()
const [showChoreModal, setShowChoreModal] = useState(false)
const active = showChoreModal ? ("is-active"):("")
const [newChore, setNewChore] = useState({})

useEffect(()=>{
getHouseholdChores(householdId).then((data)=>{
  setChores(data)
})
getHouseholdById(householdId).then((data)=>{
    setHousehold(data)
})
},[householdId])

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <main className='text-slate-900 pl-10 pr-10'>
      <h1 className='text-4xl'>{household.name}</h1>
      <button
      onClick={()=>{setShowChoreModal(true)}}
      > Add Chore </button>
      <h3>{formattedDate}</h3>
      <ul>Chores</ul>
      {chores.map(chore => (
        <li key={chore.id}
        className='btn'
        >
          {chore.name}</li>
      ))}
      <div className={`modal ${active}`}>
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
                    //is this accepting an object
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
        </div>
    </main>
  )
}

export default Chores
