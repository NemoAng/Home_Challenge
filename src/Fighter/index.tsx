import React from 'react';
import './index.css';
import { FighterStatus, FighterStatusProps } from './FighterStatus/'

interface FighterProps {
  fighter: FighterStatusProps;
  img: string;
}

const Fighter: React.FC<FighterProps> = ({
  fighter = { animal: "", weapon: "", power: 0, arrow_right: true },
  img = '',
}) => {
  return (
    <div className='fighter'>
      {fighter.arrow_right === false ? (
        <>
          <div className="fighter-controls">
            <img className='img-reverse' src={img} alt="Fighter Image" />
          </div>
          <FighterStatus
            animal={fighter.animal}
            weapon={fighter.weapon}
            power={fighter.power}
            arrow_right={fighter.arrow_right}
          />
        </>) : (
          <>
            <FighterStatus
              animal={fighter.animal}
              weapon={fighter.weapon}
              power={fighter.power}
              arrow_right={fighter.arrow_right}
            />
          <div className="fighter-controls">
            <img src={img} alt="Fighter" />
          </div>
        </>)}
    </div>
  );
};

export default Fighter;
