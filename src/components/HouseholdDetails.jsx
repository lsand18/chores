import { useEffect, useState } from 'react'
import { getHouseholdMembersByHouseholdId, deleteMember, getUsersBySearchTerm, addHouseholdMember } from '../data/households.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import "./householdDetails.css"

function HouseholdDetails() {
  const [household, setHousehold] = useState([])
  const navigate = useNavigate()
  const { householdId } = useParams()
  const [showMemberModal, setShowMemberModal] = useState(false)
  const active = showMemberModal ? ("is-active") : ("")
  // get all members usernames as state
  const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false)
  const activeDelete = showDeleteMemberModal ? ("is-active") : ("")
  const [transientDelete, setTransientDelete] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [searchedUsers, setSearchedUsers] = useState([])
  const [newMembers, setNewMembers] = useState([])

  const refresh = () =>{
    getHouseholdMembersByHouseholdId(householdId).then((data) => {
      setHousehold(data)
    })
  }
  useEffect(() => {
    refresh()
    }, [householdId, showMemberModal, showDeleteMemberModal])

  useEffect(()=>{
      getUsersBySearchTerm(searchTerm, householdId).then((data)=>{
        setSearchedUsers(data)
      })
  },[searchTerm])

  return (

    <main className='box'>
      <div className='btn-container'>
        <button className='button is-success'
          onClick={() => { setShowMemberModal(true) }}
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
            <p className='title is-5'> {member?.user.first_name} {member?.user.last_name}</p>
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
                {/* <span> Delete </span> */}
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
              onClick={() => { setShowMemberModal(false); setNewMembers([]); setSearchedUsers([]); setSearchTerm("")}}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <div className='card'>
            <div className="dropdown is-active">
                <div className="dropdown-content">

                  <div className="field dropdown-item">
                    <div className="control has-icons-left">
                      <input type="text" value={searchTerm} placeholder="Type Member's Name..." className="input is-transparent"
                      onChange={(event)=>{setSearchTerm(event.target.value)}}
                      />
                      <span className="icon is-left">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>

                  {searchedUsers?.map(user => (
                  <a key={user.id} className="dropdown-item"
                  onClick={()=>{
                    const copy = [ ...newMembers]
                    copy.push(user)
                    setNewMembers(copy)
                  }}
                  >
                    {user.first_name} {user.last_name}
                  </a>
                  ))}
                </div>
                </div>
                
                <div className='list'>
                  <h2 className='title is-5'> New Members Added </h2>
                  <ul>
                    {newMembers.map(member => (
                      <li key={member.id}>
                        {member.first_name} {member.last_name}
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success"
              onClick={async () => {
                addHouseholdMember(newMembers, householdId).then(()=>{
                  refresh()
                setShowMemberModal(false)
                setNewMembers([])
                setSearchedUsers([])
                setSearchTerm("")})
              }}
            >Save</button>
            <button
              onClick={() => { setShowMemberModal(false); setNewMembers([]); setSearchedUsers([]); setSearchTerm("")}}
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
          <p className="title is-6">Are you sure you want to delete <strong>&quot;{transientDelete?.user?.first_name} {transientDelete?.user?.last_name}&quot;</strong> from your household?</p>

          <div className="btn-container">

            <button className='button'
              onClick={() => {
                deleteMember(transientDelete.id).then(() => {
                  refresh()
                  setShowDeleteMemberModal(false)
                })
              }}
            >Yes</button>
            <button className='button'
              onClick={() => { setShowDeleteMemberModal(false) }}
            >No</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HouseholdDetails
