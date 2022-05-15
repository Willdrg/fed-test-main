import api from '../assets/data.json' assert { type: "json" };

//wrapper is the container of the cards
const wrapper = document.getElementById("container");

//myHTML is the variable we'll use to fill the cards with the data.json info
let myHTML = '';
let cardID = 0;
//creating the cards with the provided data
api.data.forEach(famousPerson => {
    const formatTime = famousPerson.lastUpdated;
    let thumbsColor = "thumbsUp";
    let popularity = "up";
    //upwidth and downwidth are used to organize the width of the status gauge
    const upWidth = Math.round((famousPerson.votes.positive/(famousPerson.votes.positive + famousPerson.votes.negative))*100);
    const downWidth = 100 - upWidth; 
    if (famousPerson.votes.positive < famousPerson.votes.negative) {
        thumbsColor = "thumbsDown";
        popularity = "down";
    }
    
    myHTML +=
    `
    <div class="card" id="${cardID}" style="background-image: url(../assets/img/${famousPerson.picture});">
            <div class="icon_status icon_container ${thumbsColor}">
            <img src="../assets/img/thumbs-${popularity}.svg" alt="">
            </div>
            <h2 class="card_title">${famousPerson.name}</h2>
            <p class="card_description">${famousPerson.description}</p>
            <p class="card_time">${formatTime}</p>
            <div class="button_container">
                <button class="thumbsUpButton icon_container thumbsUp thumbsButton" ><img src="../assets/img/thumbs-up.svg" alt=""></button>
                <button class="thumbsDownButton icon_container thumbsDown thumbsButton" ><img src="../assets/img/thumbs-down.svg" alt=""></button>
                <button class="voteNow_button" id="voteNow${cardID}" disabled>Vote Now</button>
            </div>
            <div class="status_gauge">
                <span class="thumbsUp status_gauge_positive" style= "flex: 1 1 ${upWidth}%"><img src="../assets/img/thumbs-up.svg" alt="thumbsUp">  ${upWidth}%</span>
                <span class="thumbsDown status_gauge_negative" style= "flex: 1 1 ${downWidth}%">${downWidth}%  <img src="../assets/img/thumbs-down.svg" alt="thumbsDown"></span>
            </div>
        </div>
    `;   
    cardID ++;   
});
wrapper.innerHTML = myHTML;

//variables to know if the vote is up or down
let upTrue = 1;
let downTrue = 2;
let finalVote = 0;
//adding the event listener to the Thumbsup buttons
var thumbsUpButtons = document.getElementsByClassName("thumbsUpButton");
for (let i = 0, l = thumbsUpButtons.length; i < l; i++) {
    thumbsUpButtons[i].addEventListener('click', function() {
    enableButton(i, upTrue);
  })
}
var thumbsDownButtons = document.getElementsByClassName("thumbsDownButton");
for (let i = 0, l = thumbsDownButtons.length; i < l; i++) {
    thumbsDownButtons[i].addEventListener('click', function() {
    enableButton(i, downTrue);
  })
}
function enableButton (id, voteCounter){
    let voteID = "voteNow" + id;
    let voteNowButton = document.getElementById(voteID);
    voteNowButton.disabled = false;
    voteNowButton.classList.add("voteNowAble");
    finalVote = voteCounter;
}

var voteNowButtons = document.getElementsByClassName("voteNow_button");
for (let i = 0, l = voteNowButtons.length; i < l; i++) {
    if(voteNowButtons[i].disabled) {
        voteNowButtons[i].addEventListener('click', function() {
            console.log("funciono");
            console.log(finalVote);
        })
    }
}