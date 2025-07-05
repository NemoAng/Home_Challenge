// AddLineButton.tsx
import React from 'react';
import './index.css';

interface BattleStartProps {
  onClick: () => void;
  label?: string;
}

const BattleStart: React.FC<BattleStartProps> = ({
  onClick,
  label = 'Button Text',
}) => {
  return (
    <button className='battle-start-button'
      onClick={onClick}
      style={{
        marginTop: '10px',
        padding: '8px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        minWidth: '100px', 
      }}
    >
      {label}
    </button>
  );
};



export default BattleStart;