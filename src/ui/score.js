import React from 'react';

function Score({ score }) {
  return (
    <p style={{ position: 'absolute', top: '10px', left: '10px' }}>
      Score: {score}
    </p>
  )
}

export default Score;