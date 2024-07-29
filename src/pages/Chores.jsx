import { useEffect, useState } from 'react'
import { getHouseholdChores, updateChore } from '../data/chores.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { getHouseholdById } from '../data/households.jsx'
import Modal from '../components/Modal.jsx'
import DeleteModal from '../components/deleteModal.jsx'
import './Chores.css'

function Chores() {
  const [chores, setChores] = useState([])
  const [household, setHousehold] = useState({})
  const { householdId } = useParams()
  const [showChoreModal, setShowChoreModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const active = showChoreModal ? ("is-active") : ("")
  const activeEdit = showEditModal ? ("is-active") : ("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const activeDelete = showDeleteModal ? ('is-active') : ("")
  const [transientChore, setTransientChore] = useState({})

  useEffect(() => {
    getHouseholdChores(householdId).then((data) => {
      setChores(data)
    })
    getHouseholdById(householdId).then((data) => {
      setHousehold(data)
    })
  }, [householdId, showChoreModal, showDeleteModal])


  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <main className='box'>
      <h1 className='title'>{household?.name}</h1>
      <div className='btn-container'>
      <button className='button is-success'
        onClick={() => { setShowChoreModal(true) }}
      > 
      <span className='icon is-small'>
        <i className="fa-solid fa-plus"></i>
      </span>
      <span>Add Chore</span> </button>
      
      </div>

      <div className='header'>
      <h3 className='title is-4'>Chores</h3>
      <h3 className='subtitle is-6'>{formattedDate}</h3>
      </div>
      <div className='container'>
      {chores.map(chore => (
        <div className='box'
          key={chore.id}>
          <label
            className='checkbox'>
            <input type="checkbox"
              defaultChecked={chore.complete}
              onClick={() => {
                updateChore(chore.id).then(() => {
                  getHouseholdChores(householdId)
                })
              }
              }
            />
            <p className="title">
            &nbsp;&nbsp;{chore.name}
            </p>
            </label>
            
              {chore.feed ? (
                <div className='subtitle is-5'>
            Feed: {chore.feed?.name} </div> ): ("")}
            
          {/* TODO: add toggle for these buttons */}
          <div className='btn-list-container'>
          <button className='button'
            value={chore.id}
            onClick={() => { setShowEditModal(true) }}
          > 
          <span className='icon is-small'><i className="fa-regular fa-pen-to-square"></i></span>
          <span> Edit</span> </button>
          <button
          className='button'
            onClick={() => {
              setTransientChore(chore)
              setShowDeleteModal(true)
            }}
          >
            <span className='icon is-small'>
            <i className="fa-regular fa-trash-can"></i></span>
            <span> Delete </span>
          </button>
          </div>
        </div>
      ))}
      </div>
      <div className={`modal ${active}`}>
        <Modal setShowChoreModal={setShowChoreModal} householdId={household} />
      </div>
      <div className={`modal ${activeEdit}`}>
        {/* add edit modal */}
        {/* <Modal setShowChoreModal={setShowEditModal}/> */}
      </div>
      <div className={`modal ${activeDelete}`}>
        <DeleteModal setShowDeleteModal={setShowDeleteModal} transientChore={transientChore} />
      </div>
    </main>

  )
}

export default Chores
