function setLastDamage(damage){
    document.getElementById("lastdamage").innerHTML = damage;
}

//TODO: MAKE TRAP, DROP, LURE CANCEL COMBO
//DAMAGE TYPES
function dealDamage(damage, track) {
    var element = document.getElementById("displayedDamage");
    var totalDamage = parseInt(element.innerHTML);
    var lastGagType = document.getElementById("lastgagdisplay").innerHTML;
    var lured = document.getElementById("luredisplay").innerHTML;

    if(lured == "Yes"){ // if lured
        totalDamage += (parseInt(damage) + parseInt(damage)/2); 
        document.getElementById("luredisplay").innerHTML = "Combo";
    } else if(lured == "Combo"){ // if combo 
        if(track == lastGagType) {
            totalDamage += (parseInt(damage) + parseInt(damage)/2);
        } else { // end of combo
            document.getElementById("luredisplay").innerHTML = "No";
            totalDamage += parseInt(damage);
        }  
    } else { // not lured
        totalDamage += parseInt(damage);
    }
    
    //console.log(totalDamage);
    totalDamage += comboCalculator(track,damage);
    document.getElementById("displayedDamage").innerHTML = totalDamage;
    setLastDamage(damage);
}

function soundDamage(damage) {
    var element = document.getElementById("displayedDamage");
    var totalDamage = parseInt(element.innerHTML);

    totalDamage += parseInt(damage);

    document.getElementById("luredisplay").innerHTML = "No";
    //console.log(totalDamage);
    totalDamage += comboCalculator("sound",damage);
    document.getElementById("displayedDamage").innerHTML = totalDamage;
    setLastDamage(damage);
}

function dropDamage(damage) {
    var element = document.getElementById("displayedDamage");
    var totalDamage = parseInt(element.innerHTML);

    if(document.getElementById("luredisplay").innerHTML == "No"){
        totalDamage += parseInt(damage);
        totalDamage += comboCalculator("drop",damage);
        document.getElementById("displayedDamage").innerHTML = totalDamage;
        setLastDamage(damage);
    }
    //Otherwise miss
} 
// END DAMAGE TY

function reset(){
    document.getElementById("displayedDamage").innerHTML = 0;
    document.getElementById("trapdamage").innerHTML = 0;
    document.getElementById("luredisplay").innerHTML = "No";
    document.getElementById("lastgagdisplay").innerHTML = "";
    document.getElementById("combodisplay").innerHTML = 0;
    document.getElementById("combodamage").innerHTML = 0;
    document.getElementById("lastdamage").innerHTML = 0;
}

function setTrap(trapDamage) {

    if(document.getElementById("luredisplay").innerHTML == "Yes") { // makes sure cog isnt lured when adding trap

    } else {
        document.getElementById("trapdamage").innerHTML = trapDamage;
    }
}

function lure(){
    var potentialDamage = parseInt(document.getElementById("trapdamage").innerHTML);
    var currentDamage = parseInt(document.getElementById("displayedDamage").innerHTML);

    if(potentialDamage != 0) { // deals trap damage if needed
        //document.getElementById("displayedDamage").innerHTML += potentialDamage;
        currentDamage += potentialDamage;
        document.getElementById("displayedDamage").innerHTML = currentDamage;
        document.getElementById("trapdamage").innerHTML = 0;
    } else {
        document.getElementById("luredisplay").innerHTML = "Yes";
    }
}

function comboCalculator(gagType, damage){
    var currentCombo = parseInt(document.getElementById("combodisplay").innerHTML); 
    var lastGagType = document.getElementById("lastgagdisplay").innerHTML;
    var lastGagBonus = parseFloat(document.getElementById("lastdamage").innerHTML)*.2;
    var comboDamage = parseFloat(document.getElementById("combodamage").innerHTML);
    var bonusDamage = parseFloat(damage*.2); 
    
    //bonusDamage = parseInt(Math.ceil(bonusDamage)); // THIS CAUSES DMG TO BE SLIGHTLY OFF(for perfect damage must round up once total damage is calculated)
    //lastGagBonus = parseInt(Math.ceil(lastGagBonus))

    if(lastGagType == gagType) {
        comboDamage += bonusDamage;
        
        if(currentCombo <= 1) { //start of new combo
            //totalDamage += bonusDamage*2; //need to *2 because it adds bonus damage for this AND last gag
            currentCombo++;
            comboDamage += bonusDamage; //add again because need to make up for last gag
            document.getElementById("combodisplay").innerHTML = currentCombo;
            document.getElementById("combodamage").innerHTML = comboDamage;
            return bonusDamage + lastGagBonus;
        } else { 
            //totalDamage += bonusDamage;
            currentCombo++;
            document.getElementById("combodisplay").innerHTML = currentCombo;
            document.getElementById("combodamage").innerHTML = comboDamage;
            return bonusDamage;
        }
        
    } else { // different gag type
        if(currentCombo == 0){ // no combo and different gag type
            document.getElementById("combodisplay").innerHTML = 1; //new gag used
        } else { // end of combo
            document.getElementById("combodisplay").innerHTML = 0;
            document.getElementById("combodamage").innerHTML = 0;
        }
    }

    document.getElementById("lastgagdisplay").innerHTML = gagType;
    return 0;
}