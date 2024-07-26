import { useEffect, useState } from 'react'
import { getUserHouseholds } from '../data/households.jsx'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

// TODO this would be better as a pop-up dropdown than a page
function Household() {
const [households, setHouseholds] = useState([])
const navigate = useNavigate()

useEffect(()=>{
getUserHouseholds().then((data)=>{
  setHouseholds(data)
})
},[])

  return (
    <main className='box'>
      <h1 className='title is-2'>Welcome to your Households</h1>
      <div></div>
      <h3 className='subtitle'>Select a Household</h3>
      <div className='choices'>
      {households.map(household => (
        <button 
        className='button is-primary is-light'
        key={household.id}
        onClick={()=>{navigate(`/household/${household.household.id}`)}}
        >
          {household.household.name}</button>
      ))}
      </div>
    </main>
  )
}

export default Household
