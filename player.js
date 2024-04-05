// create a window location search URL search params to be used in the player.html file
// player.js
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const playerId = urlParams.get('id');

const fetchPlayer = async () => {
  const url = `http://localhost:3000/players/${playerId}`;
  const response = await fetch(url);
  return await response.json();
};

window.addEventListener('DOMContentLoaded', async () => {
  const playerElement = document.querySelector('.player');
  const player = await fetchPlayer();
  console.log(player);

  const nameElement = document.createElement('h2');
  nameElement.textContent = player.name;

  const ageElement = document.createElement('p');
  ageElement.textContent = `Age: ${player.age}`;

  const positionElement = document.createElement('p');
  positionElement.textContent = `Position: ${player.position}`;

  const nationalityElement = document.createElement('p');
  nationalityElement.textContent = `Nationality: ${player.nationality}`;

  const teamElement = document.createElement('p');
  teamElement.textContent = `Team: ${player.team}`;

  const championsLeagueWinsElement = document.createElement('p');
  championsLeagueWinsElement.textContent = `Champions League Wins: ${player.championsLeagueWins}`;

  playerElement.append(
    nameElement,
    ageElement,
    positionElement,
    nationalityElement,
    teamElement,
    championsLeagueWinsElement,
  );
});


// create the logic to delete a player using the .deleteBtn button in the player.html file

const deleteBtn = document.querySelector('.deleteBtn');
deleteBtn.addEventListener('click', async () => {
  const url = `http://localhost:3000/players/${playerId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  window.location.href = 'index.html';
  // window.location.replace('/index.html');
});