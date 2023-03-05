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
    var optionsDisplay = document.getElementById("options");

        optionsDisplay.innerHTML = calculateWithLevel(level);
        
}

function calculateWithLevel(level){ 
    document.getElementById("level").innerHTML = level;
    var toMaxDisplay = document.getElementById("timetomax");
    var timeSpentDisplay = document.getElementById("timespent");
    var coursesDisplay = document.getElementById("courses");

    if(level < 20){
        alert("Can you read? Imagine being level " + level + " LMAO");
    } else { 
        // cycle refers to 10 levels as cheese, each cycle ends AFTER max stocks
        const levelMult = getLevelMult(level); // determines how many times level has completed a cycle
        const position = level % 10; // position will correspond with current merits required
        const cycleStocks = 81240;
        const startingCourses = 45; //15 per cycle
        const startingStocks = 243720; //starting at 20 bc thats when patter begins
        
        var spentHours = 28; // hours spent before reaching level 20 cheese
        var totalTime = 33; //total hours to max from flunky lvl 1
        var cycleHours = 11; //hours per cycle
        
        var courses;
        var hourDifference; //hours left to max
        var currentCycleTime = 0;
        var meritDifference;
        var currentCycleStocks = 0; //stocks earned within current cycle
        
        for(i = position - 1; i >= 0; i--){ //start at -1 to avoid counting current levels merits as completed
            currentCycleStocks += stockPattern[i];
            currentCycleTime += timePattern[i];
        }  
        
        currentCycleTime = parseInt(currentCycleTime/60); //convert back to hours
        
        meritDifference = startingStocks - currentCycleStocks;
        hourDifference = totalTime - currentCycleTime;

        meritDifference -= cycleStocks * levelMult; // adjusts for completed cycle's earned stocks
        hourDifference -= cycleHours * levelMult; 

        toMaxDisplay.innerHTML = parseInt(hourDifference) + "hrs";
        timeSpentDisplay.innerHTML = parseInt(totalTime - hourDifference + spentHours) + "hrs";
    
        var minutesToMax = hourDifference*60;
        courses = minutesToMax/45;
        coursesDisplay.innerHTML  = parseInt(courses);
    
    
    //this will eventually move out the loop when adding levels 8-19
        var subs;
        if(meritDifference - 100000 < 0){ // puts K at end to make it more readable
            subs = 2;
        } else { subs = 3; } 
    
        return meritDifference.toString().substring(0,subs) + "K";
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

function setTimeValues(level){
    const position = level % 10;

}





function displayCheeseInfo(){

}