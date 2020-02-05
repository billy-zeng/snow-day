console.log("Login JS connected...");

const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");

// Submit Event Listener
loginForm.addEventListener("submit", handleLoginSubmit);

// Handle Login Submit
function handleLoginSubmit(event) {
  let formIsValid = true; // track form validation
  const userData = {}; // user data object
  event.preventDefault(); // prevent default page refresh

  // Clear alert messages
  document.querySelectorAll(".alert").forEach(alert => alert.remove());

  // check each input field
  const formInputs = [...loginForm.elements]; // array of input form elements
  formInputs.forEach(input => {
    input.classList.remove("input-error"); // clear red bordering

    let emptyField = false;

    // create error message template div
    const errorMessage = document.createElement("div");
    errorMessage.setAttribute("class", "alert error-message");

    // check if username or password fields are empty
    if (input.type === "text" && input.value === "") {
      formIsValid = false;
      emptyField = true;
      // add red border to input
      input.classList.add("input-error");
      console.log(`Please enter your ${input.name}. `);
      errorMessage.insertAdjacentHTML(
        "beforeend",
        `<p>Please enter your ${input.name}. </p>`
      ); // username or password
    }

    // // check if password is at least 5 characters long
    // if (input.name === 'password' && input.value.length < 5 && !emptyField) {
    //   formIsValid = false;
    //   // add red border to input
    //   input.classList.add('input-error');
    //   console.log(`Your password must be at least 5 characters long. `);
    //   errorMessage.insertAdjacentHTML('beforeend', `<p>Your password must be at least 5 characters long. </p>`);
    // };

    // // check if password contains special characters
    // if (input.name === 'text' && !isTextFormatCorrect(input.value) && !emptyField) {
    //   formIsValid = false;
    //   // add red border to input
    //   input.classList.add('input-error');
    //   console.log(`Your ${input.name} cannot contain special characters. `);
    //   errorMessage.insertAdjacentHTML('beforeend', `<p>Your ${input.name} cannot contain any special characters. </p>`);
    // };

    // // check if email contains exactly one @ and at least one .
    // if(input.name === 'email' && !isEmailFormatCorrect(input.value) && !emptyField) {
    //   formIsValid = false;
    //   // add red border to input
    //   input.classList.add('input-error');
    //   console.log('Please enter a valid email address');
    //   errorMessage.insertAdjacentHTML('beforeend', '<p>Please enter a valid email address. </p>');
    // };

    // append error message below input field
    if (input.type === "text") {
      input.insertAdjacentElement("afterend", errorMessage);
    }

    if (formIsValid && input.type !== "submit") {
      // populate userData object with valid input values
      userData[input.name] = input.value;
    }
  });

  if (formIsValid) console.log(userData);

  // TODO - Create this route and implement sessions
  if (formIsValid) {
    // Submit data to server
    fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(dataObj => {
        console.log(dataObj);
        if (dataObj.foundUser._id) {
          window.location = "/maingallery";
        } else console.log(dataObj);
      })
      .catch(err => {
        console.log(err);
        loginButton.insertAdjacentHTML(
          "beforebegin",
          '<p class="alert error-message">Username or password incorrect. Please try again.</p>'
        );
      });
  }
}

// function isTextFormatCorrect(input) {
//   const validCharacters = /^[A-Za-z0-9]+$/;    // regular expression to match against; (all alphanumeric characters)
//   return validCharacters.test(input);       // match the input against the regular expression
// };

// // can switch to regex later maybe
// function isEmailFormatCorrect(email){
//   const emailArray = email.split("");
//   let atCount = 0;
//   let periodCount = 0;
//   emailArray.forEach((character) => {
//     if(character === "@") atCount++;
//     if(character === ".") periodCount++;
//   })
//   return (atCount === 1 && periodCount > 0);
// };
