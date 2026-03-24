function overlay(){
    const info = document.querySelector(".info");
    const helpOverlay = document.querySelector(".help-overlay");

    // Prevent errors on pages that don't have these elements for future page
    if (!info || !helpOverlay) return;


    info.addEventListener("mouseenter", () => {
        helpOverlay.classList.add("visible");
    });

   

    helpOverlay.addEventListener("click", () => {
        helpOverlay.classList.remove("visible");
    });
}


export {overlay}