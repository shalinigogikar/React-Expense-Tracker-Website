import React, { useState } from "react";

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const [expensesList, setExpensesList] = useState([]);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.amount || !expense.description || !expense.category) return;

    setExpensesList([...expensesList, expense]);
    setExpense({ amount: "", description: "", category: "Food" });
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Track Your Daily Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={expense.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>

      <h3>Expenses List:</h3>
      <table border="1" cellPadding={20}>
      <thead>
              <tr>
                <th>Amount (₹)</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
        {expensesList.map((item, index) => (
          <tr key={index}>
           <td> ₹{item.amount}</td>
            <td>{item.description}</td>
            <td>{item.category}</td></tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseForm;
