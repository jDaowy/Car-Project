// Make a GET request to fetch all posts
fetch("http://localhost:3306/api/get")
  .then((response) => response.json())
  .then((data) => {
    // Handle the data received from the backend
    console.log(data); // Log the data to the console
    // Perform actions with the data (e.g., update state in a React component)
  })
  .catch((error) => {
    console.error("Error:", error);
  });
