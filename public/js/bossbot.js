var stockPattern = new Array();
stockPattern[0] = 2880;
stockPattern[1] = 3770;
stockPattern[2] = 4660;
stockPattern[3] = 5500;
stockPattern[4] = 6440;
stockPattern[5] = 7330;
stockPattern[6] = 8220;
stockPattern[7] = 9110;
stockPattern[8] = 10000;
stockPattern[9] = 23330;

var timePattern = new Array(); //in MINUTES
timePattern[0] = 30;
timePattern[1] = 30; // 0 to account for the fact that its less than 1 hour for each of the first 2 levels 
timePattern[2] = 45;
timePattern[3] = 50;
timePattern[4] = 60;
timePattern[5] = 70;
timePattern[6] = 70;
timePattern[7] = 80;
timePattern[8] = 90;
timePattern[9] = 180;


function toggleInfo(cog){
    var x = document.getElementById(cog);
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function cheesePrompt() {
    var x = document.getElementById("cheese");
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        var level = parseInt(prompt("Enter Big Cheeser level"));
        if(level < 8 || level > 50){
            alert("Really? You're a level " + level + " Cheese?");
        } else if(isNaN(level)){
            
        } else {
            cheeseCalculations(level);
            toggleInfo('cheese');
        }
    }
}

function cheeseCalculations(level){
    calculateWithLevel(level);
    
}

