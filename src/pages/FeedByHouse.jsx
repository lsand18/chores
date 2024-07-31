import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getFeedByHouseId, deleteFeed } from "../data/feed.jsx"
import { getHouseholdById } from "../data/households.jsx"
import FeedModal from "../components/FeedModal.jsx"

function FeedByHouse() {
const navigate = useNavigate()
const {householdId} = useParams()
const [household, setHousehold] = useState({})
const [feed, setFeed] = useState([])
const [showFeedModal, setShowFeedModal] = useState(false)
const active = showFeedModal ? ("is-active") : ("")


const refresh = () => {
    getFeedByHouseId(householdId).then((data)=>{
      setFeed(data)
    })
}
useEffect(()=>{
refresh()
getHouseholdById(householdId).then((data) => {
  setHousehold(data)})
},[householdId])

return(
    <main className='box'>
    <h1 className='title'>{household?.name}</h1>
    <div className='btn-container'>
    <button className='button is-success'
      onClick={() => { setShowFeedModal(true) }}
    > 
    <span className='icon is-small'>
      <i className="fa-solid fa-plus"></i>
    </span>
    <span>Add Feed</span> </button>
    
    </div>

    <div className='header'>
      <h3 className='title is-4'>Feed</h3>
      </div>

      <div className='container'>
      {feed.map(feedItem => (
        <div className='box'
          key={feedItem.id}>
            <p className="title">
            &nbsp;&nbsp;{feedItem.name}
            </p>

            <div className='btn-list-container'>
          <button className='button'
            value={feedItem.id}
            onClick={() => {
              window.open(`${feedItem.url}`)
            }}
          > 
          <span className='icon is-small'><i className="fa fa-external-link"></i></span>
          <span> Order More </span> </button>
          <button
          className='button'
            onClick={() => {
              deleteFeed(feedItem.id).then((res)=>{
                res !={"message":"FOREIGN KEY constraint failed"} ?(
                  refresh()
                ):(
                  window.alert("You cannot delete this")
                )
                
              })
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
      <FeedModal setShowFeedModal={setShowFeedModal} householdId={householdId} setFeed={setFeed}/>
      </div>
    </main>

)

}
    export default FeedByHouse