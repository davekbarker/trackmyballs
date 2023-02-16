<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css">

    <title>Golf Tracker</title>

  </head>
  <body>
    <div class="container">
      <h1>Golf Tracker</h1>
      <form>
        <label for="course-select">Select a Course:</label>
        <select id="course-select">
          <option value="">Select a Course</option>
          <!-- Add options for courses here -->
        </select>
        <br><br>
        <label for="holes-select">Number of Holes:</label>
        <select id="holes-select">
          <option value="9">9</option>
          <option value="18">18</option>
        </select>
        <br><br>
        <input type="submit" value="Submit">
      </form>
    </div>
  </body>
</html>
