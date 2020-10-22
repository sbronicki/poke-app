const select = document.getElementById('pokedex');
function getNextPokemons(url = 'https://pokeapi.co/api/v2/pokemon/') {
	return axios.get(url);
}

function getPokemon() {
	const pokemon = axios.get('https://pokeapi.co/api/v2/pokemon/').then(({ data }) => {
		for (let poke of data.results) {
			console.log(poke.name);
			select.options[select.options.length] = new Option(poke.name);
		}
		return getNextPokemons(data.next);
	});
}

getPokemon();

select.onchange = () => {
	let selection = event.target.value;
	console.log(selection);
	document.getElementById('display').innerText = selection;
};
