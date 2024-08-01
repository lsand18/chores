import { useEffect, useState } from 'react'
import { getUserHouseholds, addHousehold } from '../data/households.jsx'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
const [households, setHouseholds] = useState([])
const navigate = useNavigate()
const [showHouseModal, setShowHouseModal] = useState(false)
const [newHousehold, setNewHousehold] = useState({})
const active = showHouseModal ? ("is-active") : ("")

useEffect(()=>{
getUserHouseholds().then((data)=>{
  setHouseholds(data)
})
},[showHouseModal])

  return (
    <main className='box'>
      <h1 className='title is-2'>Welcome to Chore Check</h1>
      <div className='btn-container'>
        <button className='button is-success'
        onClick={()=>{setShowHouseModal(true)}}>
        <span className='icon is-small'>
        <i className="fa-solid fa-plus"></i>
      </span>
      <span>Add a Household </span> 
        </button>
      </div>
      <div>
      <h3 className='subtitle'>Select a Household</h3>
      </div>
      <div className='choices'>
      {households.map(household => (
        <button key={household.id}
        className='button is-primary is-light'
        onClick={()=>{navigate(`/${household.household.id}`)}}
        >
          {household.household.name}</button>
      ))}
      </div>

      <>
      <div className={`modal ${active}`}>
        <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add a Household</p>
              <button
                onClick={()=>{setShowHouseModal(false)
                }}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">New Household Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={newHousehold.name}
                    onChange={(event)=>{
                        const copy = {...newHousehold
                        }
                        copy.name = event.target.value
                        setNewHousehold(copy)
                    }}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success"
                onClick={async ()=>{
                await addHousehold(newHousehold).then(()=> {
                  setNewHousehold({})
                  setShowHouseModal(false)
                    
              })
              }}
              >Save changes</button>
              <button 
                onClick={()=>{setShowHouseModal(false)
                setNewHousehold({name: ""})}}
                className="button">
                Cancel
              </button>
            </footer>
          </div>
          </div>
</>
    </main>
    
  )
}

export default Home
