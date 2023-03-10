var creditPattern = new Array();
creditPattern[0] = 680;
creditPattern[1] = 890;
creditPattern[2] = 1100;
creditPattern[3] = 1310;
creditPattern[4] = 1520;
creditPattern[5] = 1730;
creditPattern[6] = 1940;
creditPattern[7] = 2150;
creditPattern[8] = 2360;
creditPattern[9] = 5500;

var timePattern = new Array(); //in MINUTES
timePattern[0] = 12;
timePattern[1] = 17; // 0 to account for the fact that its less than 1 hour for each of the first 2 levels 
timePattern[2] = 17;
timePattern[3] = 23;
timePattern[4] = 23;
timePattern[5] = 28;
timePattern[6] = 28;
timePattern[7] = 30;
timePattern[8] = 34;    
timePattern[9] = 80;

function getHalfPattern(type) {
    var halfPattern = new Array();
    if(type == "credit") {
        halfPattern[0] = 680;
        halfPattern[1] = 890;
        halfPattern[2] = 1100;
        halfPattern[3] = 1310;
        halfPattern[4] = 5500;
    } else if(type == "time") {
        halfPattern[0] = 12;
        halfPattern[1] = 17;
        halfPattern[2] = 17;
        halfPattern[3] = 23;
        halfPattern[4] = 80;
    }
    return halfPattern;
}
//info: 1 'cycle' refers to 10 levels as cheese(20-50), each cycle ends AFTER max stocks
//HOURS

//BOSSES - remains constant across all cog suits
const totalBosses = 77;//amount of bosses total to max from level 1 cog
const bossesTo8 = 35; //bosses defeated up to highest cog(lvl 8)

//CREDITS
const startingCredits = 40640; //Credits earned UP TO level 20
const maxCredits = 97500; //Credits required to max out
const facilityCredits = 776; //credits(stocks/notices/etc) per facility (back 9, DA Office D, etc)
const cycleCredits = 19180; //credits required to complete one cycle
const halfCycleCredits = 9480;//credits required for 1/2 cycle (lvl 8-12)
//TIME
const totalFacilityTime = 26; //total time to max without bosses(only facilities) in HOURS
const bossTime = .3; //hours to defeat boss
const maxTime = totalFacilityTime + (totalBosses * bossTime); //total time to max including bosses
const longTime = 12; //minutes it takes to complete one Long factory
const shortTime = 5; //minutes it takes to complete one Short factory



function toggleInfo(cog){
    var x = document.getElementById(cog);
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function hollywoodPrompt() {
    var x = document.getElementById("hollywood");
    if(x.style.display == "block"){
        x.style.display = "none";
    } else {
        var level = parseInt(prompt("Enter Big Hollywood level"));
        if(level < 8 || level > 50){
            alert("Really? You're a level " + level + " Hollywood?");
        } else if(isNaN(level)){
            
        } else {
            hollywoodCalculations(level);
            toggleInfo('hollywood');
        }
    }
}

function hollywoodCalculations(level){
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
        timeLeft += ((creditsToMax/facilityCredits)*longTime) / 60; //final value for time left
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

    timeLeft += ((creditsToMax/facilityCredits)*longTime) / 60; //final value for time left
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


