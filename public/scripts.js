const getToken = (event) => {
  event.preventDefault();
  const email = $('#email').val();
  const appName = $('#appName').val();

  if (email && appName) {
    fetch('api/v1/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, appName: appName }),
    })
      .then(response => response.json())
      .then(serverResponse => displayMessage(serverResponse, 'token'))
      .catch(error => displayMessage(error, 'error'));
  }
};

const displayMessage = (token, type) => {
  console.log(token);
  console.log(type);
};

$('#submit').on('click', getToken);
