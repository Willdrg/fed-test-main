import api from '../assets/data.json' assert { type: "json" };

const wrapper = document.getElementById("container");

let myHTML = '';

api.data.forEach(famousPerson => {
    const formatTime = famousPerson.lastUpdated;
    let thumbsColor = "thumbsUp";
    let popularity = "up";
    const upWidth = Math.round((famousPerson.votes.positive/(famousPerson.votes.positive + famousPerson.votes.negative))*100);
    const downWidth = 100 - upWidth; 
    if (famousPerson.votes.positive < famousPerson.votes.negative) {
        thumbsColor = "thumbsDown";
        popularity = "down";
    }
    myHTML +=
    `
    <div class="card" style="background: url(../assets/img/${famousPerson.picture});">
            <div class="icon_status icon_container ${thumbsColor}">
            <img src="../assets/img/thumbs-${popularity}.svg" alt="">
            </div>
            <h2 class="card_title">${famousPerson.name}</h2>
            <p class="card_description">${famousPerson.description}</p>
            <p class="card_time">${formatTime}</p>
            <div class="button_container">
                <button class="icon_container thumbsUp thumbsButton"><img src="../assets/img/thumbs-up.svg" alt=""></button>
                <button class="icon_container thumbsDown thumbsButton"><img src="../assets/img/thumbs-down.svg" alt=""></button>
                <button class="voteNow_button" disabled>Vote Now</button>
            </div>
            <div class="status_gauge">
                <span class="thumbsUp status_gauge_positive" style= "flex: 1 1 ${upWidth}%"><img src="../assets/img/thumbs-up.svg" alt="thumbsUp">  ${upWidth}%</span>
                <span class="thumbsDown status_gauge_negative" style= "flex: 1 1 ${downWidth}%">${downWidth}%  <img src="../assets/img/thumbs-down.svg" alt="thumbsDown"></span>
            </div>
        </div>
    `;

});
wrapper.innerHTML = myHTML;

