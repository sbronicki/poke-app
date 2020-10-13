let n = 1;
const select = document.getElementById('pokedex');
async function getNextPokemons(url = 'https://pokeapi.co/api/v2/pokemon/') {
	return axios.get(url);
}

async function getPokemon() {
	const pokemon = axios
		.get('https://pokeapi.co/api/v2/pokemon/')
		.then(({ data }) => {
			for (let poke of data.results) {
				console.log(poke.name);
				select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
				n++;
			}
			return getNextPokemons(data.next);
		})
		.then(({ data }) => {
			for (let poke of data.results) {
				console.log(poke.name);
				select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
				n++;
			}
			return getNextPokemons(data.next);
		});
	// .then(({ data }) => {
	// 	for (let poke of data.results) {
	// 		console.log(poke.name);
	// 		select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
	// 		n++;
	// 	}
	// 	return getNextPokemons(data.next);
	// })
	// .then(({ data }) => {
	// 	for (let poke of data.results) {
	// 		console.log(poke.name);
	// 		select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
	// 		n++;
	// 	}
	// 	return getNextPokemons(data.next);
	// })
	// .then(({ data }) => {
	// 	for (let poke of data.results) {
	// 		console.log(poke.name);
	// 		select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
	// 		n++;
	// 	}
	// 	return getNextPokemons(data.next);
	// })
	// .then(({ data }) => {
	// 	for (let poke of data.results) {
	// 		console.log(poke.name);
	// 		select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
	// 		n++;
	// 	}
	// 	return getNextPokemons(data.next);
	// })
	// .then(({ data }) => {
	// 	for (let poke of data.results) {
	// 		console.log(poke.name);
	// 		select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
	// 		n++;
	// 	}
	// 	return getNextPokemons(data.next);
	// })
	// .then(({ data }) => {
	// 	for (let poke of data.results) {
	// 		console.log(poke.name);
	// 		n++;
	// 		select.options[select.options.length] = new Option(`${n}. ${poke.name}`, poke);
	// 		if (n > 151) {
	// 			return;
	// 		}
	// 	}
	// 	return getNextPokemons(data.next);
	// });
}

getPokemon();

// ^^^ fills select with first 151 pokemon from api
// ^^^ skips 141 for uknown reasons ???

// >>> now need to target selection and display its info

// select.addEventListener('onChange', () => {
// 	let selection = select.selectedOptions;
// 	console.log(selection);
// });

select.onchange = function() {
	console.log('selection made');
	let selection = select.querySelector('option').innerText;
	document.getElementById('display').innerText = selection;
};
