const searchBar = document.getElementById("search-bar");

const noResults = document.getElementById("no-results");

//detect user input on search bar
searchBar.addEventListener("input", function (e) {
  let userInput = e.target.value.toLowerCase();

  //call the list from the DOM
  let items = document.querySelectorAll("#grocery-list li");

  //loop for each line of items and normalise them
  items.forEach(function (item) {
    let text = item.textContent.toLowerCase();

    //condition to match
    if (text.includes(userInput)) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });

  //let visible items be a list that appars on screen after typing something
  let visibleItems = document.querySelectorAll("#grocery-list li:not(.hide)");

  if (visibleItems.length === 0) {
    noResults.classList.remove("hide");
  } else {
    noResults.classList.add("hide");
  }
});