function calculateWithLevel(level){ 

    document.getElementById("level").innerHTML = level;

    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var coursesDisplay = document.getElementById("courses");

    if(level < 20){
        underTwenty(level);
        return;
    } else { 
        // cycle refers to 10 levels as cheese, each cycle ends AFTER max stocks
        const levelMult = getLevelMult(level); // determines how many times level has completed a cycle
        const position = level % 10; // position will correspond with current merits required
        const cycleStocks = 81240;
        const startingStocks = 243720; //starting at 20 bc thats when patter begins
        const spentHours = 30; // hours spent before reaching level 20 not including bosses
        const bossesTo8 = 35 //return the # of bosses completed upon reaching cheese (lvl 8)
        const totalBosses = 77;

        var hoursFromBosses;
        var hoursToMax; //hours left to max
        var currentCycleTime = 0;
        var meritDifference;
        var currentCycleStocks = 0; //stocks earned within current cycle
        
        for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
            currentCycleStocks += stockPattern[i];
            currentCycleTime += timePattern[i];
        }  
        
        // INITIALIZE VARIABLES
        currentCycleTime = parseInt(currentCycleTime/60); //convert back to hours
        
        meritDifference = startingStocks - currentCycleStocks;

        meritDifference -= cycleStocks * levelMult; // adjusts for completed cycle's earned stocks

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
    const cycleHours = 12;
    const position = level % 10;
    const courseTime = 45; //minutes it takes to complete one back 9 course

    const totalBosses = 77;
    var totalTime = 36; //total time spent up to level 20(without bosses)
    var currentCycleTime = 0;
    var hoursToMax = 0;

    for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
        currentCycleTime += timePattern[i];
    }  

    currentCycleTime = parseInt(currentCycleTime/60); // Convert back to hours
    hoursToMax = totalTime - currentCycleTime;
    hoursToMax -= cycleHours * levelMult; 

    document.getElementById("courses").innerHTML  = parseInt((hoursToMax*60)/courseTime); // converts to minutes then divides by 

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
    var facilityCredits = 5500; //credits(stocks/notices/etc) per facility (back 9, DA Office D, etc)
    var facilityTime = 45; //time it takes to do a facility
    var credits;
    var bossesLeft = 42 - (level-8); // 42 = bosses left at lvl 8
    var maxTime = 143;




    switch(level){
        
        case 8: 
        credits = 350000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;
        
        case 9: 
        credits = 347000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 10: 
        credits = 343000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 11: 
        credits = 339000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 12: 
        credits = 333000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 13: 
        credits = 310000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 14: 
        credits = 307000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 15: 
        credits = 283780; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 16: 
        credits = 281000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 17: 
        credits = 277000; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 18: 
        credits = 272500; //credits left to max
        timeLeft = parseInt((((credits/facilityCredits)) * facilityTime) / 60) + bossesLeft; // gets time spent in hours
        setProperties(credits, parseInt(((timeLeft - bossesLeft) * 60) / facilityTime), timeLeft, maxTime - timeLeft);
        break;

        case 19: 
        credits = 267000; //credits left to max
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

function getHalfCycle(type) {
    var newArray;
    if(type == "stock") {
        newArray = stockPattern;
        newArray[4] = 23330;
    } else {
        var newArray = timePattern;
        newArray[4] = 180;
    }
    return newArray;
}


/*

function calculateWithLevel(level){ 
    var stockPattern = new Array();
    stockPattern[0] = 2880;
    stockPattern[1] = 3770;
    stockPattern[2] = 4660;
    stockPattern[3] = 5500;
    stockPattern[4] = 6440;
    stockPattern[5] = 7330;
    stockPattern[6] = 8220;
    stockPattern[7] = 9110;
    stockPattern[8] = 10000;
    stockPattern[9] = 23330;

    var timePattern = new Array(); //in MINUTES
    timePattern[0] = 30;
    timePattern[1] = 30; // 0 to account for the fact that its less than 1 hour for each of the first 2 levels 
    timePattern[2] = 45;
    timePattern[3] = 50;
    timePattern[4] = 60;
    timePattern[5] = 70;
    timePattern[6] = 70;
    timePattern[7] = 80;
    timePattern[8] = 90;
    timePattern[9] = 180;

    document.getElementById("level").innerHTML = level;
    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var coursesDisplay = document.getElementById("courses");
    if(level < 20){
        underTwenty(level);
        return;
    } else { 
        // cycle refers to 10 levels as cheese, each cycle ends AFTER max stocks
        const levelMult = getLevelMult(level); // determines how many times level has completed a cycle
        const position = level % 10; // position will correspond with current merits required
        const cycleStocks = 81240;
        const startingCourses = 45; // 15 per cycle
        const startingStocks = 243720; //starting at 20 bc thats when patter begins
        const totalTime = 36; // when added with spentHours it = total time to max
        const cycleHours = 12;
        const spentHours = 30; // hours spent before reaching level 20 not including bosses
        const bossesTo8 = 35 //return the # of bosses completed upon reaching cheese (lvl 8)
        const totalBosses = 77;

        var hoursFromBosses;
        var minutesToMax; 
        var courses;
        var hourDifference; //hours left to max
        var currentCycleTime = 0;
        var meritDifference;
        var currentCycleStocks = 0; //stocks earned within current cycle
        
        for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
            currentCycleStocks += stockPattern[i];
            currentCycleTime += timePattern[i];
        }  
        
        // INITIALIZE VARIABLES
        currentCycleTime = parseInt(currentCycleTime/60); //convert back to hours
        
        meritDifference = startingStocks - currentCycleStocks;
        hourDifference = totalTime - currentCycleTime;

        meritDifference -= cycleStocks * levelMult; // adjusts for completed cycle's earned stocks
        hourDifference -= cycleHours * levelMult; 

        // DISPLAYING HOURS
        //toMaxDisplay.innerHTML = parseInt(hourDifference) + "hrs";
        //timeSpentDisplay.innerHTML = parseInt(totalTime - hourDifference + spentHours) + "hrs";
    
        // DISPLAYING TOTAL BACK 9
        minutesToMax = hourDifference*60;
        courses = minutesToMax/45;
        coursesDisplay.innerHTML  = parseInt(courses);
    

        // FROM THIS POINT ON, 
        hoursFromBosses = bossesTo8 + (level-8); // equals time amount of bosses already completed (assuming 1 hr per boss) 
        
        timeSpentDisplay.innerHTML = ((spentHours + hoursFromBosses) + "hrs");
        
        hourDifference += totalBosses - (hoursFromBosses); // adjusts remaining time to account for bosses
        toMaxDisplay.innerHTML = hourDifference + "hrs";
        
    //this will eventually move out the loop when adding levels 8-19
        var subs;
        if(meritDifference - 100000 < 0){ // puts K at end to make it more readable
            subs = 2;
        } else { subs = 3; } 
    
        return meritDifference.toString().substring(0,subs) + "K"; // returns merits bc this code is sh*t
    } 
} */