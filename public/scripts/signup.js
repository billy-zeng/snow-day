console.log('Signup JS connected...');

const signupForm = document.getElementById('signupForm');

// Submit Event Listener
signupForm.addEventListener('submit', handleSignupSubmit);

// Handle Signup Submit
function handleSignupSubmit(event) {
  let formIsValid = true;   // track form validation
  const userData = {};    // user data object
  event.preventDefault();   // prevent default page refresh

  // Clear alert messages
  document.querySelectorAll('.alert').forEach((alert) => alert.remove());

  // check each input field
  const formInputs = [...signupForm.elements];    // array of input form elements
  formInputs.forEach((input) => {
    input.classList.remove('input-error');    // clear red bordering

    let emptyField = false;   // if input doesn't pass first check don't display other error messages

    // create error message template div
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('class', 'alert error-message');

    // check if input field is empty; checks username, email, password
    if (input.type === 'text' && input.value === '') {
      formIsValid = false;
      emptyField = true;
      // add red border to input
      input.classList.add('input-error');
      console.log(`Please enter your ${input.name}. `);
      if (input.name === 'email') {
        errorMessage.insertAdjacentHTML('beforeend', `<p>Please enter an email address. </p>`);
      } else{
      errorMessage.insertAdjacentHTML('beforeend', `<p>Please enter a ${input.name}. </p>`); // username or password
      };
    };

    // check if username is at least 3 characters long
    if (input.name === 'username' && input.value.length < 3 && !emptyField) {
      formIsValid = false;
      // add red border to input
      input.classList.add('input-error');
      console.log(`Your user must be at least 2 characters long. `);
      errorMessage.insertAdjacentHTML('beforeend', `<p>Your username must be at least 3 characters long. </p>`);
    };

    // check if password is at least 5 characters long
    if (input.name === 'password' && input.value.length < 5 && !emptyField) {
      formIsValid = false;
      // add red border to input
      input.classList.add('input-error');
      console.log(`Your user must be at least 2 characters long. `);
      errorMessage.insertAdjacentHTML('beforeend', `<p>Your password must be at least 5 characters long. </p>`);
    };

    // check if username or password contains special characters
    if ((input.name === 'username' || input.name === 'password') && !isTextFormatCorrect(input.value) && !emptyField) {
      formIsValid = false;
      // add red border to input
      input.classList.add('input-error');
      console.log(`Your ${input.name} cannot contain special characters. `);
      errorMessage.insertAdjacentHTML('beforeend', `<p>Your ${input.name} cannot contain any special characters. </p>`);
    };

    // check if email contains exactly one @ and at least one .
    if(input.name === 'email' && !isEmailFormatCorrect(input.value) && !emptyField) {
      formIsValid = false;
      // add red border to input
      input.classList.add('input-error');
      console.log('Please enter a valid email address');
      errorMessage.insertAdjacentHTML('beforeend', '<p>Please enter a valid email address. </p>');
    };

    // append error message below input field
    if(input.type === 'text'){
      input.insertAdjacentElement('afterend', errorMessage);
    };

    if (formIsValid && input.type !== 'submit') {
      // populate userData object with valid input values
      userData[input.name] = input.value;
    };
  });

  // if(formIsValid) console.log(userData);    // testing echo
  if (formIsValid) {
    // Submit data to server
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
        window.location = '/login';
      })
      .catch((err) => console.log(err));
  };
};

function isTextFormatCorrect(input) {
  const validCharacters = /^[A-Za-z0-9]+$/;    // regular expression to match against; (all alphanumeric characters)
  return validCharacters.test(input);       // match the input against the regular expression
};

// can switch to regex later maybe
function isEmailFormatCorrect(email){
  const emailArray = email.split("");
  let atCount = 0;
  let periodCount = 0;
  emailArray.forEach((character) => {
    if(character === "@") atCount++;
    if(character === ".") periodCount++;
  })
  return (atCount === 1 && periodCount > 0);
};

/* Semantic UI */
$(".ui.dropdown").dropdown();
