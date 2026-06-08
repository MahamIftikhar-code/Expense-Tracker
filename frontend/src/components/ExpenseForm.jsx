import { useState } from 'react'

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Other']

const card = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '24px',
  border: '1px solid rgba(255,255,255,0.1)',
}

const input = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food' })

  const handleSubmit = async () => {
    if (!form.title || !form.amount) return
    await onAdd({ ...form, amount: parseFloat(form.amount) })
    setForm({ title: '', amount: '', category: 'Food' })
  }

  return (
    <div style={card}>
      <h3 style={{ margin: '0 0 16px', color: '#aaa' }}>Add Expense</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
        <input
          style={input}
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          style={input}
          placeholder="Amount (Rs.)"
          type="number"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <select
          style={input}
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          onClick={handleSubmit}
          style={{
            background: 'linear-gradient(135deg, #e94560, #c0392b)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          + Add
        </button>
      </div>
    </div>
  )
}