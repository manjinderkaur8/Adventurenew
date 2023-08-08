// responsive header //

$(document).ready(function () {
  $(".ph-list").click(function () {
    $(this).toggleClass("ph-list ph-x");
    $(".header2").toggleClass("show");
  });
});

//form input passanger and class//

let selectedOption = "";
let passengerValue = 0;
let classValue = "a";

function toggleOptions() {
  const dropdown = document.querySelector(".dropdown");
  dropdown.classList.toggle("appear");
}

function selectOption(option) {
  selectedOption = option;
}

function updateTravelClass() {
  passengerValue =
    parseInt(document.getElementById("passengerValue").value, 10) || 0;
  classValue = document.getElementById("classValue").value;
  document.getElementById(
    "travelClass"
  ).value = `Passenger: ${passengerValue}, Class: ${classValue}`;
}

window.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".dropdown");
  const target = event.target;
  if (dropdown.classList.contains("appear") && !dropdown.contains(target)) {
    dropdown.classList.remove("appear");
  }
});

window.onload = function () {
  // Clear input fields on refresh
  passengerValue = 0;
  classValue = "a";
  document.getElementById("passengerValue").value = passengerValue;
  document.getElementById("classValue").value = classValue;
  document.getElementById("travelClass").value = "";
};

//swiper //

var swiper = new Swiper(".mySwiper", {
  speed: 600,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});


// setInterval(function() { ObserveInputValue($('#fromCity').val()); }, 100);


var sendMail = () => {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var telnumber = document.getElementById('telnumber').value;
  var query = document.getElementById('query').value;

  if (name.trim() === '' || email.trim() === '' || telnumber.trim() === '' || query.trim() === '') {
    alert('Please fill in all the required fields.');
    return;
  }

  const body = `Name of User is: ${name}, Email of user is: ${email}, Phone Number is: ${telnumber}, and query is: ${query}`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "Support@adventuresallies.com",
    Password: "F5BD1E85BBAD5E0E0F52EB4A06093E9770AB",
    From: "Support@adventuresallies.com",
    To: "Support@adventuresallies.com",
    Subject: "New Query Occurred !!",
    Body: body
  }).then(
    function (message) {
      alert('Email sent successfully.');
    }
  ).catch(
    function (error) {
      alert('Error sending email. Please try again later.');
      console.log(error);
    }
  );

  // Assuming 'fromCity', 'toCity', 'dateFrom', 'dateTo', and 'travelClass' are available
  sendRequest(fromCity, toCity, dateFrom, dateTo, travelClass);
}

sendRequest = (fromCity, toCity, dateFrom, dateTo, travelClass) => {
  // Replace 'key' with your actual API key
  const apiKey = 'iTrn-p6BQN7ru9whsXaTUFby8wLILmvq';

  fetch(`https://api.tequila.kiwi.com/v2/search?fly_from=${fromCity}&fly_to=${toCity}&date_from=${dateFrom}&date_to=${dateTo}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
  })
  .then(response => response.json())
  .then(response => {
    sessionStorage.setItem('flightData', JSON.stringify(response));
    window.location.href = 'flights.html';
  })
  .catch(err => console.error(err));
}
