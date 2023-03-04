function cogLevels() {
    document.getElementById("cogleveldropdown").classList.toggle("show");  
}

function trackProgress() {
    document.getElementById("trackprog").classList.toggle("show");  
}

function stuns() {
    document.getElementById("stundropdown").classList.toggle("show");  
}

function setCogLevel(cogLevel) {
    document.getElementById("coglevel").innerHTML = parseInt(cogLevel);
}

function setTrackExp(trackExp) {
    document.getElementById("trackexp").innerHTML = parseInt(trackExp);
}

function setStuns(stuns) {
    document.getElementById("stuns").innerHTML = parseInt(stuns);
}

function reset(){
    document.getElementById("stuns").innerHTML = 0;
    document.getElementById("trackexp").innerHTML = 7;
    document.getElementById("coglevel").innerHTML = 12;
    document.getElementById("accuracydisplay").innerHTML = "";
}