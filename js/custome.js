// Start Data Collect Section 
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const url = "https://script.google.com/macros/s/AKfycbwVrpKA--a_ZdlfD9YMHuYNBXBsFPKiIIbJl3E0NB4cYVmSXxJOUuiwC2YJcjMKR0XT/exec"; // Replace with your actual Apps Script Web App URL

  fetch("https://burmese-corner.vercel.app/upload_burmese_corner", {
    // fetch("proxy.php", {
    method: 'POST',
    body: formData
  })
  // .then(async response => {
  //   const result = await response.json()
  //   console.log(result);
    
  // })
  .then(async res => {
    const data = await res.json()
    console.log(data);
    
    if (data.status === 'success') {
      document.getElementById('responseMessage').innerText = `အော်ဒါအောင်မြင်စွာ လက်ခံရရှိပါသည်။ Your Order code is: ${data.orderCode}`;
      document.getElementById('orderForm').reset();
    } else {
      document.getElementById('responseMessage').innerText = 'Something went wrong.';
    }
  })
  .catch(error => {
    document.getElementById('responseMessage').innerText = 'Error submitting order. Please try again.';
    console.error(error);
  });
});
// End Data Collect Section

// Start Data Output Section 

function trackOrder() {
  const orderCode = document.getElementById("trackCode").value.trim();
  const url = "https://script.google.com/macros/s/AKfycbwVrpKA--a_ZdlfD9YMHuYNBXBsFPKiIIbJl3E0NB4cYVmSXxJOUuiwC2YJcjMKR0XT/exec" + "?orderCode=" + encodeURIComponent(orderCode);

  fetch(url)
  // fetch("proxy.php")
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById('trackingResult').innerText = "Order not found.";
      } else {
        document.getElementById('trackingResult').innerHTML = `
          <strong>Order Code:</strong> ${data.orderCode}<br>
          <strong>Name:</strong> ${data.name}<br>
          <strong>Phone:</strong> ${data.phone}<br>
          <strong>ItemCode:</strong> ${data.itemcode}<br>
          <strong>Size:</strong> ${data.size}<br>
          <strong>ItemCount:</strong> ${data.itemcount}<br>
          <strong>Address:</strong> ${data.address}<br>
          <strong>Ordered At:</strong> ${data.timestamp}<br>
          <strong>Status:</strong> ${data.status}<br>
        `;
      }
    })
    .catch(err => {
      document.getElementById('trackingResult').innerText = "Error checking order.";
      console.error(err);
    });
}

// End Data Output Section 