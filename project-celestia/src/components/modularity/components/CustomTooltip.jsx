import React from 'react'

function formatNumber(num) {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(2)}k`;
    return num.toFixed(2);
  }
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
  
      return (
        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #444',
          color: '#fff',
          fontSize: '14px',
          fontFamily: 'MyCustomFont', // optional custom font
          maxWidth: '220px'
        }}>
          <div><strong>Name:</strong> {item.name}</div>
          <div><strong>Type:</strong> {item.type}</div>
          <div><strong>Damage:</strong> {formatNumber(item.damageValueInstance)}</div>
          <div><strong>Cumulative Damage:</strong> {formatNumber(item.damageValue)}</div>
          <div><strong>Time:</strong> {(item.duration / 1000).toFixed(2)}s</div>
        </div>
      );
    }
  
    return null;
  };

export default CustomTooltip