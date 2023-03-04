
function calculateAccuracy(baseAcc) {
    if(baseAcc == 100) {
        document.getElementById("accuracydisplay").innerHTML = "Perfect";
    } else {
        var tgtDef = document.getElementById("coglevel").innerHTML;
        var trackExp = document.getElementById("trackexp").innerHTML;
        var stuns = document.getElementById("stuns").innerHTML;
        var accuracy = parseInt(baseAcc);

        accuracy += ((trackExp - 1) * 10);
        accuracy += (stuns*20);
        
        if(tgtDef == 1){
            accuracy += -2; //tgt def -2 for level 1
        } else {
            accuracy += ((tgtDef-1) * -5);
        }

        if(accuracy > 95) {
            accuracy = 95;
        } 
        document.getElementById("accuracydisplay").innerHTML = "%" + accuracy;
    }
}


