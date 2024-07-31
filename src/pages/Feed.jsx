import { useEffect, useState } from 'react'
import { getUserHouseholds } from '../data/households.jsx'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

// TODO this would be better as a pop-up dropdown than a page
function Feed() {
const [households, setHouseholds] = useState([])
const navigate = useNavigate()

useEffect(()=>{
getUserHouseholds().then((data)=>{
  setHouseholds(data)
})
},[])

  return (
    <main className='box'>
      <h1 className='title is-2'>Choose a Household</h1>
      <div className='choices'>
      {households.map(household => (
        <button 
        className='button is-primary is-light'
        key={household.id}
        onClick={()=>{navigate(`/feed/${household.household.id}`)}}
        >
          {household.household.name}</button>
      ))}
      </div>
    </main>
  )
}

export default Feed