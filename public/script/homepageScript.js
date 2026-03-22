//This is for the README.md
// using eventdelegation for the first time 
// I will use one event listener that will 
// check for the which button is clicked
// according to my research this won't slow down
// no matter how many books I have 
const bookDiv = document.getElementById("book-div");

bookDiv.addEventListener("clcik", (onlyButton) => {
    if(onlyButton.target.tagName === "BUTTON"){
        const bookId = onlyButton.target.dataset.id;
        // fetch note based on the bookId
    };
});
