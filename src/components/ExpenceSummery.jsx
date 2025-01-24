import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const ExpenceSummery = ({budget,totalExpeneses}) => {
    // let {budget} = useExpenceManger()
    // console.log(budget)

  let RemainingAmount = budget-totalExpeneses 

    
  return (
    <div className='card my-2 shadow'>
    <h2 className='card-title text-success mx-auto'>Summery</h2>
  <div className="card-body my-1">
    <p className='card-text text-success fw-bold'>
        <span className='text-secondary fw-bold'>Total Expences : </span>{totalExpeneses.toFixed(2)}
    </p>
    <p className='card-text text-danger fw-bold'>
        <span className='text-secondary fw-bold'>Remaning Budget : </span>{RemainingAmount.toFixed(2)}
    </p>
  </div>
</div>
  )
}

export default ExpenceSummery
