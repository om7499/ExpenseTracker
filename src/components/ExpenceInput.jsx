import React,{useState} from 'react'
import { toast } from 'react-toastify'


const ExpenceInput = ({addExpense,budget,totalExpeneses}) => {
    const [name ,setName]=useState('')
    const [amount,setAmount]=useState('')
    const [category,setCategory]= useState("food")
   
    // function to handel the add expences
    const handelAdd = () => {
      //console.log("addExpence function:", addExpense); // Debug log
      if (addExpense && typeof addExpense === "function") {
          if (name && amount) {
            if(amount > budget-totalExpeneses){
                setAmount('')
                setName('')
                setCategory("All")
                toast.error('Remaining Budget is Less...!')
            }
            else{
              addExpense(name, category, amount);
              setName('');
              setAmount('');
            }
          }
      } else {
          console.error("addExpence is not a valid function!");
      }
  };

    //console.log(name,amount,category)

  return (
    <div className="card shadow">
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4">
        <div className="form-floating my-2 mx-2">
            <input type="text"
             className="form-control"
             value={name}
             id="floatingInput"
             placeholder='enter the budget name'
             onChange={(e)=>setName(e.target.value)} />
            <label htmlFor="floatingInput">Expense Name</label>
            </div>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">
        <div className="form-floating my-2 mx-2">
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
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2">
        <div className="form-floating my-2 mx-2">
            <input type="number" className="form-control" id="amount" value={amount} placeholder='enter the budget price'onChange={(e)=> setAmount(e.target.value)} />
            <label htmlFor="amount">Cost</label>
            </div>
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2">
            <button className='btn btn-lg btn-success my-2 ms-2 py-2 px-5 px-md-3  px-lg-5 'onClick={()=>handelAdd()}>ADD</button>
        </div>
      </div>
    </div>
  )
}

export default ExpenceInput
