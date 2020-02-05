console.warn("signupTest.js");
const form = document.getElementById("signupForm");

form.addEventListener("submit", handleSignUp);

function handleSignUp(event) {
  event.preventDefault();

  // Clear alert messages
  document.querySelectorAll('.alert').forEach((alert) => alert.remove());

  const userData = {}; 
  if ($(".ui.form").form("is valid")) {
    console.log("success");

    const formInputs = [...signupForm.elements];    // array of input form elements
    formInputs.forEach((input) => {
      userData[input.name] = input.value;
    });

    fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((dataObj) => {
        console.log(dataObj);
        if(dataObj.status === 200) {
          window.location = '/login';
        } else {
          signupForm.insertAdjacentHTML('beforeend', `<p class="alert error-message">${dataObj.message}</p>`);
        }
      })
      .catch((err) => console.log(err));
  }
}

$(".ui.form").form({
  fields: {
    username: {
      identifier: "name",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a username."
        },
        {
          type: "minLength[5]",
          prompt: "Your username must be at least {ruleValue} characters long."
        }
      ]
    },
    email: {
      identifier: "email",
      rules: [
        {
          type: "empty",
          prompt: "Please enter an e-mail address."
        }
      ]
    },
    password: {
      identifier: "password",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a password."
        },
        {
          type: "minLength[5]",
          prompt: "Your password must be at least {ruleValue} characters long."
        }
      ]
    },
    passwordConfirm: {
      identifier: "passwordConfirm",
      rules: [
        {
          type: "empty",
          prompt: "Please confirm your password."
        },
        {
          type: "match[password]",
          prompt: "The passwords submitted do not match."
        }
      ]
    },
    proficiency: {
      identifier: "proficiency",
      rules: [
        {
          type: "empty",
          prompt: "Please select your skill level"
        }
      ]
    }
  }
});
