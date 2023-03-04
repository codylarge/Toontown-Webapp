var drop = document.getElementsByClassName("collapse");
var i;

for(i = 0; i < drop.length; i++){
    drop[i].addEventListener("click", function() {
        //element being clicked
        var content = this.nextElementSibling;

        if(content.style.display == "block"){
            content.style.display = "none"; //if its open, close it
        } else {
            content.style.display = "block";
        }
    })
}