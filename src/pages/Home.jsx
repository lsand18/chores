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
    <main className='text-slate-900 pl-10 pr-10'>
      <h1 className='text-4xl'>Welcome to Chore Check</h1>
      <h3>Select a Household</h3>
      {households.map(household => (
        <button key={household.id}
        className='btn'
        onClick={()=>{navigate(`chores/${household.household.id}`)}}
        >
          {household.household.name}</button>
      ))}
    </main>
  )
}

export default Home
