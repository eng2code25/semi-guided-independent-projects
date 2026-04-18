const step = document.querySelectorAll(".step-hide, .step");
const nextButton = document.querySelectorAll(".next-button");
const backButton = document.querySelectorAll(".back-button");
const submitButton = document.querySelector(".submit-button");

let currentStep = 0;

nextButton.forEach(function (button) {
  button.addEventListener("click", function () {
    //gatekeeper if form is not properly filled in, prevent state change

    const currentInputs = step[currentStep].querySelectorAll("input");

    let allFilled = true;

    //loop to check if it's truly filled or not
    currentInputs.forEach(function (input) {
      if (input.value.trim() === "") {
        allFilled = false;
        input.style.border = "2px solid red";
      } else {
        input.style.border = "";
      }
    });

    if (allFilled) {
      step[currentStep].classList.add("step-hide");

      currentStep++;

      step[currentStep].classList.remove("step-hide");

      if (currentStep === step.length - 1) {
        summaryGen();
      }
    } else {
      alert("Please fill out all information before clicking next!");
    }
  });
});

backButton.forEach(function (button) {
  button.addEventListener("click", function () {
    step[currentStep].classList.add("step-hide");

    currentStep--;

    step[currentStep].classList.remove("step-hide");
  });
});

submitButton.addEventListener("click", function () {
  //grab input
  const userInput = document.querySelectorAll("input");

  //define the set as {}
  let userData = {};

  //arrange them as objects Name: John
  userInput.forEach(function (input) {
    let key = input.placeholder || "input_" + Math.random();
    userData[key] = input.value;
  });

  //rewrite local storage
  localStorage.setItem("registrationData", JSON.stringify(userData));

  //alert message
  alert("Your data has been sent to the local storage!");

  //go back to the starting page
  //hide last page
  step[currentStep].classList.add("step-hide");

  //reset counter
  currentStep = 0;

  //show first page
  step[currentStep].classList.remove("step-hide");

  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => (input.value = ""));
});

//summary generator function
function summaryGen() {
  const div = document.getElementById("summary-display");
  const userInput = document.querySelectorAll("input");

  div.innerHTML = "";

  userInput.forEach(function (input) {
    const p = document.createElement("p");
    p.textContent = `${input.placeholder}: ${input.value}`;

    div.appendChild(p);
  });
}
