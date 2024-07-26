import { deleteChore } from "../data/chores.jsx"
import './deleteModal.css'

function DeleteModal({ setShowDeleteModal, transientChore }) {

  return (
    <>
      <div className="notification is-danger">
        <button className="delete"
          onClick={() => { setShowDeleteModal(false) }}
        ></button>
        <p>Are you sure you want to delete <strong>&quot;{transientChore.name}&quot;</strong>?</p>

        <div className="btn-container">

          <button
            onClick={() => {
              deleteChore(transientChore.id).then(() => {
                setShowDeleteModal(false)
              })
            }}
          >Yes</button>
          <button
            onClick={() => { setShowDeleteModal(false) }}
          >No</button>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
