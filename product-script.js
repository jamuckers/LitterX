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
    document.querySelector("#store-title").innerText = "CHECK OUT HERE->";
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

