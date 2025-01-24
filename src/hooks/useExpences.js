import { useState,useCallback,useMemo, useEffect } from "react";

const useExpenceManger = (initialBudget = 1000)=>{
  const [budget, setBudget] = useState(()=>{
    const saveBudget = localStorage.getItem("budget");
    return saveBudget ? JSON.parse(saveBudget):initialBudget
  }); // used for Tracking the budget
  
  const [searchQuery, setSearchQuery] = useState("All"); //used for tracking the search values given by user
  const [filter, setFilter] = useState("All"); //used for tracking the select dropdown filter

  const [expenses, setExpenses] = useState(()=>{
    const savedExpence = localStorage.getItem("expenses");
    return savedExpence ? JSON.parse(savedExpence) : [];
  }); // used for Tracking the Expeneses dynamically
 
  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses))
    localStorage.setItem("budget",JSON.stringify(budget))
  })


  //  usecallback hook to check weather user has entered the same expenses or not
  const addExpense = useCallback(( name, category, amount ) => {
    setExpenses((prev) => [
      ...prev,
      { id: Date.now(), name, category, amount: parseFloat(amount) },
    ]);
  }, []);
  
  //it is for edit expence
  const editExpence = (id , updateExpence)=>{
    setExpenses((prevExp)=> prevExp.map((expense)=>
    expense.id === id ? {...expense, ...updateExpence} : expense)
  )
  };
  
  // remove expence
  const removeExpence = (id) => {
    setExpenses((prevExp)=> prevExp.filter((expence)=> expence.id !== id));
  }

  //   useMemo hook to prevent re-render when user is search the same value {query } again
  let filterExpenses = useMemo(() => {
    return expenses
    .filter((expense) =>
      expense.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((expense) =>filter==="All"?true:expense.category===filter)
  }, [expenses, filter, searchQuery]);


//   calculating the Total Expenses
let totalExpeneses=useMemo(()=>{
  return expenses.reduce((total,expense)=>total+expense.amount,0)
},[expenses])

  return {budget,setBudget,searchQuery,setSearchQuery,filter,setFilter,removeExpence,
    expenses,setExpenses,addExpense,filterExpenses,totalExpeneses,editExpence};
};


export default useExpenceManger