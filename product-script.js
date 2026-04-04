let totalCartPrice = 0;
// 1. Create a storage for quantities: { index: quantity }
let cartQuantities = {}; 

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    let output = "";
    products.forEach((item, index) => {
      // Initialize quantity to 0 for every product
      cartQuantities[index] = 0; 

      output += `
        <div class="product-card">
          <img src="${item.image}" class="product-image" width="500" height="500" alt="${item.title}">
          <p class="title">${item.title}</p>
          <p class="description">${item.description}</p>
          <p class="price"><span>$${item.price}</span></p>
          
          <div class="controls">
            <button type="button" class="adjust-btn" data-action="minus" data-index="${index}" data-price="${item.price}">-</button>
            <span id="qty-${index}" style="font-weight:bold; margin: 0 10px;">0</span>
            <button type="button" class="adjust-btn" data-action="plus" data-index="${index}" data-price="${item.price}">+</button>
          </div>
          <p style="font-size: 0.8em; color: gray;">Total orders for this item: <span id="tally-${index}">0</span></p>
        </div>`;
    });

    document.querySelector(".products").innerHTML = output;
    document.querySelector("#store-title").innerText = "WELCOME TO GARBAGE GIFTS GALORE! BLA";
  });

// 2. Updated Event Listener for "+" and "-"
document.querySelector(".products").addEventListener("click", (e) => {
  if (e.target.classList.contains("adjust-btn")) {
    const btn = e.target;
    const index = btn.getAttribute("data-index");
    const action = btn.getAttribute("data-action");
    const price = parseFloat(btn.getAttribute("data-price"));
    const successModal = document.querySelector("#success-modal");

    if (action === "plus") {
      cartQuantities[index]++;
      totalCartPrice += price;
    } else if (action === "minus" && cartQuantities[index] > 0) {
      cartQuantities[index]--;
      totalCartPrice -= price;
    }

    // 3. Update the UI for this specific product
    document.querySelector(`#qty-${index}`).innerText = cartQuantities[index];
    document.querySelector(`#tally-${index}`).innerText = cartQuantities[index];

    //Update the Checkout Total
    document.querySelector('#cart-total-nav').innerText = totalCartPrice.toFixed(2);



    console.log("Total Cart: €" + totalCartPrice.toFixed(2));
  }
});


const modal = document.querySelector("#checkout-modal");
const openBtn = document.querySelector("#open-checkout");
const closeBtn = document.querySelector(".close-btn");
const finalTotalSpan = document.querySelector("#final-total");

// OPEN MODAL
openBtn.addEventListener("click", () => {
    // Inject the current totalCartPrice into the modal
    finalTotalSpan.innerText = totalCartPrice.toFixed(2);
    modal.style.display = "block";
});

// CLOSE MODAL (X button)
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// CLOSE MODAL (Clicking outside the box)
// window.addEventListener("click", (e) => {
//     if (e.target === modal) {
//         modal.style.display = "none";
//     }
//});

// MOCK PAYMENT ACTION
document.querySelector("#confirm-pay").addEventListener("click", () => {
    const email = document.querySelector("#checkout-email").value;
    const name = document.querySelector("#checkout-CCName").value;
    const num = document.querySelector("#checkout-CCNum").value;
    const cvc = document.querySelector("#checkout-CVC").value;

    if (email && name && num && cvc) {
        // 1. Show the standard browser alert
        // The code PAUSES here until the user clicks "OK"
        alert(`Success! Your "Garbage Gift" is on its way! Receipt sent to ${email}. Total charged: €${totalCartPrice.toFixed(2)}`);

        // 2. Hide the checkout form modal now that they've seen the alert
        modal.style.display = "none";

        // 3. Show the new GIF modal
        const gifModal = document.querySelector("#gif-modal");
        gifModal.style.display = "block";

        // 4. Wait 3-4 seconds for them to enjoy the GIF, then reload
        setTimeout(() => {
            totalCartPrice = 0;
            location.reload();
        }, 4000);

    } else {
        alert("Please fill in all credit card details.");
    }




    // if (email) {
    //     alert(`Success! Receipt sent to ${email}. Total charged: €${totalCartPrice.toFixed(2)}`);
    //     modal.style.display = "none";
    //     // Optional: reset cart here
    // } else {
    //     alert("Please enter a valid email.");
    // }

    //     const CCName = document.querySelector("#checkout-CCName").value;
    // if (CCName) {
    //     alert(`Success! Receipt sent to ${email}. Total charged: €${totalCartPrice.toFixed(2)}`);
    //     modal.style.display = "none";
    //     // Optional: reset cart here
    // } else {
    //     alert("CC Information Incorrect");
    // }

    //     const CCNum= document.querySelector("#checkout-CCNum").value;
    // if (CCNum) {
    //     alert(`Success! Receipt sent to ${email}. Total charged: €${totalCartPrice.toFixed(2)}`);
    //     modal.style.display = "none";
    //     // Optional: reset cart here
    // } else {
    //     alert("CC Information Incorrect");
    // }

    //     const CVC= document.querySelector("#checkout-CVC").value;
    // if (CVC) {
    //     alert(`Success! Receipt sent to ${email}. Total charged: €${totalCartPrice.toFixed(2)}`);
    //     modal.style.display = "none";
    //     // Optional: reset cart here
    // } else {
    //     alert("CC Information Incorrect");
    // }


});

