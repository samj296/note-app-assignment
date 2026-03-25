function overlay(){
    const info = document.querySelector(".info");
    const helpOverlay = document.querySelector(".help-overlay");

    const istouch = 'ontouchstart' in window;

    // Prevent errors on pages that don't have these elements for future page
    if (!info || !helpOverlay) return;

    // Desktop hover
    if(!istouch){
        info.addEventListener("mouseenter", () => {
            helpOverlay.classList.add("visible");
        });
    };
    
    // Mobile + desktop click
   info.addEventListener("click", () => {
        console.log("INFO CLICKED");
        helpOverlay.classList.add("visible");
    });

    // Close overlay on click
    helpOverlay.addEventListener("click", () => {
        helpOverlay.classList.remove("visible");
    });
}


export {overlay}