import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Fighter from './Fighter';
// import { LogZone } from './LogZone';
import LogZone, { LogZoneHandle } from './LogZone'; // 确保导入 LogZoneHandle

import BattleStart from './BattleStart';
import './App.css';

import { FighterStatus, type FighterStatusProps } from './Fighter/FighterStatus';
import { fetchPokemon, fetchSprint } from './DataGet/';
import getTwoUniqueNumbersFromArray from './Tools';

function Test() {
  return (
    <>
      <FighterStatus animal="Pikachu1" weapon="Thunderbolt" power={9001} />
      <FighterStatus animal="Pikachu2" weapon="Thunderbolt" arrow_right={false} />

      <Fighter fighter={{ animal: "Pikachu1", weapon: "Thunderbolt", power: 9001 }} img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg" />

      <Fighter fighter={{ animal: "Pikachu1", weapon: "Thunderbolt", power: 9001, arrow_right: false }} img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg" />

      <LogZone />

      <div>
        <BattleStart label="Start Battle!" onClick={() => { console.log('Battle started!'); }} />
      </div>
    </>
  );
}


function App() {
  const regex = React.useMemo(() => /pokemon\/(\d+)\//, []);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [spriteData, setSpriteData] = useState<any[]>([]);
  const [sprite1, setSprite1] = useState<any>(0);
  const [sprite2, setSprite2] = useState<any>(1);

  const logZoneRef = useRef<LogZoneHandle>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio_download = 600;

  const [triggerAnimation, setTriggerAnimation] = useState(0); // Use a number to trigger useEffect
  const [isPlaying, setIsPlaying] = useState(false); // To prevent rapid clicks during animation

  const handlePlayAnimation = () => {
    if (isPlaying) return; // Prevent new animation if one is already playing

    setIsPlaying(true); // Set playing state
    setTriggerAnimation(prev => prev + 1); // Increment to re-trigger useEffect

    // console.log('Animation triggered!');

    // After the animation duration (3 seconds), reset playing state
    setTimeout(() => {
      setIsPlaying(false);
      // console.log('Animation ended, ready for next click.');

      const [_sprite1, _sprite2] = getTwoUniqueNumbersFromArray(spriteData.length);
      setSprite1(_sprite1);
      setSprite2(_sprite2);

      handlePlay(audioRef.current);

      if (logZoneRef.current) { // <-- Added this check
        console.log(spriteData[_sprite1].stats, spriteData[_sprite2].stats);

        if (spriteData[_sprite1].stats > spriteData[_sprite2].stats) {
          logZoneRef.current.addLogMessage(`${spriteData[_sprite1].name} ${spriteData[_sprite1].moves[0].move.name} ${spriteData[_sprite2].name}, ${spriteData[_sprite1].name} WINS!`);
        } else {
          logZoneRef.current.addLogMessage(`${spriteData[_sprite2].name} ${spriteData[_sprite2].moves[0].move.name} ${spriteData[_sprite1].name}, ${spriteData[_sprite2].name} WINS!`);
        }
      }

    }, 2000); // Match animation-duration
  };


  useEffect(() => {
    if (pokemonData.length > 0) {
      // console.log('Pokemon data already fetched:');
      return;
    }

    setIsLoading(true);

    fetchPokemon().then(data => {
      const _pokemons = data.map((item: any) => {
        return {
          name: item.name,
          url: regex.exec(item.url)?.[1]
        };
      });

      // console.log('Fetched Pokemon data:', _pokemons); // Log the fetched data
      setPokemonData(_pokemons);

      _pokemons.forEach((pokemon: any) => {
        fetchSprint(pokemon.name).then(sprite => {
          setSpriteData(prev => [...prev, sprite]);
          // console.log(`Fetched sprite for ${pokemon.name}:`, sprite);
        }).catch(err => {
          console.error(`Failed to fetch sprite for ${pokemon.name}:`, err);
        });
      });

      setIsLoading(false);
    }).catch(err => {
      console.error('Failed to fetch sprite data:', err);
    });
  }, [pokemonData.length, regex]);

  const onStartBattle = () => {
    // setIsLoading(true);
    handlePlayAnimation();

    // const [_sprite1, _sprite2] = getTwoUniqueNumbersFromArray(spriteData.length);
    // setSprite1(_sprite1);
    // setSprite2(_sprite2);

    // handlePlay(audioRef.current);

    // if (logZoneRef.current) { // <-- Added this check
    //   console.log(spriteData[_sprite1].stats, spriteData[_sprite2].stats);

    //   if (spriteData[_sprite1].stats > spriteData[_sprite2].stats) {
    //     logZoneRef.current.addLogMessage(`${spriteData[_sprite1].name} ${spriteData[_sprite1].moves[0].move.name} ${spriteData[_sprite2].name}, ${spriteData[_sprite1].name} WINS!`);
    //   } else {
    //     logZoneRef.current.addLogMessage(`${spriteData[_sprite2].name} ${spriteData[_sprite2].moves[0].move.name} ${spriteData[_sprite1].name}, ${spriteData[_sprite2].name} WINS!`);
    //   }
    // }
    // setIsLoading(false);
  }

  // Function to handle playing the audio
  const handlePlay = (audio: HTMLAudioElement | null) => {
    // Check if the ref currently points to an audio element
    if (audio) {
      setTimeout(() => {
        audio.play()
          .then(() => {
            console.log('Audio started playing.');
            // setIsPlaying(true); // Update state to reflect playing status
          })
          .catch((error: any) => {
            // Handle potential errors, e.g., user hasn't interacted yet,
            // or browser policy blocks autoplay without user interaction.
            console.error('Error attempting to play audio:', error);
          });
      }, audio_download); // Optional delay before playing audio
    }
  };

  if (!isLoading && spriteData.length > 1) {
    var winner = sprite1 > sprite2 ? sprite1 : sprite2;
    // console.log('🥰', spriteData, sprite1, sprite2, winner);

    return (
      <>
        <div className='upper'>
          <div className='overlay'>
            <div className='overlay-left'></div>
            {/* <div className='overlay-middle is-expanded'></div> */}
            {/* <div className={`overlay-middle ${isMiddleExpanded ? 'is-expanded' : ''}`}></div>
            */}
            <div key={triggerAnimation} className={`overlay-middle animate-reset`}></div>
            <div className='overlay-right'></div>
          </div>
          <div>
            <Fighter fighter={{ animal: spriteData[sprite1].name, weapon: spriteData[sprite1].moves[0].move.name, power: spriteData[sprite1].stats }} img={spriteData[sprite1].front_sprites} />
          </div>

          <div>
            <Fighter fighter={{ animal: spriteData[sprite2].name, weapon: spriteData[sprite2].moves[0].move.name, power: spriteData[sprite2].stats, arrow_right: false }} img={spriteData[sprite2].front_sprites} />
          </div>
        </div>

        <div className='bottom'>
          <div className='log-zone'>
            <div className='log-left'>
              <LogZone ref={logZoneRef} />
            </div>
            <div className='log-right'>
              <audio className='audio' src={spriteData[winner].cry} preload="metadata" ref={audioRef} controls></audio>
              <BattleStart label="Start Battle!" onClick={onStartBattle} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="loading">
      <h2>Loading...</h2>
      <p>Please wait while we fetch the data.</p>
    </div>
  );
}

export { App, Test };
