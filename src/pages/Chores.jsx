import { useEffect, useState } from 'react'
import { getHouseholdChores, updateChore } from '../data/chores.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { getHouseholdById } from '../data/households.jsx'
import Modal from '../components/Modal.jsx'
import DeleteModal from '../components/deleteModal.jsx'
import './Chores.css'
import 'bulma/css/bulma.css'

function Chores() {
const [chores, setChores] = useState([])
const [household, setHousehold] = useState({})
const {householdId} = useParams()
const [showChoreModal, setShowChoreModal] = useState(false)
const [showEditModal, setShowEditModal] = useState(false)
const active = showChoreModal ? ("is-active"):("")
const activeEdit = showEditModal ? ("is-active"):("")
const [showDeleteModal, setShowDeleteModal] = useState(false)
const activeDelete = showDeleteModal ? ('is-active'):("")
const[transientChore, setTransientChore] = useState({})

useEffect(()=>{
getHouseholdChores(householdId).then((data)=>{
  setChores(data)
})
getHouseholdById(householdId).then((data)=>{
    setHousehold(data)
})
},[householdId, showChoreModal,showDeleteModal])


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
      <h3>Chores</h3>
      {chores.map(chore => (
        <div className='chore'
        key={chore.id}>
        <label 
        className='checkbox'>
            <input type="checkbox" 
            defaultChecked = {chore.complete}
            onClick={()=>{updateChore(chore.id).then(()=>{
              getHouseholdChores(householdId)})}
            }
            />
          {chore.name
          }</label>
          {/* TODO: add toggle for these buttons */}
          <button 
          value={chore.id}
          onClick={()=>{setShowEditModal(true)}}
          > <i className="fa-regular fa-pen-to-square"></i> </button>
          <button
          onClick={()=>{
            setTransientChore(chore)
            setShowDeleteModal(true)}}
          > 
          <i className="fa-regular fa-trash-can"></i> 
          </button>
          </div>
      ))}
      <div className={`modal ${active}`}>
      <Modal setShowChoreModal={setShowChoreModal} householdId = {household} />
        </div>
        <div className={`modal ${activeEdit}`}>
            {/* add edit modal */}
            {/* <Modal setShowChoreModal={setShowEditModal}/> */}
        </div>
        <div className={`modal ${activeDelete}`}>
      <DeleteModal setShowDeleteModal={setShowDeleteModal} transientChore={transientChore}/>
        </div>

    </main>
  )
}

export default Chores
