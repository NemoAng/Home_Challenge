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
  const regex = /pokemon\/(\d+)\//;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [spriteData, setSpriteData] = useState<any[]>([]);
  const [pokemon1, setPokemon1] = useState<any>(0);
  const [pokemon2, setPokemon2] = useState<any>(1);

  const logZoneRef = useRef<LogZoneHandle>(null);

  useEffect(() => {
    if (pokemonData.length > 0) {
      console.log('Pokemon data already fetched:');
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
        fetchSprint(pokemon.url).then(sprite => {
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
  }, []);

  const onStartBattle = () => {
    // setIsLoading(true);
    const [pokemon1, pokemon2] = getTwoUniqueNumbersFromArray(pokemonData.length);

    // console.log(`Selected Pokemon indices: ${pokemon1}, ${pokemon2}`);
    // console.log('Battle started!....', pokemonData);
    setPokemon1(pokemon1);
    setPokemon2(pokemon2);

    if (logZoneRef.current) { // <-- Added this check
      logZoneRef.current.addLogMessage(`${pokemonData[pokemon1].name} vs ${pokemonData[pokemon2].name},${pokemonData[pokemon1].name} WINS!`);
    }
    // setIsLoading(false);
  }

  if (!isLoading) {
    return (
      <>
        <div>
          <Fighter fighter={{ animal: pokemonData[pokemon1].name, weapon: "Thunderbolt", power: 9001 }} img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg" />
        </div>

        <div>
          <Fighter fighter={{ animal: pokemonData[pokemon2].name, weapon: "Thunderbolt2", power: 1001, arrow_right: false }} img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg" />
        </div>

        <div className='log-zone'>
          <div className='log-left'>
            <LogZone ref={logZoneRef} />
          </div>
          <div className='log-right'>
            <BattleStart label="Start Battle!" onClick={ onStartBattle } />
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
