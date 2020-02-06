const loginForm = document.getElementById('loginForm');

// Submit Event Listener
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

// Handle Login Submit
function handleLoginSubmit(event) {
  event.preventDefault();   // prevent default page refresh
  const userData = {};    // user data object

  if ($(".ui.form").form("is valid")) {
    const formInputs = [...loginForm.elements];    // array of input form elements
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
        $('#errorZone').empty();
        $('#errorZone').css('display', 'block');
        $('#errorZone').prepend('<ul class="list"><li>Username or password incorrect. Please try again.</li></ul>');
      });
  };
};
