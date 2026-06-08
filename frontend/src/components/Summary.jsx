const categoryColors = {
  Food: '#e94560',
  Transport: '#0f3460',
  Shopping: '#533483',
  Bills: '#e94560',
  Health: '#2ecc71',
  Other: '#f39c12',
}

const card = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '16px',
  padding: '20px',
  marginBottom: '24px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
}

export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  return (
    <div style={card}>
      <h2 style={{ margin: '0 0 16px', color: '#e94560' }}>
        Total Spent: <span style={{ color: '#fff' }}>Rs. {total.toLocaleString()}</span>
      </h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {Object.entries(byCategory).map(([cat, amt]) => (
          <div key={cat} style={{
            background: categoryColors[cat] || '#333',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
          }}>
            {cat}: Rs. {amt.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  )
}