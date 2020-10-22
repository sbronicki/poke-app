const select = document.getElementById('pokedex');

// fill select with pokeapi data
const pokemon = axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(({ data }) => {
	for (let poke of data.results) {
		console.log(poke.name);
		select.options[select.options.length] = new Option(poke.name);
	}
});

// display selection & display with sprite from api
select.onchange = () => {
	let selection = event.target.value;

	const selectedPokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/${selection}/`).then(({ data }) => {
		document.getElementById('display').innerText = `${data.id}. ${selection}`;
	});
};
