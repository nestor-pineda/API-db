const playersContainer = document.querySelector('.players');
const spiner = document.querySelector('.spiner');
const searchButton = document.querySelector('.searchButton');

const createPlayerElement = (container) => {
  return (player) => {

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
    container.append(playerElement);
  };
}

let loading = false;

function updateSpiner() {
  spiner.style.display = loading ? 'block' : 'none';
}
const fetchPlayers = async (playerName) => {
  try {
    loading = true;
    updateSpiner();

    const url = new URL('http://localhost:3000/players');
    const queryParams = { 
      _limit: 5,
      'name': playerName || '',
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (key && value) url.searchParams.append(key, value);
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch players: ${response.status} ${response.statusText}`);
    }

    const allPlayers = await response.json();

    const filteredPlayers = allPlayers.filter(player => 
      player.name && playerName && 
      player.name.toLowerCase().includes(playerName.toLowerCase())
    );

    playersContainer.innerHTML = '';

    (filteredPlayers.length > 0 ? filteredPlayers : allPlayers).forEach(createPlayerElement(playersContainer));

  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
    updateSpiner();
  }
};

searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const playerName = document.querySelector('input[name="name"]').value;
  await fetchPlayers(playerName);
});

window.addEventListener('DOMContentLoaded', () => fetchPlayers());
window.addEventListener('change', updateSpiner);