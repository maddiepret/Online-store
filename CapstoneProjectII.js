//make sure js loads
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready()
}

//loop through list in row of button
function ready() {
    let total = 0
    let removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem); //function below
    }

    //Remove item from shopping cart
    function removeCartItem(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal(); // in next function made
        //function can remove items, not updating total
    }

    //update total of cart when removing items
    function updateCartTotal() {
        let cartItemContainer = document.getElementsByClassName('cart-items')[0];
        let cartRows = cartItemContainer.getElementsByClassName('cart-row');
        let subTotal = 0;
        for (let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i];
            let priceElement = cartRow.getElementsByClassName('cart-price')[0];
            let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            let price = parseFloat(priceElement.innerText.replace('R', ''));
            let quantity = quantityElement.value;
            subTotal = subTotal + (price * quantity) //create subtotal for items
        }
        subTotal = Math.round(subTotal * 100) / 100;
        alert("Your new total is: R " + subTotal);
        document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + subTotal.toFixed(2);

        let total = 0; //create var total
        let coupon = subTotal * .10; //get 10% discount from coupon
        document.getElementsByClassName('coupon-total-price')[0].innerText = 'R' + coupon.toFixed(2);
        let vat = subTotal * 0.15 //get vat on items
        document.getElementsByClassName('vat-total-price')[0].innerText = 'R' + vat.toFixed(2);

        //shipping
        let shippingTotal = parseFloat(document.getElementById("choiceLabel").innerText.replace('R', ''));
        console.log(shippingTotal);

        total = subTotal + vat + shippingTotal - coupon; //set total
        document.getElementsByClassName('cartFinal-total-price')[0].innerText = 'R' + total.toFixed(2);
    }

    // Add delivery calculation
    var radios = document.getElementsByName('choice');
    for (var i = 0; i < radios.length; i++) {
        radios[i].onclick = function() {

            let deliveryPrice = parseFloat(this.value).toFixed(2);
            document.getElementById('choiceLabel').innerText = "R " + deliveryPrice;
            document.getElementsByClassName('shipping-total-price')[0].innerText = "R " + deliveryPrice;
            updateCartTotal();

        }
    }

    //create loop that loops through the quantity input
    let quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('click', quantityChanged);
        //console.log(input);
    }

    //create function that will not allow user to input negative numbers in quantity input
    function quantityChanged(event) {
        let input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
    }

    //add to cart button function
    //loop through elements when clicked on add to chart
    let addToCartButton = document.getElementsByClassName("btn-primary"); //btn-primary = add to cart/buy now
    for (let i = 0; i < addToCartButton.length; i++) {
        let button = addToCartButton[i] // loop through to get each item indivdualy
        button.addEventListener("click", addToChartClicked); // add eventlistener to look for clicks and execute funstion (below)
    }

    // create function for add to cart
    function addToChartClicked() {
        let button = event.target;
        let shopItem = button.parentElement.parentElement;
        let title = shopItem.getElementsByClassName("text")[0].innerText;
        let price = shopItem.getElementsByClassName("price")[0].innerText;
        let imageSrc = shopItem.getElementsByClassName("imagesOfProducts")[0].src;
        addItemToCart(title, price, imageSrc);
        updateCartTotal();
    }

    function addItemToCart(title, price, imageSrc) {
        let cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        let cartItems = document.getElementsByClassName('cart-items')[0];
        let cartItemNames = cartItems.getElementsByClassName("text");
        for (let i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert("You already added this item to your cart");
                return;
            }
        }
        let cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContent;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
    }

}
//generate order number
function orderNumber() {
    let now = Date.now().toString();
    // pad with extra random digit
    now += now + Math.floor(Math.random() * 10);
    // format
    alert("Thank you for shopping with us \n Your order number is: " + [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-'));
}