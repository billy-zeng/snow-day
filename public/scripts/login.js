const loginForm = document.getElementById('loginForm');

// Login Submit Event Listener
loginForm.addEventListener("submit", handleLoginSubmit);

$(".ui.form").form({
  fields: {
    username: {
      identifier: "username",
      rules: [
        {
          type: "empty",
          prompt: "Please enter your username."
        },
      ]
    },
    password: {
      identifier: "password",
      rules: [
        {
          type: "empty",
          prompt: "Please enter your password."
        },
      ]
    }
  }
});

// Handle Login Submit (Create new session)
function handleLoginSubmit(event) {
  event.preventDefault();
  const userData = {};
  // if all input forms are valid, post request to create new user session
  if ($(".ui.form").form("is valid")) {
    const formInputs = [...loginForm.elements];
    formInputs.forEach((input) => {
      userData[input.name] = input.value;
    });

    fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(dataObj => {
        if (dataObj.foundUser._id) {
          window.location = "/maingallery";
        } 
      })
      .catch(err => {
        // return error message if username or password do not match any existing account
        $('#errorZone').empty();
        $('#errorZone').css('display', 'block');
        $('#errorZone').prepend('<ul class="list"><li>Username or password incorrect. Please try again.</li></ul>');
      });
  };
};
