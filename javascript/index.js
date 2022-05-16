import api from '../assets/data.json' assert { type: "json" };

//wrapper is the container of the cards
const wrapper = document.getElementById("container");

//myHTML is the variable we'll use to fill the cards with the data.json info
let myHTML = '';
//cardID is a counter used to create different ID's for each card and some of their elements
let cardID = 0;
//relativeTimeArray is to store the format time from each card
let relativeTimeArray = [];
//creating the cards with the provided data
api.data.forEach(famousPerson => {
    //creating the format of the dates so it looks like "1 year ago"
    const formatter = new Intl.RelativeTimeFormat();
    const time = (Date.parse(famousPerson.lastUpdated) - Date.now())/(1000 * 3600 * 24 * 365);
    const formatTime = formatter.format(Math.round(time), 'years');
    relativeTimeArray.push(formatTime);
    //thumbsColor is for the card icon color
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
            <div id = "icon${cardID}"class="icon_status icon_container ${thumbsColor}">
            <img id = "imgIcon${cardID}"src="../assets/img/thumbs-${popularity}.svg" alt="">
            </div>
            <h2 class="card_title">${famousPerson.name}</h2>
            <p class="card_description">${famousPerson.description}</p>
            <p class="card_time" id="eyebrowText${cardID}">${formatTime}</p>
            <div class="button_container">
                <button class="thumbsUpButton icon_container thumbsUp thumbsButton" ><img src="../assets/img/thumbs-up.svg" alt=""></button>
                <button class="thumbsDownButton icon_container thumbsDown thumbsButton" ><img src="../assets/img/thumbs-down.svg" alt=""></button>
                <button class="voteNow_button voteButton" id="voteNow${cardID}" disabled>Vote Now</button>
                <button class="voteAgain_button voteButton" id="voteAgain${cardID}" style ="display: none">Vote Again</button>
            </div>
            <div class="status_gauge">
                <span class="thumbsUp status_gauge_positive" id="positive_gauge${cardID}" style= "flex: 1 1 ${upWidth}%"><img src="../assets/img/thumbs-up.svg" alt="thumbsUp">  ${upWidth}%</span>
                <span class="thumbsDown status_gauge_negative" id="negative_gauge${cardID}" style= "flex: 1 1 ${downWidth}%">${downWidth}%  <img src="../assets/img/thumbs-down.svg" alt="thumbsDown"></span>
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
//adding the event listener to the Thumbs buttons
var thumbsUpButtons = document.getElementsByClassName("thumbsUpButton");
for (let i = 0, l = thumbsUpButtons.length; i < l; i++) {
    thumbsUpButtons[i].addEventListener('click', function() {
    enableButton(i, upTrue);
    thumbsUpButtons[i].classList.add("button_selected");
    thumbsDownButtons[i].classList.remove("button_selected");
  })
}
var thumbsDownButtons = document.getElementsByClassName("thumbsDownButton");
for (let i = 0, l = thumbsDownButtons.length; i < l; i++) {
    thumbsDownButtons[i].addEventListener('click', function() {
    enableButton(i, downTrue);
    thumbsDownButtons[i].classList.add("button_selected");
    thumbsUpButtons[i].classList.remove("button_selected");
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
var voteAgain = document.getElementsByClassName("voteAgain_button");

//vote Now functionality (adding event listener and the actions)
for (let i = 0, l = voteNowButtons.length; i < l; i++) {
    voteNowButtons[i].addEventListener('click', function() {
        if (finalVote === 1) {
            api.data[i].votes.positive ++;
            const upWidth = Math.round((api.data[i].votes.positive/(api.data[i].votes.positive + api.data[i].votes.negative))*100);
            const downWidth = 100 - upWidth; 
            let positive = "positive_gauge" + i;
            let negative = "negative_gauge" + i;
            let positiveGauge = document.getElementById(positive);
            let negativeGauge = document.getElementById(negative);
            positiveGauge.style.flex = `1 1 ${upWidth}%`;
            negativeGauge.style.flex = `1 1 ${downWidth}%`;
            positiveGauge.innerHTML = `<img src="../assets/img/thumbs-up.svg" alt="thumbsUp"> ${upWidth}%`;
            negativeGauge.innerHTML = `${downWidth}% <img src="../assets/img/thumbs-down.svg" alt="thumbsDown">`;
        } else if (finalVote === 2) {
            api.data[i].votes.negative ++;
            const upWidth = Math.round((api.data[i].votes.positive/(api.data[i].votes.positive + api.data[i].votes.negative))*100);
            const downWidth = 100 - upWidth; 
            let positive = "positive_gauge" + i;
            let negative = "negative_gauge" + i;
            let positiveGauge = document.getElementById(positive);
            let negativeGauge = document.getElementById(negative);
            positiveGauge.style.flex = `1 1 ${upWidth}%`;
            negativeGauge.style.flex = `1 1 ${downWidth}%`;
            positiveGauge.innerHTML = `<img src="../assets/img/thumbs-up.svg" alt="thumbsUp"> ${upWidth}%`;
            negativeGauge.innerHTML = `${downWidth}% <img src="../assets/img/thumbs-down.svg" alt="thumbsDown">`;
        }
        let thumbsColor = "thumbsUp";
        let popularity = "up";
        if (api.data[i].votes.positive < api.data[i].votes.negative) {
            thumbsColor = "thumbsDown";
            popularity = "down";
        }
        let color = document.getElementById(`icon${i}`);
        let icon = document.getElementById(`imgIcon${i}`);
        color.classList.remove("thumbsUp");
        color.classList.remove("thumbsDown");
        color.classList.add(thumbsColor);
        icon.src = `../assets/img/thumbs-${popularity}.svg`;
        
        
        let eyebrow = "eyebrowText" + i;
        document.getElementById(eyebrow).innerText = "Thank you for your vote";
        thumbsUpButtons[i].classList.add("voteAgainStatus");
        thumbsUpButtons[i].classList.remove("button_selected");
        thumbsDownButtons[i].classList.add("voteAgainStatus");
        thumbsDownButtons[i].classList.remove("button_selected");
        voteNowButtons[i].disabled = true;
        voteNowButtons[i].style.display = "none";
        voteAgain[i].style.display = "block";
    })
}
//vote Again functions (reseting all the other buttons)
for (let i = 0, l = voteAgain.length; i < l; i++) {
    voteAgain[i].addEventListener('click', function() {
        thumbsUpButtons[i].classList.remove("voteAgainStatus");
        thumbsDownButtons[i].classList.remove("voteAgainStatus");
        voteNowButtons[i].style.display = "block";
        voteNowButtons[i].classList.remove("voteNowAble");
        voteAgain[i].style.display = "none";
        let eyebrow = "eyebrowText" + i;
        document.getElementById(eyebrow).innerText = relativeTimeArray[i];
    })
}