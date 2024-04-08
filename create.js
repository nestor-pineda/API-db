const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form); // FormData: is a built-in browser API that allows you to easily construct a set of key/value pairs representing form fields and their values.
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