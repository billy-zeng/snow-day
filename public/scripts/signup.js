console.log('Signup JS connected...');

const signupForm = document.getElementById('signupForm');

// Submit Event Listener
signupForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  let formIsValid = true;   // track form validation
  const userData = {};    // user data object
  event.preventDefault();   // prevent default page refresh

  // Clear alert messages
  document.querySelectorAll('.alert').forEach((alert) => alert.remove());

  // check each input field
  // console.log([...form.elements]);
  const formInputs = [...form.elements];    // array of input form elements
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
      console.log(`Please enter your ${input.dataset.name}. `);
      errorMessage.insertAdjacentHTML('beforeend', `<p>Please enter your ${input.dataset.name}. </p>`);
    };


  });

}