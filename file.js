
// Get references to the elements
const courseSelect = document.querySelector("#course-select");
const clubSelect = document.querySelector("#club-select");
const beginButton = document.querySelector("#begin-button");
const holesSelect = document.querySelector("#holes-select");
//const clubSelect = document.querySelector("#club-select");
const clubSelectLabel = document.querySelector("#club-select-label");
const clubDirectionRange = document.querySelector("#club-direction-range");
const clubDirection = document.querySelector("#club-direction");

// Load courses.json file
fetch("courses.json")
  .then(response => response.json())
  .then(courses => {
    // Loop through the courses file
    courses.courses.forEach(course => {
      // Create a new option element
      const option = document.createElement("option");

      // Set the value and text of the option
      option.value = course.name;
      option.text = course.name;

      // Add the option to the select element
      courseSelect.add(option);
    });
  });

// Remove the submit button
document.querySelector("input[type=submit]").remove();

// Add event listener to the course select
courseSelect.addEventListener("change", function() {
  // Replace the course select with the selected value
  // courseSelect.replaceWith(this.value);

  // Replace the holes select with the selected value
  //  holesSelect.replaceWith(holesSelect.value);
});

beginButton.addEventListener("click", (event) => {
  event.preventDefault();
  const selectedHoles = holesSelect.value;
  console.log(`Number of holes selected: ${selectedHoles}`);
  courseSelect.replaceWith(courseSelect.value);
  holesSelect.replaceWith(holesSelect.value);
  beginButton.remove();
  clubSelect.style.display = "block";
  clubSelectLabel.style.display = "block";
  clubSelectLabel.classList.remove("hidden");
  clubDirectionRange.style.display = "block";
  clubDirection.style.display = "block";
});

  // Load courses.json file
fetch("clubs.json")
  .then(response => response.json())
  .then(clubs => {
    // Loop through the courses file
    clubs.clubs.forEach(club => {
      // Create a new option element
      const option = document.createElement("option");

      // Set the value and text of the option
      option.value = club.size;
      option.text = club.size;

      // Add the option to the select element
      clubSelect.add(option);
    });
  });

