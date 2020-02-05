console.warn("signupTest.js");
const signupForm = document.getElementById("signupForm");
let proficiency = "";

signupForm.addEventListener("submit", handleSignUp);

$(".ui.form").form({
  fields: {
    username: {
      identifier: "username",
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

function handleSignUp(event) {
  event.preventDefault();
  const userData = { proficiency }; 

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
          $('#errorZone').empty();
          $('#errorZone').css('display', 'block');
          $('#errorZone').prepend(`<ul class="list"><li>${dataObj.message}</li></ul>`);
        }
      })
      .catch((err) => console.log(err));
  }
}

/* Semantic UI */
$(".ui.dropdown").dropdown();

$(".skill").on("click", event => {
  proficiency = event.target.innerText;
  console.log(proficiency);
})