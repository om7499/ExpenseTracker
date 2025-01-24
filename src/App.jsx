import { useEffect, useState } from 'react'
import './App.css'

import ExpenceInput from './components/ExpenceInput'
import ExpenceList from './components/ExpenceList'
import ExpenceSummery from './components/ExpenceSummery'
import useExpenceManger from './hooks/useExpences'
import useDebounce from './hooks/useDebounce'

function App() {
  
  // custom hook
  let {setBudget,budget, addExpense,expenses,totalExpeneses,removeExpence,
    filter,setFilter,setSearchQuery,editExpence,filterExpenses}= useExpenceManger()

  // state to hold the Search Term
  const [searchTerm,setSearchTerm]=useState('')
  let searchDebounce = useDebounce(searchTerm,3000)
  console.log(searchTerm)

  // useEffect hook for handel the side effect
  useEffect(()=>{
  setSearchQuery(searchDebounce)
 
  },[setSearchQuery,searchDebounce])
   
  
 
  return (
    <>
    <div className='container'>
     <h1 className='text-center text-warning my-2 text-bg-success py-2 rounded-2'>Expense Tracker</h1>
      {/* budget input start*/}
      <div className="form-floating my-3">
        <input type="text" 
        className="form-control " 
        id="budget"
        value={budget}
        onChange={(e)=>setBudget(parseFloat(e.target.value)||0)}
        />
        <label htmlFor="floatingInput">Budget</label>
      </div>
      {/* budget input end*/}

      {/* Expences Input start*/}
       <ExpenceInput
       addExpense = {addExpense}
       budget={budget}
       totalExpeneses={totalExpeneses}
       />

      {/* search and filter functionalities */}
       <div className="card my-2 p-2 shadow">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 my-2">
          <div className="form-floating ">
          <input type="text" 
            className="form-control" 
            id="search" value={searchTerm}
            placeholder='search'
            onChange={(e) =>setSearchTerm(e.target.value)}
            
            />
             <label htmlFor="search">Search</label>
             </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-2 ">
              <div className="form-floating">
              <select className="form-select" id="floatingSelect" onChange={(e)=>setFilter(e.target.value)}>
                  <option value="All">All</option> 
                  <option value="Food">Food</option> 
                  <option value="Entertanment">Entertanment</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Travel">Travel</option>
                  <option value="other">other</option>
              </select>
            </div>
          </div>
        </div>
       </div>
      {/* expences list */}
       <ExpenceList 
       expenses={filterExpenses}
       editExpence={editExpence}
       removeExpence={removeExpence} />
      {/* Expences Summery */}
      <ExpenceSummery totalExpeneses={totalExpeneses} budget={budget} />
    </div>
    </>
  )
}

export default App
