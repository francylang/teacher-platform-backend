const verifyEmail = (email) => {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return email.match(emailPattern);
};

const getToken = (event) => {
  event.preventDefault();
  const email = $('#email').val();
  const appName = $('#appName').val();

  if (verifyEmail(email) !== null && appName) {
    fetch('api/v1/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, appName: appName }),
    })
      .then(response => response.json())
      .then(serverResponse => displayMessage(serverResponse.token, 'token'))
      .catch(error => displayMessage(error, 'error'));
  }
};

const displayMessage = (message, type) => {
  if (type === 'token') {
    $('#userToken').text(message);
  }
  if (type === 'error') {
    $('#error').text(message);
  }
};

$('#submit').on('click', getToken);
