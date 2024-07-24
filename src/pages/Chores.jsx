import { useEffect, useState } from 'react'
import { getHouseholdChores, updateChore } from '../data/chores.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { getHouseholdById } from '../data/households.jsx'
import Modal from '../components/Modal.jsx'
import './Chores.css'
import 'bulma/css/bulma.css'

function Chores() {
const [chores, setChores] = useState([])
const [household, setHousehold] = useState({})
const navigate = useNavigate()
const {householdId} = useParams()
const [showChoreModal, setShowChoreModal] = useState(false)
const [showEditModal, setShowEditModal] = useState(false)
const active = showChoreModal ? ("is-active"):("")
const activeEdit = showEditModal ? ("is-active"):("")

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
      <h3>Chores</h3>
      {chores.map(chore => (
        <div className='chore'
        key={chore.id}>
        <label 
        className='checkbox'>
            <input type="checkbox" 
            onChange={updateChore(chore.id)}
            />
          {chore.name
          }</label>
          <button 
          onClick={()=>{setShowEditModal(true)}}
          > Edit Chore </button>
          </div>
      ))}
      <div className={`modal ${active}`}>
      <Modal setShowChoreModal={setShowChoreModal} householdId = {household} />
        </div>
        <div className={`modal ${activeEdit}`}>
            {/* add edit modal */}
            {/* <Modal setShowChoreModal={setShowEditModal}/> */}
        </div>
    </main>
  )
}

export default Chores
