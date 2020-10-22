const select = document.getElementById('pokedex');

function getPokemon() {
	const pokemon = axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(({ data }) => {
		for (let poke of data.results) {
			console.log(poke.name);
			select.options[select.options.length] = new Option(poke.name);
		}
	});
}

getPokemon();

select.onchange = () => {
	let selection = event.target.value;
	document.getElementById('display').innerText = selection;
};
