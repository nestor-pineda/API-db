const playersContainer = document.querySelector('.players');

const createPlayerElement = (container) => {
  return (player) => {
    // console.log(player);
    const playerElement = document.createElement('div');
    playerElement.classList.add('playerItem');

    const { name, team, id } = player;

    const nameElement = document.createElement('h2');
    nameElement.textContent = name;

    const teamElement = document.createElement('p');
    teamElement.textContent = `Team: ${team}`;

    const detailsLink = document.createElement('a');
    detailsLink.textContent = 'View Details';
    detailsLink.href = `player.html?id=${id}`;

    playerElement.append(nameElement, teamElement, detailsLink);
    console.log(playerElement);

    container.append(playerElement);

    console.log(container);
  };
}

const fetchPlayers = async (name) => {
  const url = new URL('http://localhost:3000/players');
  const queryParams = { 'name': name || '' };
  // const queryParams = { '_q': name || '' };

  Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, value));

  console.log(url);

  const response = await fetch(url);
  console.log(response);
  const players = await response.json();
  
  console.log(players);

  playersContainer.innerHTML = '';
  players.forEach(createPlayerElement(playersContainer));
};


// Search players
const searchPlayer = document.querySelector('.searchPlayer');

searchPlayer.addEventListener('submit', (event) => {
  event.preventDefault();
  const player = searchPlayer.name.value;// ".player" is the name atribute in the html form
  fetchPlayers(player);
});

window.addEventListener('DOMContentLoaded', () => fetchPlayers());
