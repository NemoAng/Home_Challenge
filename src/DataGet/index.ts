const fetchPokemon = async () => {
  try {
    // Construct the URL using the userId prop
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);

    // Check if the response was successful (status code 200-299)
    if (!response.ok) {
      // If not successful, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON response

    // console.log('Fetched Pokemon data:', data); // Log the fetched data
    return data.results; // Return the results array
  } catch (err: any) {
    // Check if the error was due to the request being aborted
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      // setError(`Failed to fetch user: ${err.message}`); // Set error message
      console.error(`Failed to fetch user: ${err.message}`); // Log error message
    }
  } finally {
    // setIsLoading(false); // End loading, regardless of success or failure
    console.log('Fetch attempt completed'); // Log completion
  }
};


const fetchSprint = async (name: string) => {
  try {
    // Correction 1: The second argument to fetch() should be an options object.
    // You passed '{id}', which is incorrect.
    // For a simple GET request, you usually don't need options unless you're
    // using an AbortSignal or specific headers.
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`); // Added trailing slash for consistency

    // Check if the response was successful (status code 200-299)
    if (!response.ok) {
      // If not successful, throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON response

    // Correction 2: The PokeAPI endpoint for a single Pokémon (e.g., /pokemon/1/)
    // returns the data for *that specific Pokémon directly*, not an object with a 'results' array.
    // 'data.results' is typically found when fetching a *list* of resources, like /pokemon/ or /pokemon?limit=20.
    // For a single Pokémon, 'data' *is* the Pokémon object.
    // console.log('Fetched Sprint data:', data.sprites); // Log the fetched data
    var sprites_data = {
      name: name,
      stats: data['stats'][0]['base_stat'],
      front_sprites: data['sprites']['front_default'],
      back_sprites: data['sprites']['back_default'],
      primary_type: data['types'][0]['type']['name'],
      cry: data['cries']['legacy'],
      moves: data['moves']
    }
    return sprites_data; // Return the Pokémon data object directly
  } catch (err: any) {
    // This part is fine for error handling within the function
    if (err.name === 'AbortError') {
      console.log('Fetch aborted'); // This would only trigger if you passed an AbortSignal
    } else {
      console.error(`Failed to fetch sprint (Pokemon ${name}): ${err.message}`); // Log error message
      // If you're using this in a React component, you might want to return null or
      // re-throw the error so the calling component can handle the error state.
      return null; // Or throw err;
    }
  } finally {
    // This part is fine for logging completion
    console.log(`Fetch attempt for Pokemon ${name} completed`); // Log completion
  }
};

export {fetchPokemon, fetchSprint};
