console.log('Client side js is loaded');

const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const dynBackground = document.querySelector('body');

//Setting default video background
document.getElementById("video").src = "../img/video.mp4";

weather.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = '';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{    
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error;
        } else{
        console.log(data.location);
        console.log(data.dataForecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.dataForecast; 
        console.log(data.dataSum); 
        //Making the summary an array
        let sumArray = data.dataSum.split(" ");
        //Looping trough the array and changing the background based on results
        for (const word of sumArray){
            if(word === "cloudy" || word === "Cloudy"){
            document.body.style.backgroundImage = "linear-gradient(to right, rgba(169,169,169, .8), rgba(128,128,128, .8)), url('../img/cloudy.jpg')"
            document.getElementById("video").style.display = "none";
            document.getElementById("output").style.backgroundColor = "rgba(128, 128,128, .5)";

            } else if(word === "clear" || word ==="Clear") {
            document.body.style.backgroundImage = "linear-gradient(to right, rgba(156, 213, 252, .5), rgba(42, 121, 240, .5)), url('../img/sun.jpg')";
            document.getElementById("video").style.display = "none";
            document.getElementById("output").style.backgroundColor = "rgba(70,130,180, .5)";

            } else if(word === "rain" || word ==="Rain" || word === "Raining" || word === "raining") {
            document.body.style.backgroundImage = "linear-gradient(to right,  rgba(169,169,169, .5), rgba(128,128,128, .5)), url('../img/rain.jpg')";
            document.getElementById("video").style.display = "none";
            document.getElementById("output").style.backgroundColor = "rgba(128, 128,128, .5)";

            } else if(word === "thunder" || word === "Thunder"){
            document.body.style.backgroundImage = "linear-gradient(to right, rgba(156, 213, 252, .2), rgba(42, 121, 240, .2)), url('../img/thunder.jpg')";
            document.getElementById("video").style.display = "none";

            } else if(word === "snow" || word === "Snow") {
            document.body.style.backgroundImage = "linear-gradient(to right, rgba(156, 213, 252, .2), rgba(42, 121, 240, .2)), url('../img/snow.jpg')"
            document.getElementById("video").style.display = "none";
            document.getElementById("output").style.backgroundColor = "rgba(128, 128,128, .5)";

        } else if (word === "foggy" || word === "Foggy" || word === "Fog" || word === "fog"){
            document.body.style.backgroundImage = "linear-gradient(to right, rgba(156, 213, 252, .2), rgba(42, 121, 240, .2)), url('../img/fog.jpg')"
            document.getElementById("video").style.display = "none";
            document.getElementById("output").style.backgroundColor = "rgba(128, 128,128, .3)";
        } else if (word === "Breezy" || word === "breezy") {
            document.body.style.backgroundImage = "linear-gradient(to right, rgba(156, 213, 252, .4), rgba(42, 121, 240, .4)), url('../img/breez.jpg')"
            document.getElementById("video").style.display = "none";
            document.getElementById("output").style.backgroundColor = "rgba(70,130,180, .5)";
        }
        }
        }
    })
})
});