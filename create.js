// create a querySelector to get the form in the create.html file
// create.js
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const url = 'http://localhost:3000/players';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const player = await response.json();
  console.log(player);
  window.location.href = 'index.html';
});