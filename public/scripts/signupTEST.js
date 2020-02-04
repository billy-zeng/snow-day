console.warn("signupTest.js");
const form = document.getElementById("signupForm");

form.addEventListener("submit", handleSignUp);

function handleSignUp(event) {
  event.preventDefault();
}

//shorthand
$(".ui.form").form({
  fields: {
    username: ["minLength[5]", "empty"],
    email: ["minLength[5]", "empty"],
    password: ["minLength[5]", "empty"],
    passwordConfirm: "match[password]",
    proficiency: "empty"
  }
});

//verbose
// $(".ui.form").form({
//   fields: {
//     username: {
//       identifier: "name",
//       rules: [
//         {
//           type: "empty",
//           prompt: "Please enter a username."
//         },
//         {
//           type: "minlength[5]",
//           prompt: "Your username must be at least {ruleValue} characters long."
//         }
//       ]
//     },
//     email: {
//       identifier: "email",
//       rules: [
//         {
//           type: "empty",
//           prompt: "Please enter an e-mail address."
//         }
//       ]
//     },
//     password: {
//       identifier: "password",
//       rules: [
//         {
//           type: "empty",
//           prompt: "Please enter a password with a minimum of 5 characters."
//         },
//         {
//           type: "minLength[5]",
//           prompt: "Your password must be at least {ruleValue} characters long."
//         }
//       ]
//     },
//     passwordConfirm: {
//       identifier: "passwordConfirm",
//       rules: [
//         {
//           type: "empty",
//           prompt: "Please enter your password a second time."
//         },
//         {
//           type: "match[password]",
//           prompt: "The passwords submitted do not match."
//         }
//       ]
//     }
//   }
// });
