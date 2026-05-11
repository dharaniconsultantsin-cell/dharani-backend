async function loadDashboard() {

  try {

    const res = await fetch(
      "https://dharani-backend-204h.onrender.com/api/forms"
    );

    const data = await res.json();

    const totalForms = document.getElementById("totalForms");

    if (totalForms) {
      totalForms.innerText = data.length;
    }

    const activity = document.getElementById("activityList");

    if (activity) {

      activity.innerHTML = "";

      data.slice(0, 5).forEach(item => {

        activity.innerHTML += `
          <div class="activityItem">
            <strong>${item.type}</strong><br>
            ${item.name || item.email || "New Submission"}
          </div>
        `;

      });

    }

  } catch (err) {

    console.log(err);

  }

}

loadDashboard();

/* CHART */

const ctx = document.getElementById("myChart");

if (ctx) {

  new Chart(ctx, {

    type: "line",

    data: {

      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

      datasets: [{

        label: "Enquiries",

        data: [12, 19, 8, 15, 22, 30, 25],

        borderColor: "#ffd700",

        backgroundColor: "rgba(255,215,0,.2)",

        tension: .4,

        fill: true

      }]

    },

    options: {

      responsive: true,

      plugins: {

        legend: {

          labels: {

            color: "white"

          }

        }

      },

      scales: {

        x: {

          ticks: {

            color: "white"

          }

        },

        y: {

          ticks: {

            color: "white"

          }

        }

      }

    }

  });

}

/* CONTACT FORM */

async function submitForm(e) {

  e.preventDefault();

  const formData = {

    type: "contact",

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    phone: document.getElementById("phone").value,

    serviceType: document.getElementById("service").value,

    message: document.getElementById("message").value

  };

  try {

    const response = await fetch(
      "https://dharani-backend-204h.onrender.com/api/forms/contact",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(formData)

      }
    );

    const data = await response.json();

    console.log(data);

    alert("Submitted Successfully");

  } catch (err) {

    console.log(err);

    alert("Submission Failed");

  }

}