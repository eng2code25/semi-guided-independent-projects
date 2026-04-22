const searchBtn = document.querySelector(".button-search");
const searchInput = document.querySelector(".input-search");

const resultSection = document.getElementById("search-result");
const progressSection = document.getElementById("search-progress");
const errorSection = document.getElementById("error-result");

//define the states
function showState(state) {
  resultSection.style.display = "none";
  progressSection.style.display = "none";
  errorSection.style.display = "none";

  if (state == "success") resultSection.style.display = "block";
  if (state == "progress") progressSection.style.display = "block";
  if (state == "error") errorSection.style.display = "block";
}

//server conversation
async function getMovie(title) {
  //when the search button is clicked, show the progress first
  showState("progress");
  console.log("1. Search started for:", title);

  const apikey = "f9792146";
  const url = `https://omdbapi.com?apikey=f9792146&s=${title}`;

  //server condition
  try {
    //with the apikey, tell the server to look for the title
    const response = await fetch(url);
    console.log("2. Server Responded!");

    //return the data from server in js object
    const data = await response.json();
    console.log("3. Data converted", data);

    if (data.Response == "True") {
      showState("success");
      displayfilm(data.Search);
      console.log("4. Success! Movie found:", data.Search);
    } else {
      showState("error");
      console.log("5. Error! Server said movie not found:", data.Error);
    }
  } catch (err) {
    showState("error");
    console.log("6. Connection error!", err);
  }
}

//search button logic
searchBtn.addEventListener("click", function () {
  const title = searchInput.value.trim();

  if (title !== "") {
    getMovie(title);
  }
});

//append function for server data as js object
function displayfilm(films) {
  //wash the DOM each time before appending to ensure no repeats
  resultSection.innerHTML = "<h4>Results</h4>";

  //loop for each entry received from server
  films.forEach(function (film) {
    //define the components
    const div = document.createElement("div");

    const img = document.createElement("img");
    if (film.Poster !== "N/A") {
      img.src = film.Poster;
    } else {
      img.src = "https://placeholder.com";
    }

    img.alt = film.Title;

    const p = document.createElement("p");
    p.textContent = `${film.Title}, ${film.Year}`;

    div.append(img);
    div.append(p);
    resultSection.append(div);
  });
}
