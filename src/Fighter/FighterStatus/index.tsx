import React from 'react';
import './index.css';

interface FighterStatusProps {
  animal: string;
  weapon: string;
  power?: number;
  arrow_right?: boolean;
}

const FighterStatus: React.FC<FighterStatusProps> = ({
  animal,
  weapon,
  power = 0,
  arrow_right = true,
}) => {
  return (
    <div className={`status_display ${arrow_right ? 'arrow-right' : 'arrow-left'}`}>
      {arrow_right ?
        (<>
          <span className='animal'>{animal}</span>
          <div className='weapon_power'>
            <span className={'weapon'}>{weapon}</span>
            <span>{power}</span>
          </div>
        </>) : (
          <><div className='weapon_power'>
            <span className={'weapon'}>{weapon}</span>
            <span>{power}</span>
          </div>
            <span className='animal'>{animal}</span>
          </>)}
    </div>
  );
};

export { FighterStatus, type FighterStatusProps };
