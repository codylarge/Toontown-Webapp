var creditPattern = new Array();
creditPattern[0] = 1100;
creditPattern[1] = 1440;
creditPattern[2] = 1780;
creditPattern[3] = 2120;
creditPattern[4] = 2460;
creditPattern[5] = 2800;
creditPattern[6] = 3140;
creditPattern[7] = 3480;
creditPattern[8] = 3820;
creditPattern[9] = 8900;

var timePattern = new Array(); //in MINUTES
timePattern[0] = 13;
timePattern[1] = 20; // 0 to account for the fact that its less than 1 hour for each of the first 2 levels 
timePattern[2] = 21;
timePattern[3] = 27;
timePattern[4] = 27;
timePattern[5] = 32;
timePattern[6] = 39;
timePattern[7] = 40;
timePattern[8] = 45;
timePattern[9] = 98;

function getHalfPattern(type) {
    var halfPattern = new Array();
    if(type == "credit") {
        halfPattern[0] = 1100;
        halfPattern[1] = 1440;
        halfPattern[2] = 1780;
        halfPattern[3] = 2120;
        halfPattern[4] = 8900;
    } else if(type == "time") {
        halfPattern[0] = 13;
        halfPattern[1] = 20;
        halfPattern[2] = 21;
        halfPattern[3] = 27;
        halfPattern[4] = 98;
    }
    return halfPattern;
}
//info: 1 'cycle' refers to 10 levels as cheese(20-50), each cycle ends AFTER max stocks
//HOURS

//BOSSES - remains constant across all cog suits
const totalBosses = 77;//amount of bosses total to max from level 1 cog
const bossesTo8 = 35; //bosses defeated up to highest cog(lvl 8)

//CREDITS
const startingCredits = 64640; //Credits earned UP TO level 20
const maxCredits = 157760; //Credits required to max out
const facilityCredits = 1300; //credits(stocks/notices/etc) per facility (back 9, DA Office D, etc)
const cycleCredits = 31000; //credits required to complete one cycle
const halfCycleCredits = 15340;//credits required for 1/2 cycle (lvl 8-12)
//TIME
const totalFacilityTime = 31; //total time to max without bosses(only facilities) in HOURS
const bossTime = .5; //hours to defeat boss
const maxTime = totalFacilityTime + (totalBosses * bossTime); //total time to max including bosses
const facilityTime = 11; //minutes it takes to complete one bullion mint



function toggleInfo(cog){
    var x = document.getElementById(cog);
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function robberPrompt() {
    var x = document.getElementById("robber");
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        var level = parseInt(prompt("Enter Big Robber Baron level"));
        if(level < 8 || level > 50){
            alert("Really? You're a level " + level + " Robber Baron?");
        } else if(isNaN(level)){
            
        } else {
            robberCalculations(level);
            toggleInfo('robber');
        }
    }
}

function robberCalculations(level){
    calculateWithLevel(level);
}

function calculateWithLevel(level) { 
    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var facilityDisplay = document.getElementById("courses");
    var creditsDisplay = document.getElementById("options");

    document.getElementById("level").innerHTML = level;

    const levelMult = getLevelMult(level); // determines how many times level has completed a cycle
    const position = setPosition(level); // position will correspond with current merits required
    

    if(level < 20){
        underTwenty(level);
        return;
    } else { 
        
        var coursesLeft;
        var timeSpent;
        var timeLeft = (totalBosses - (bossesTo8 + (level-8))) * bossTime; //time left to max suit, starts at boss time left
        var creditsToMax;
        var totalCredits = startingCredits + cycleCredits * levelMult;  //starts at current credits up to this cycle
        var currentCycleTime = 0;
        
        for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
            totalCredits += creditPattern[i]; // adds this cycles credits to total credits
            currentCycleTime += timePattern[i];
        } //totalCredits now = credits earned up to this point

        creditsToMax = maxCredits - totalCredits; //final value for credits required
        timeLeft += ((creditsToMax/facilityCredits)*facilityTime) / 60; //final value for time left
        timeSpent = maxTime - timeLeft; //final value for timeSpent

        coursesLeft = creditsToMax/facilityCredits;

        //this will eventually move out the loop when adding levels 8-19


        toMaxDisplay.innerHTML = Math.ceil(timeLeft) + "hrs";
        timeSpentDisplay.innerHTML = parseInt(timeSpent) + "hrs";
        creditsDisplay.innerHTML = transformLargeNumber(creditsToMax);
        facilityDisplay.innerHTML = parseInt(coursesLeft);
    } 
}

function underTwenty(level){ //sets HTML values in method  --- D
    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var facilityDisplay = document.getElementById("courses");
    var creditsDisplay = document.getElementById("options");

    var timeLeft = (totalBosses - (bossesTo8 + (level-8))) * bossTime; //time left to max suit, starts at boss time left
    const position = setPosition(level); // position will correspond with current merits required
    const creditsAt8 = 23960;//133800; //cogbucks earned up to 8
    const timeAt8 = 25; //time left at 8
    const timeHalfCycle = getHalfPattern("time");
    const creditHalfCycle = getHalfPattern("credit");
    var totalCredits = creditsAt8 + extraCredits(level); //starts at total credits earned up to current level (except for cycle)
    var creditsToMax;

    if(level != 14 && level != 13) { //gets just cycle credits 
        for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
            totalCredits += creditHalfCycle[i];
            //currentCycleTime += timeHalfCycle[i];
        }
    }

    creditsToMax = maxCredits - totalCredits;
    creditsDisplay.innerHTML = transformLargeNumber(creditsToMax);

    timeLeft += ((creditsToMax/facilityCredits)*facilityTime) / 60; //final value for time left
    timeSpent = maxTime - timeLeft; //final value for timeSpent
    coursesLeft = creditsToMax/facilityCredits;

    toMaxDisplay.innerHTML = Math.ceil(timeLeft) + "hrs";
    timeSpentDisplay.innerHTML = parseInt(timeSpent) + "hrs";
    creditsDisplay.innerHTML = transformLargeNumber(creditsToMax);
    facilityDisplay.innerHTML = parseInt(coursesLeft);

}

function extraCredits(level){ 
    const cycleStartCredits = 1100; // D
    const cycleEndCredits = 8900; // D
    if(level - 12 <= 0) {
        return 0;
    } else if(level == 13) {
        return halfCycleCredits + cycleStartCredits;
    } else {
        return halfCycleCredits + cycleStartCredits + cycleEndCredits;
    }
}


function setPosition(level) { // S
    if(level > 19){
        return level % 10;
    } else if(level >= 15 && level <= 19) { // [15, 19]
        return (level - 15) % 10;
    } else if (level < 13) { // [12, -]
        return (level - 8) % 10;
    } else { // [13, 14]
        return null;
    }
} 

// puts K at end to make it more readable only supports: 10,000 < value < 1,000,000
function transformLargeNumber(creditsToMax) { 

    var subs;
    if(creditsToMax - 10000 < 0) {
        return creditsToMax;
    } else if(creditsToMax - 100000 < 0){ 
        subs = 2;
    } else { subs = 3; } 

    return creditsToMax.toString().substring(0,subs) + "K";
}

function getLevelMult(level){ // returns a number rep how many cycles the inputted level has completed
    mult = 0;
    for(i = level-20; i >= 10; i) {
        i-=10;
        mult++;
    }
    return mult;
}


