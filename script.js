const countdownDate = new Date();
countdownDate.setHours(countdownDate.getHours() + 19);

function updateTimer() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

const form = document.getElementById('contactForm');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const response = await fetch('submit_endpoint_url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const jsonResponse = await response.json();
  responseDiv.innerHTML = `<p><strong>Response:</strong> ${jsonResponse.message}</p>`;
  form.reset();
});

document.addEventListener("DOMContentLoaded", function() {
  // Select all order buttons
  const orderButtons = document.querySelectorAll(".order-button");
  
  // Add click event listener to each order button
  orderButtons.forEach(button => {
      button.addEventListener("click", function() {
          const lamp = button.closest(".lamp");
          const model = lamp.querySelector("h3").textContent;
          const price = lamp.querySelector(".price").textContent;
          alert(`You have ordered ${model} for ${price}.`);
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const orderForms = document.querySelectorAll(".order-form");

  orderForms.forEach(form => {
      form.addEventListener("submit", function(event) {
          event.preventDefault();
          const formData = new FormData(form);
          const xhr = new XMLHttpRequest();
          xhr.open("POST", form.action, true);
          xhr.onreadystatechange = function() {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status === 200) {
                      alert(xhr.responseText); // Display the server response
                  } else {
                      alert("Error: Order submission failed.");
                  }
              }
          };
          xhr.send(formData);
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const orderForms = document.querySelectorAll(".order-form");

  orderForms.forEach(form => {
      form.addEventListener("submit", function(event) {
          event.preventDefault();
          
          // Display a thank you message
          alert("Thank you for your order! Your order has been confirmed.");

          // Clear the form (optional)
          form.reset();
      });
  });
});
