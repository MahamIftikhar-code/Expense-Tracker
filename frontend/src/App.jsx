import { useState, useEffect } from 'react'
import axios from 'axios'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'

const API = '/api/expenses'

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#eee',
    padding: '30px 20px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.5rem',
    background: 'linear-gradient(90deg, #e94560, #0f3460)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  subtitle: {
    color: '#aaa',
    marginTop: '8px',
  }
}

export default function App() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    axios.get(API).then(res => setExpenses(res.data)).catch(console.error)
  }, [])

  const addExpense = async (data) => {
    const res = await axios.post(API, data)
    setExpenses([res.data, ...expenses])
  }

  const deleteExpense = async (id) => {
    await axios.delete(`${API}/${id}`)
    setExpenses(expenses.filter(e => e._id !== id))
  }

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>💸 Expense Tracker</h1>
          <p style={styles.subtitle}>Track your spending in style</p>
        </div>
        <Summary expenses={expenses} />
        <ExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </div>
    </div>
  )
}