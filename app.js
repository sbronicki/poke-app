const select = document.getElementById('pokedex');

// fill select with pokeapi data
const pokemon = axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(({ data }) => {
	for (let poke of data.results) {
		select.options[select.options.length] = new Option(titleCase(poke.name));
	}
});
// display selection & display with sprite from api

select.onchange = () => {
	let selection = event.target.value.toLowerCase();

	axios.get(`https://pokeapi.co/api/v2/pokemon/${selection}/`).then(({ data }) => {
		// display id & name
		document.getElementById('display-name').innerText = `${data.id}. ${titleCase(selection)}`;
		// display type
		let typing = data.types[0].type.name;
		document.getElementById('display-type').innerText = `Type: ${titleCase(typing)}`;
		// change bg color to match type
		let middleCol = document.getElementById('middle-col');
		switch (typing) {
			case 'grass':
				middleCol.style.backgroundColor = '#78C850';
				break;
			case 'water':
				middleCol.style.backgroundColor = '#6890F0';
				break;
			case 'fire':
				middleCol.style.backgroundColor = '#F08030';
				break;
			case 'electric':
				middleCol.style.backgroundColor = '#F8D030';
				break;
			case 'ground':
				middleCol.style.backgroundColor = '#E0C068';
				break;
			case 'rock':
				middleCol.style.backgroundColor = '#B8A038';
				break;
			case 'poison':
				middleCol.style.backgroundColor = '#A040A0';
				break;
			case 'psychic':
				middleCol.style.backgroundColor = '#F85888';
				break;
			case 'bug':
				middleCol.style.backgroundColor = '#A8B820';
				break;
			case 'normal':
				middleCol.style.backgroundColor = '#A8A878';
				break;
			case 'flying':
				middleCol.style.backgroundColor = 'A890F0';
				break;
			case 'fighting':
				middleCol.style.backgroundColor = '#C03028';
				break;
			case 'ice':
				middleCol.style.backgroundColor = '#98D8D8';
				break;
			case 'ghost':
				middleCol.style.backgroundColor = '#705898';
				break;
			case 'dragon':
				middleCol.style.backgroundColor = '#7038F8';
				break;
		}
		//display sprite
		const sprite = document.getElementById('display-img');
		sprite.setAttribute('src', `${data.sprites.front_default}`);
		// get species url for pokedex entry
		const pokedexEntryURL = data.species.url;
		axios.get(pokedexEntryURL).then(({ data }) => {
			let displayP = document.getElementById('display-p');
			apiDescription = data.flavor_text_entries[0].flavor_text;
			console.log(apiDescription);
			displayP.innerText = grammerFix(apiDescription);
		});
	});
};

// title casing
function titleCase(str) {
	return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
}
// api sentence grammer fix
// api descriptions are filled with random line breaks both between and in the middle of words. i have no idea how to determine if a break is between two words or in the middle of one, but it seems there are more instances in which the break is between words so i will fix that, however this will result in some words having a random space in it... at least the sentence structure will be nicer looking (alternative to this would be that two words would be conjoined and this would be much more frequent)

function grammerFix(str) {
	let split = str.split(' ');
	let resultArr = [];
	let index = 0;
	split.forEach((element) => {
		if (element.includes('\n')) {
			newEl = element.replace('\n', ' ');
			resultArr.splice(index, 0, newEl);
		} else if (element.includes('\u000c')) {
			newEl = element.replace('\n', ' ');
			resultArr.splice(index, 0, newEl);
		} else {
			resultArr.splice(index, 0, element);
		}
		if (element.includes('POKéMON')) {
			newEl = newEl = element.replace('POKéMON', 'pokémon');
			resultArr.splice(index, 0, newEl);
		}
		index++;
	});
	return resultArr.join(' ');
}
