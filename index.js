const select = document.getElementById('pokedex');

// fill select with pokeapi data
const pokemon = axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
	.then(({ data }) => {
		for (let poke of data.results) {
			select.options[select.options.length] = new Option(poke.name);
		}
	});

// display selection & display with sprite from api

select.onchange = () => {
	let selection = event.target.value;

	axios.get(`https://pokeapi.co/api/v2/pokemon/${selection}/`)
		.then(({ data }) => {
			// display id & name
			document.getElementById('display-text').innerText = `${data.id}. ${selection}`;
			// display type
			let typing = data.types[0].type.name
			document.getElementById('display-h2').innerText = `Type: ${typing}`;
			// change bg color to match type
			let colTwoBg = document.getElementById('col-2')
			switch (typing) {
				case "grass":
					colTwoBg.style.backgroundColor = "#78C850";
					break;
				case "water":
					colTwoBg.style.backgroundColor = "#6890F0";
					break;
				case "fire":
					colTwoBg.style.backgroundColor = "#F08030";
					break;
				case "electric":
					colTwoBg.style.backgroundColor = "#F8D030";
					break;
				case "ground":
					colTwoBg.style.backgroundColor = "#E0C068";
					break;
				case "rock":
					colTwoBg.style.backgroundColor = "#B8A038";
					break;
				case "poison":
					colTwoBg.style.backgroundColor = "#A040A0";
					break;
				case "psychic":
					colTwoBg.style.backgroundColor = "#F85888";
					break;
				case "bug":
					colTwoBg.style.backgroundColor = "#A8B820";
					break;
				case "normal":
					colTwoBg.style.backgroundColor = "#A8A878";
					break;
				case "flying":
					colTwoBg.style.backgroundColor = "A890F0";
					break;
				case "fighting":
					colTwoBg.style.backgroundColor = "#C03028";
					break;
				case "ice":
					colTwoBg.style.backgroundColor = "#98D8D8";
					break;
				case "ghost":
					colTwoBg.style.backgroundColor = "#705898";
					break;
				case "dragon":
					colTwoBg.style.backgroundColor = "#7038F8";
					break;



			}
			//display sprite
			const sprite = document.getElementById('display-img');
			sprite.setAttribute('src', `${data.sprites.front_default}`);
			// return species url to .get pokedex entry 
			const pokedexEntryURL = data.species.url;
			// console.log(pokedexEntryURL)
			// need to await to .get pokedex entry url and display it
		});
};

// axios.get(pokedexEntryURL)
// 				.then(({ data }) => {
// 					const pokedexEntry = data.flavor_text_entries[0].flavor_text;
// 					let displayP = document.getElementById('display-p');
// 					console.log(displayP.innerText)
// 				})

console.log('this app uses axios to make a request to pokeapi.co to fill the select with the original 151 pokémon, then after a selection is made by a user, another request is made to the api for that selected pokemon in order to display the typing and id-number, background color is also changed according to the selected pokemons typing. coming soon real pokedex entries will be displayed under the typing')