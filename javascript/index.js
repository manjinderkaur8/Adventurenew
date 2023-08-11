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

const key = "iTrn-p6BQN7ru9whsXaTUFby8wLILmvq";

const getFlights = (event) => {
  event.preventDefault();
  const loading = document.getElementById('loading');
  loading.style.display = 'flex';
  const fromCity = document.getElementById("fromCity").value;
  const toCity = document.getElementById("toCity").value;
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;
  const travelClass = document.getElementById("travelClass").value;

  if (fromCity !== "" && toCity !== "" && dateFrom !== "" && dateTo !== "") {
    sendRequest(fromCity, toCity, dateFrom, dateTo, travelClass);
  }
};

var sendMail = () => {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var telnumber = document.getElementById("telnumber").value;
  var query = document.getElementById("query").value;

  if (
    name.trim() === "" ||
    email.trim() === "" ||
    telnumber.trim() === "" ||
    query.trim() === ""
  ) {
    alert("Please fill in all the required fields.");
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
    Body: body,
  })
    .then(function (message) {
      alert("Email sent successfully.");
    })
    .catch(function (error) {
      alert("Error sending email. Please try again later.");
      console.log(error);
    });
};

sendRequest = (fromCity, toCity, dateFrom, dateTo, travelClass) => {
  fetch(
    `https://api.tequila.kiwi.com/v2/search?fly_from=${fromCity}&fly_to=${toCity}&date_from=${dateFrom}&date_to=${dateTo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      sessionStorage.setItem("flightData", JSON.stringify(response));
      window.location.href = "flights.html";
    })
    .catch((err) => console.error(err));
};
// Function to fetch airport locations from Tequila Kiwi API
async function fetchAirportLocations(query, dropdownId) {
  const response = await fetch(
    `https://tequila-api.kiwi.com/locations/query?term=${query}`,
    {
      headers: {
        apikey: key,
      },
    }
  );

  const data = await response.json();
  const dropdown = document.getElementById(dropdownId);

  // Clear existing suggestions
  dropdown.innerHTML = "";

  // Add location suggestions to the dropdown
  data.locations.forEach((location) => {
    const listItem = document.createElement("li");
    listItem.textContent = location.name;
    listItem.onclick = () => {
      document.getElementById(dropdownId.replace("Dropdown", "")).value = location.name;
      dropdown.innerHTML = "";
    };
    dropdown.appendChild(listItem);
  });
}

// Event listeners for "From" and "To" input fields
document.getElementById("fromCity").addEventListener("input", function () {
  const query = this.value.trim();
  if (query !== "") {
    fetchAirportLocations(query, "fromCityDropdown");
  }
});

document.getElementById("toCity").addEventListener("input", function () {
  const query = this.value.trim();
  if (query !== "") {
    fetchAirportLocations(query, "toCityDropdown");
  }
});
