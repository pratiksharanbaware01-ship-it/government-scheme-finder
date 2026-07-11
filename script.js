document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector("button");
    const searchBox = document.querySelector("input");

    button.addEventListener("click", function () {

        let scheme = searchBox.value.trim();

        if (scheme === "") {
            alert("Please enter a scheme name.");
        } else {
         
        }

    });

});