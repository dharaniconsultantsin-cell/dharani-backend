if (page === "service") {
  content.innerHTML = `
    <h2>Service Request</h2>
    <input id="serviceType" placeholder="Service Type"><br><br>
    <input id="details" placeholder="Details"><br><br>
    <button onclick="submitService()">Submit</button>
    <p id="msg"></p>
  `;
}