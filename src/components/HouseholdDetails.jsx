import { useEffect, useState } from 'react'
import { getHouseholdMembersByHouseholdId, deleteMember} from '../data/households.jsx'
import { useNavigate, useParams } from 'react-router-dom'
// import "../Chores.css"

function HouseholdDetails() {
const [household, setHousehold] = useState([])
const navigate = useNavigate()
const {householdId} = useParams()
const [showMemberModal, setShowMemberModal] = useState(false)
const active = showMemberModal ? ("is-active"):("")
// get all members usernames as state
const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false)
const activeDelete = showDeleteMemberModal ? ("is-active"):("")
const [transientDelete, setTransientDelete] = useState({})

useEffect(()=>{
getHouseholdMembersByHouseholdId(householdId).then((data)=>{
  setHousehold(data)
})
},[householdId, showMemberModal, showDeleteMemberModal])

  return (
    
    <main className='box'>
      <div className='btn-container'>
        <button className='button is-success'
    onClick={()=>{setShowMemberModal(true)}}
    > 
    <span className='icon is-small'>
        <i className="fa-solid fa-plus"></i>
      </span>
      <span> Add A Member</span>
    </button>
    </div>
      <h1 className='title'> {household[0]?.household.name} </h1>
      {/* where is this? cannot see */}
      <h3 className='subtitle is-4'> Members of your Household</h3>
      <div className='container'>
      {household.map(member => (
        <div className='box'
        key={member.user.id}
        >
            <p className='title is-6'> {member?.user.first_name} {member?.user.last_name}</p>
            <div className='btn-list-container'>
          <button
          className='button'
            onClick={() => {
              setTransientDelete(member)
              setShowDeleteMemberModal(true)
            }}
          >
            <span className='icon is-small'>
            <i className="fa-regular fa-trash-can"></i></span>
            <span> Delete </span>
          </button>
          </div>
        </div>
      )
      )}
      </div>
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
                onClick={()=>{setShowMemberModal(false)}}
                className="button">
                Cancel
              </button>
            </footer>
          </div>
    </div>
    {/* Delete Modal */}
    <div className={`modal ${activeDelete}`}>
    <div className="notification is-danger">
        <button className="delete"
          onClick={() => { setShowDeleteMemberModal(false) }}
        ></button>
        <p>Are you sure you want to delete <strong>&quot;{transientDelete?.user?.first_name} {transientDelete?.user?.last_name}&quot;</strong> from your household?</p>

        <div className="btn-container">

          <button
            onClick={() => {
              deleteMember(transientDelete.id).then(() => {
                setShowDeleteMemberModal(false)
              })
            }}
          >Yes</button>
          <button
            onClick={() => { setShowDeleteMemberModal(false) }}
          >No</button>
        </div>
      </div>
      </div>
    </main>
  )
}

export default HouseholdDetails
