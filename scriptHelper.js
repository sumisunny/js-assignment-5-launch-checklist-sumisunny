// Write your helper functions here!
require('isomorphic-fetch');
//require("node-fetch");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    
   // Here is the HTML formatting for our mission target div.
   missionTarget.innerHTML=`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${ name } </li>
                    <li>Diameter: ${ diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${ distance }</li>
                    <li>Number of Moons: ${ moons }</li>
                </ol>
                <img src="${ imageUrl }">
                `;
   
}

function validateInput(testInput) {
  
   // alert("validate function");
    if (testInput === "" || testInput === null || testInput === 0) {
        return "Empty";
    } else if ((!isNaN(testInput))) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
}



function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    
    //DOM elements
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    //let faultyItems=document.getElementById('faultyItems');
    //alert(faultyItems);

     //update pilot/copilot status
     pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
     copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
     list.style.visibility = 'hidden';
    // }
     //check fuel levels and update faulty items
     if (Number(fuelLevel) < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Fuel level too low for launch';       
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        list.style.visibility = 'visible';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }else if (Number(fuelLevel) > 10000 && Number(cargoLevel) > 10000) {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle is not ready for launch";
        launchStatus.style.color = "rgb(199, 37, 78)";
    }else if((Number(fuelLevel) < 10000 && Number(cargoLevel) > 10000)){
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';   
        fuelStatus.innerHTML = 'Fuel level too low for launch';     
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)';
    }else {
        list.style.visibility = 'visible';
        launchStatus.style.color = "rgb(65, 159, 106)";
        launchStatus.innerHTML = 'Shuttle is Ready for Launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    } 
    
//}
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

