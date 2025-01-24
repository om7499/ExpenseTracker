import React from 'react'
import { useState } from 'react';

const ExpenceList = ({expenses,editExpence, removeExpence}) => {
   
  const [isEditing, setIsEditing] = useState(false);
  const [name ,setName]=useState(expenses.name)
  const [amount,setAmount]=useState(expenses.amount)
  const [category,setCategory]= useState(expenses.category)
  const [currentExpenseId, setCurrentExpenseId] = useState(null); 
   
  const handelSave = ()=>{
    editExpence(currentExpenseId, { name, amount: parseFloat(amount), category });
    setIsEditing(false);
    setCurrentExpenseId(null);
  }

  const handleEdit = (expense) => {
    setIsEditing(true);
    setCurrentExpenseId(expense.id); // Identify the expense being edited
    setName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);
  };
  
  return (
    <div className="p-3 card shadow bgcolor">
      <ul className="list-group">
        {expenses.map((expense) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={expense.id}
          >
            {isEditing && currentExpenseId === expense.id ? (
              <div className="form-floating d-flex row w-100">
                <div className='col-sm-12 col-md-4 col-lg-4'>
                <input
                  className="text-black form-control mb-2"
                  value={name}
                  placeholder='Expence Name'
                  onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className='col-sm-12 col-md-4 col-lg-4'>
                  <select className="form-select" id="floatingSelect" value={category} onChange={(e)=>setCategory(e.target.value)}>
                      <option value="" disabled>Select the category</option>
                      <option value="All">All</option> 
                      <option value="Food">Food</option> 
                      <option value="Entertanment">Entertanment</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Travel">Travel</option>
                      <option value="other">other</option>
                  </select>
                </div>
                <div className='col-sm-12 col-md-2 col-lg-2'>
               <input
                  className="text-black form-control mb-2"
                  value={amount}
                  type="number"
                  placeholder='amount'
                  onChange={(e) => setAmount(e.target.value)}
                />
               </div>
                <div className='col-sm-12 col-md-2 col-lg-2'>
                <button
                  className="btn w-100  bg-warning"
                  onClick={handelSave}
                >Save</button>
                </div>
              </div>
            ) : (
              <>
                <span className="text-success">{expense.name}</span>
                <div>
                  <span className="badge bg-warning rouded-pill py-2 ">
                  <span className="badge bg-success rouded-pill py-2 fw-bold px-3 mx-1">{expense.category}
                  </span>{expense.amount.toFixed(2)}</span>
                  <button className="p-1 btn btn-sm shadow ms-2"
                    onClick={() => handleEdit(expense)}
                  > ✒️</button>
                  <button className="p-1 btn btn-sm shadow ms-2"
                    onClick={() => removeExpence(expense.id)}
                  > ❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExpenceList
