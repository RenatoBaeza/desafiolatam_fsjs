document.addEventListener("keydown", function (event) {
    var div = document.getElementById("key");
    var qwediv = document.getElementById("qwe");

    if (event.key === "a") {
        div.style.backgroundColor = "pink";
    
    } else if (event.key === "s") {
        div.style.backgroundColor = "orange";
    
    } else if (event.key === "d") {
        div.style.backgroundColor = "lightblue";
    }
    else if (event.key === "q") {
        qwediv.style.backgroundColor = "purple";
    }
    else if (event.key === "w") {
        qwediv.style.backgroundColor = "gray";
    }
    else if (event.key === "e") {
        qwediv.style.backgroundColor = "brown";
    }
    
});