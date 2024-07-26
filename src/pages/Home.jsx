import { useEffect, useState } from 'react'
import { getUserHouseholds } from '../data/households.jsx'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
const [households, setHouseholds] = useState([])
const navigate = useNavigate()

useEffect(()=>{
getUserHouseholds().then((data)=>{
  setHouseholds(data)
})
},[])

  return (
    <main className='box'>
      <h1 className='title is-2'>Welcome to Chore Check</h1>
      <div>
      <h3 className='subtitle'>Select a Household</h3>
      </div>
      <div className='choices'>
      {households.map(household => (
        <button key={household.id}
        className='button is-primary is-light'
        onClick={()=>{navigate(`chores/${household.household.id}`)}}
        >
          {household.household.name}</button>
      ))}
      </div>
    </main>
  )
}

export default Home
