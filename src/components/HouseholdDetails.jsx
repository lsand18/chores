import { useEffect, useState } from 'react'
import { getHouseholdMembersByHouseholdId} from '../data/households.jsx'
import { useNavigate, useParams } from 'react-router-dom'

function HouseholdDetails() {
const [household, setHousehold] = useState([])
const navigate = useNavigate()
const {householdId} = useParams()
const [showMemberModal, setShowMemberModal] = useState(false)
const active = showMemberModal ? ("is-active"):("")
// get all members usernames as state

useEffect(()=>{
getHouseholdMembersByHouseholdId(householdId).then((data)=>{
  setHousehold(data)
})
},[householdId, showMemberModal])

  return (
    
    <main className='text-slate-900 pl-10 pr-10'>
        <button className='btn'
    onClick={()=>{setShowMemberModal(true)}}
    > Add A Member </button>
      <h1 className='text-4xl'>{household.name}</h1>
      <h3> Members of your Household</h3>
      {household.map(member => (
        <div className='member'
        key={member.user.id}
        >
            <p> {member.user.first_name} {member.user.last_name}</p>
        </div>
      )
      )}
      <div className={`modal ${active}`}>
        <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Member</p>
              <button
                onClick={()=>{setShowMemberModal(false)}}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <div className="control">
                  {/* search bar for members 
                  
                  <div class="dropdown">
  <button onclick="myFunction()" class="dropbtn">Dropdown</button>
  <div id="myDropdown" class="dropdown-content">
    <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
    <a href="#about">About</a>
    <a href="#base">Base</a>
    <a href="#blog">Blog</a>
    <a href="#contact">Contact</a>
    <a href="#custom">Custom</a>
    <a href="#support">Support</a>
    <a href="#tools">Tools</a>
  </div>
</div>*/}
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success"
                onClick={async ()=>{
                // add Household Member
                  setShowMemberModal(false)
              }}
              >Save</button>
              <button 
                onClick={()=>{setShoeMemberModal(false)}}
                className="button">
                Cancel
              </button>
            </footer>
          </div>
    </div>
    </main>
  )
}

export default HouseholdDetails
