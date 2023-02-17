const courseSelect = document.querySelector("#course-select");
const clubSelect = document.querySelector("#club-select");
const beginButton = document.querySelector("#begin-button");
const holesSelect = document.querySelector("#holes-select");
const clubSelectLabel = document.querySelector("#club-select-label");
const clubDirectionRange = document.querySelector("#club-direction-range");
const selectDirectionButton = document.querySelector("#select-direction-button");

let clubsData = null;

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

});

function onSubmit(event) {
  event.preventDefault();
  let selectedHoles = holesSelect.value;
  if (courseSelect.value === "Range") {
    selectedHoles = "Unlimited";
  }
  //console.log(`Number of holes selected: ${selectedHoles}`);

  // Check if a club has been selected
  if (courseSelect.value === "") {
    alert("Please select a course before continuing.");
    return;
  }

  courseSelect.replaceWith(courseSelect.value);
  holesSelect.replaceWith(selectedHoles);
  beginButton.remove();
  clubSelect.style.display = "block";
  clubSelectLabel.style.display = "block";
  clubSelectLabel.classList.remove("hidden");
  clubDirectionRange.style.display = "block";
  selectDirectionButton.style.display = "block";
}

selectDirectionButton.addEventListener("click", function() {
  if (clubSelect.value === "") {
    alert("Please select a club before continuing.");
    return;
  }

  const club = clubSelect.value;
  const direction = clubDirectionRange.value;
  const message = `Club selected: ${club}, Direction: ${direction}`;
  console.log(message);
//

 // Find the selected club in the clubs data
  const selectedClub = clubsData.clubs.find(clubData => clubData.size === club);

  // Calculate the new average direction for the club
  const totalDirection = selectedClub.direction * selectedClub.hits + parseInt(direction);
  const totalHits = selectedClub.hits + 1;
  const newDirection = totalDirection / totalHits;

  // Update the direction and hits values for the selected club in the clubs data
  selectedClub.direction = newDirection;
  selectedClub.hits = totalHits;

  // Write the updated clubs data back to the clubs.json file
  const clubsJson = JSON.stringify(clubsData, null, 2);
  const clubsBlob = new Blob([clubsJson], { type: "application/json" });

  fetch("clubs.json", {
    method: "POST",
    body: clubsBlob,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to update clubs data");
    }
    console.log("Clubs data updated successfully");
  })
  .catch(error => {
    console.error(error);
    alert("Failed to update clubs data");


//
});
});

// Add event listener to the submit button
document.querySelector("form").addEventListener("submit", onSubmit);

// Load clubs.json file
fetch("clubs.json")
  .then(response => response.json())
  .then(clubs => {
    // Save the clubs data for later use
    clubsData = clubs;

    // Loop through the clubs file to calculate the average direction
    let totalDirection = 0;
    let totalHits = 0;
    clubs.clubs.forEach(club => {
      totalDirection += club.direction * club.hits;
      totalHits += club.hits;

      // Create a new option element for each club
      const option = document.createElement("option");

      // Set the value and text of the option
      option.value = club.size;
      option.text = club.size;

      // Add the option to the select element
      clubSelect.add(option);


    });
    const avgDirection = totalDirection / totalHits;

    // Set the min, max, and default value of the club direction range input
    clubDirectionRange.min = 0;
    clubDirectionRange.max = 100;
    clubDirectionRange.value = avgDirection;

});
