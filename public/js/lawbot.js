var stockPattern = new Array();
stockPattern[0] = 1780;
stockPattern[1] = 2330;
stockPattern[2] = 2880;
stockPattern[3] = 3430;
stockPattern[4] = 3980;
stockPattern[5] = 4530;
stockPattern[6] = 5080;
stockPattern[7] = 5630;
stockPattern[8] = 6180;
stockPattern[9] = 14400;

var timePattern = new Array(); //in MINUTES
timePattern[0] = 21;
timePattern[1] = 31; // 0 to account for the fact that its less than 1 hour for each of the first 2 levels 
timePattern[2] = 38;
timePattern[3] = 42;
timePattern[4] = 52;
timePattern[5] = 56;
timePattern[6] = 63;
timePattern[7] = 73;
timePattern[8] = 77;
timePattern[9] = 168;


function toggleInfo(cog){
    var x = document.getElementById(cog);
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function wigPrompt() {
    var x = document.getElementById("wig");
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        var level = parseInt(prompt("Enter Big Wig level"));
        if(level < 8 || level > 50){
            alert("Really? You're a level " + level + " Wig?");
        } else if(isNaN(level)){
            
        } else {
            wigCalculations(level);
            toggleInfo('wig');
        }
    }
}

function wigCalculations(level){
    calculateWithLevel(level);
    
}

function calculateWithLevel(level){ 

    document.getElementById("level").innerHTML = level;

    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var facilityDisplay = document.getElementById("courses");

    if(level < 20){
        underTwenty(level);
        return;
    } else { 
        // cycle refers to 10 levels as cheese, each cycle ends AFTER max stocks
        const levelMult = getLevelMult(level); // determines how many times level has completed a cycle
        const position = level % 10; // position will correspond with current merits required
        const cycleCredits = 50220;
        const startingCredits = 150660; //starting at 20 bc thats when patter begins
        const spentHours = 22; // hours spent before reaching level 20 not including bosses
        const bossesTo8 = 35 //return the # of bosses completed upon reaching cheese (lvl 8)
        const totalBosses = 77;

        var hoursFromBosses;
        var hoursToMax; //hours left to max
        var currentCycleTime = 0;
        var meritDifference;
        var currentCycleCredits = 0; //stocks earned within current cycle
        
        for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
            currentCycleCredits += stockPattern[i];
           // currentCycleTime += timePattern[i];
        }  
        
        // INITIALIZE VARIABLES
        //currentCycleTime = parseInt(currentCycleTime/60); //convert back to hours
        
        meritDifference = startingCredits - currentCycleCredits;

        meritDifference -= cycleCredits * levelMult; // adjusts for completed cycle's earned stocks

        hoursToMax = setTimeValues(level);
        // DISPLAYING HOURS
        //toMaxDisplay.innerHTML = parseInt(hourDifference) + "hrs";
        //timeSpentDisplay.innerHTML = parseInt(totalTime - hourDifference + spentHours) + "hrs";
    

        // FROM THIS POINT ON, CAN be above or below level 20)
        hoursFromBosses = bossesTo8 + (level-8); // equals time amount of bosses already completed (assuming 1 hr per boss) 
        
        timeSpentDisplay.innerHTML = ((spentHours + hoursFromBosses) + "hrs");
        
        hoursToMax += totalBosses - hoursFromBosses; // adjusts remaining time to account for bosses
        toMaxDisplay.innerHTML = hoursToMax + "hrs";
        
    //this will eventually move out the loop when adding levels 8-19
        var subs;
        if(meritDifference - 100000 < 0){ // puts K at end to make it more readable
            subs = 2;
        } else { subs = 3; } 

        document.getElementById("options").innerHTML = meritDifference.toString().substring(0,subs) + "K";
    } 
}


function getLevelMult(level){
    mult = 0;
    for(i = level-20; i >= 10; i) {
        i-=10;
        mult++;
    }
    return mult;
}

function setTimeValues(level){ // sets courses as its directly related to time. Returns total hours left to max
    const levelMult = getLevelMult(level);
    const cycleHours = 10.5;
    const position = level % 10;
    const facilityTime = 21; //minutes it takes to complete one DA office D

    const totalBosses = 77;
    var totalTime = 24; //total time spent up to level 20(without bosses)
    var maxTime = 55;
    var currentCycleTime = 0;
    var hoursToMax = 0;

    for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
        currentCycleTime += timePattern[i];
    }  

    currentCycleTime = parseInt(currentCycleTime/60); // Convert back to hours
    hoursToMax = maxTime - (totalTime + currentCycleTime);
    hoursToMax -= cycleHours * levelMult; 

    document.getElementById("courses").innerHTML  = parseInt((hoursToMax*60)/facilityTime); // converts to minutes then divides by 

    //timeSpentDisplay.innerHTML = ((spentHours + hoursFromBosses) + "hrs");

    return parseInt(hoursToMax);
}

function setValues(time, wasted, credits, facilities){
    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var facilitiesDisplay = document.getElementById("courses");
    var creditsDisplay = document.getElementById("options");

    toMaxDisplay.innerHTML = time;
    timeSpentDisplay.innerHTML = wasted;
    creditsDisplay = credits;
    facilitiesDisplay = facilities;

}

function underTwenty(level){ //sets HTML values in method
    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var facilitiesDisplay = document.getElementById("courses");
    var creditsDisplay = document.getElementById("options");
    var timeLeft;
    var facilityCredits = 1842; //credits(stocks/notices/etc) per facility (back 9, DA Office D, etc)
    var facilityTime = 21; //time it takes to do a facility
    var credits;
    var bossesLeft = 42 - (level-8); // 42 = bosses left at lvl 8
    var maxTime = 55+77;




    switch(level){
        
        case 8: 
        credits = 216480; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;
        
        case 9: 
        credits = 214700; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 10: 
        credits = 212370; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 11: 
        credits = 209490; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 12: 
        credits = 206060; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 13: 
        credits = 191660; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 14: 
        credits = 189880; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 15: 
        credits = 175480; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 16: 
        credits = 173700; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 17: 
        credits = 171370; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 18: 
        credits = 168490; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 19: 
        credits = 165060; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;
    }

    
}

function setProperties(credits, facilities, timeLeft, timeSpent){
    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var facilitiesDisplay = document.getElementById("courses");
    var creditsDisplay = document.getElementById("options");

    var subs;
    if(credits - 100000 < 0){ // puts K at end to make it more readable
        subs = 2;
    } else { subs = 3; } 

    creditsDisplay.innerHTML = credits.toString().substring(0,subs) + "K";
    facilitiesDisplay.innerHTML = facilities;
    toMaxDisplay.innerHTML = timeLeft + "hrs";
    timeSpentDisplay.innerHTML = timeSpent + "hrs";
}

