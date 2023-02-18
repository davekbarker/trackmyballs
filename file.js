const courseSelect = document.querySelector("#course-select");
const clubSelect = document.querySelector("#club-select");
const beginButton = document.querySelector("#begin-button");
const holesSelect = document.querySelector("#holes-select");
const clubSelectLabel = document.querySelector("#club-select-label");
const clubDirectionRange = document.querySelector("#club-direction-range");
const selectDirectionButton = document.querySelector("#select-direction-button");

let clubsData = null;

function updateClubsData() {
  const clubSelect = document.querySelector("#club-select");
  const clubDirectionRange = document.querySelector("#club-direction-range");

  selectDirectionButton.addEventListener("click", function() {
    console.log("Updating clubs data");

    if (clubSelect.value === "") {
      alert("Please select a club before continuing.");
      return;
    }

    const club = clubSelect.value;
    const direction = clubDirectionRange.value;
    const message = `Club selected: ${club}, Direction: ${direction}`;
    console.log(message);

    // ...

    // Write the updated clubs data back to the clubs.json file
    const clubsJson = JSON.stringify(clubsData, null, 2);
    const clubsBlob = new Blob([clubsJson], { type: "application/json" });

    // ...

  });
}

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


function updateClubDirections(clubDirections) {
  fetch('clubs.json')
    .then(response => response.json())
    .then(clubs => {
      clubs.clubs.forEach((club, index) => {
        club.direction = clubDirections[index];
      });
      const updatedClubs = JSON.stringify(clubs, null, 2);
      return fetch('clubs.json', { method: 'PUT', body: updatedClubs });
    })
    .then(() => {
      console.log('Clubs file updated successfully.');
    })
    .catch(error => console.error(error));
}




//AND HERE
//function updateClubDirections(clubDirections) {
//  fetch('clubs.json')
//    .then(response => response.json())
//    .then(clubs => {
//      for (let i = 0; i < clubDirections.length; i++) {
//        clubs.clubs[i].direction = clubDirections[i];
//      }
//      const updatedClubs = JSON.stringify(clubs, null, 2);
//      return updatedClubs;
//    })
//    .then(updatedClubs => {
//      return fetch('clubs.json', {
//        method: 'PUT',
//        body: updatedClubs,
//        headers: {
//          'Content-type': 'application/json'
//        }
//      });
//    })
//    .catch(error => console.error(error));
//}



// HERE TOO
//function updateClubDirections(clubDirections) {
//  const xhr = new XMLHttpRequest();
//  xhr.onreadystatechange = function() {
//    if (xhr.readyState === 4 && xhr.status === 200) {
//      const clubs = JSON.parse(xhr.responseText);
//      for (let i = 0; i < clubDirections.length; i++) {
//        clubs.clubs[i].direction = clubDirections[i];
//      }
//      const updatedClubs = JSON.stringify(clubs);
//      const xhr2 = new XMLHttpRequest();
//      xhr2.open("PUT", "clubs.json");
//      xhr2.send(updatedClubs);
//    }
//  };
//  xhr.open("GET", "clubs.json");
//  xhr.send();
//}


//ONE OR THE OTHER
//function updateClubDirections(clubDirections) {
//  fetch('clubs.json')
//    .then(response => response.json())
//    .then(clubs => {
//      clubs.clubs.forEach((club, index) => {
//        club.direction = clubDirections[index];
//      });
//      return clubs;
//    })
//    .then(clubs => {
//      const data = JSON.stringify(clubs, null, 2);
//      const blob = new Blob([data], {type: 'application/json'});
//      const link = document.createElement('a');
//      link.href = URL.createObjectURL(blob);
//      link.download = 'clubs.json';
//      link.click();
//    })
//    .catch(error => console.error(error));
//}



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

  // Call the updateClubsData() function to update the clubs data
  updateClubsData();

}

selectDirectionButton.addEventListener("click", function() {

  console.log("Updating clubs data 1");


  if (clubSelect.value === "") {
    alert("Please select a club before continuing.");
    return;
  }

  const club = clubSelect.value;
  const direction = clubDirectionRange.value;
  const message = `Club selected: ${club}, Direction: ${direction}`;
  console.log(message);
//

    console.log()
 // Find the selected club in the clubs data
  const selectedClub = clubsData.clubs.find(clubData => clubData.size === club);
    console.log()

  // Calculate the new average direction for the club
  const totalDirection = selectedClub.direction * selectedClub.hits + parseInt(direction);
  const totalHits = selectedClub.hits + 1;
  const newDirection = totalDirection / totalHits;

  // Update the direction and hits values for the selected club in the clubs data
  selectedClub.direction = newDirection;
  selectedClub.hits = totalHits;

  // Write the updated clubs data back to the clubs.json file
  const clubsJson = JSON.stringify(clubsData, null, 2);
      console.log()
  const clubsBlob = new Blob([clubsJson], { type: "application/json" });

  console.log(clubsData);



//console.log(data);

  fetch("clubs.json", {
    method: "POST",
    body: clubsBlob,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to update clubs data");
    }
    console.log("Clubs data updated successfully");
    console.log("TEST")
  })
  .catch(error => {
    console.error(error);
    alert("Failed to update clubs data");

// get the direction inputs and store them in an array
const clubDirections = [];
for (let i = 1; i <= 4; i++) {
  const direction = document.getElementById(`club-${i}-direction`).value;
  clubDirections.push(direction);
}

// call the updateClubDirections function to update the clubs.json file
updateClubDirections(clubDirections);




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

//    console.log(error);


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
