// import { useEffect, useState } from "react"
import { deleteChore } from "../data/chores.jsx"
// import { getChoreById } from "../data/chores.jsx"

function DeleteModal ({setShowDeleteModal, transientChore}){
    // const[choreObj,setChoreObj] = useState({
    //     name: ""
    // })

    // useEffect(()=>{
    //     getChoreById(parseInt(choreId)).then((chore)=>{
    //         setChoreObj(chore)
    //     })
    // }, [choreId])

    return(
        <>
        <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Are you sure you want to delete &quot;{transientChore.name}&quot;?</p>
              <button
                onClick={()=>{setShowDeleteModal(false)
                }}
                className="delete"
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <div></div>
                <button 
                onClick={()=>{
                    deleteChore(transientChore.id).then(()=>{
                        setShowDeleteModal(false)
                    })}}
                > Yes </button>
                </div>
                <div>
                <button onClick={()=>{setShowDeleteModal(false)}
                }> No </button>
              </div>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
</>
            )}

            export default DeleteModal
