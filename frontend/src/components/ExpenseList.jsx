const categoryColors = {
  Food: '#e94560', Transport: '#3498db', Shopping: '#9b59b6',
  Bills: '#e67e22', Health: '#2ecc71', Other: '#f39c12',
}

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#555', padding: '40px' }}>
        No expenses yet. Add one above!
      </div>
    )
  }

  return (
    <div>
      <h3 style={{ color: '#aaa', marginBottom: '12px' }}>Recent Expenses</h3>
      {expenses.map(e => (
        <div key={e._id} style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            background: categoryColors[e.category] || '#333',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            minWidth: '70px',
            textAlign: 'center',
          }}>
            {e.category}
          </div>
          <span style={{ flex: 1, fontWeight: '500' }}>{e.title}</span>
          <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Rs. {e.amount.toLocaleString()}
          </span>
          <span style={{ color: '#666', fontSize: '0.8rem' }}>
            {new Date(e.date).toLocaleDateString()}
          </span>
          <button
            onClick={() => onDelete(e._id)}
            style={{
              background: 'rgba(233,69,96,0.2)',
              border: '1px solid #e94560',
              color: '#e94560',
              borderRadius: '6px',
              padding: '4px 10px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}