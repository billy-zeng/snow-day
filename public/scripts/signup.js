const signupForm = document.getElementById("signupForm");
let proficiency = "";

// Signup Submit Event Listener
$(signupForm).on("submit", handleSignUp);

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

// Handle Signup (Create new user)
function handleSignUp(event) {
  event.preventDefault();
  const userData = { proficiency }; 

  // Check if a skill level has been selected
  if($('#skillDefault').text() === "Select Skill Level"){
    $('#skill').addClass("error");
  } 
  // if all input forms are valid, post request to create new user account
  if ($(".ui.form").form("is valid") && ($('#skillDefault').text() !== "Select Skill Level")) {
    const formInputs = [...signupForm.elements];
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
        if(dataObj.status === 200) {
          window.location = '/login';
        } else {
          // return error message if submitted username or email already belongs to an existing account
          $('#errorZone').empty();
          $('#errorZone').css('display', 'block');
          $('#errorZone').prepend(`<ul class="list"><li>${dataObj.message}</li></ul>`);
        }
      })
      .catch((err) => console.log(err));
  }
};

/* Semantic UI */
$(".ui.dropdown").dropdown();

$(".skill").on("click", event => {
  proficiency = event.target.innerText;
  $('#skill').removeClass("error");
});
