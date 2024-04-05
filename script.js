const fetchPlayers = async () => {
  const url = new URL('http://localhost:3000/players');
  
  // Set query parameters
  const params = {
    '_limit': '20',
    '_sort': 'name',
  };
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  const response = await fetch(url);
  return await response.json();
};

window.addEventListener('DOMContentLoaded', async () => {
  const playersContainer = document.querySelector('.players');
  const players = await fetchPlayers();
  console.log(players);

  players.forEach(createPlayerElement(playersContainer));

  function createPlayerElement(container) {
    return (player) => {
      const playerElement = document.createElement('div');
      playerElement.classList.add('player');

      const nameElement = document.createElement('h2');
      nameElement.textContent = player.name;

      const teamElement = document.createElement('p');
      teamElement.textContent = `Team: ${player.team}`;

      const detailsLink = document.createElement('a');
      detailsLink.textContent = 'View Details';
      detailsLink.href = `player.html?id=${player.id}`;

      playerElement.append(nameElement, teamElement, detailsLink);
      container.appendChild(playerElement);
    };
  }
});
