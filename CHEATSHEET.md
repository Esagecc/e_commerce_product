***HOW TO BUILD A LIGHTROOM GALLERY AND OVERLAY*** 

--in HTML--
have a section will main image, arrows and seperate div of thumb gallery 
<section class="lightbox">
    <img class="product-hero" src="images/image-product-1.jpg" alt="">
    <div class="previous arrow">
      <img src="images/icon-previous.svg" alt="icon previous">
    </div>
    <div class="next arrow">
      <img src="images/icon-next.svg" alt="icon next">
    </div>
    <div class="thumb-gallery">
      <div class="pic active">
        <img src="/images/image-product-1-thumbnail.jpg" alt="thumb-1">
      </div>
      <div class="pic">
        <img src="/images/image-product-2-thumbnail.jpg" alt="thumb-2">
      </div>
      <div class="pic">
        <img src="/images/image-product-3-thumbnail.jpg" alt="thumb-3">
      </div>
      <div class="pic">
        <img src="/images/image-product-4-thumbnail.jpg" alt="thumb-4">
      </div>
    </div>
  </section>

--in CSS--

***in mobile site, the thumb gallery it is hidden***
.thumb-gallery {
  display: none;
}

***in desktopview, the following codes are added at the @media (min-width:900px)***
.lightbox {
    width:72%; ***it is set the amount of space within section***
  }

  .product-hero {
    border-radius: 15px;
  }

  .previous, .next {
    display: none; ***hidden the arrows***
  }

  .thumb-gallery {
    display: flex; ***make row of thumbgallery pics***
    align-items: center;
    justify-content: space-between;***spaces between pictures***
    margin-top: 1.5rem;
  }

  .pic { ***editing the pictures in the thumbgallery***
    width: 20%; 
    height: 90px;
    overflow: hidden;
    border-radius: 0.8rem;
  }
  
  .pic img {
    width: 100%;
  }

  .pic img:hover { ***when mouse is hovering over***
    opacity: 0.75;
  }

  .pic.active { ***when pictures are set in hero image***
    border: 2px solid var(--orange);
    opacity: 0.5;
  }

  .pic img.active { ***when image is set in hero image***
    opacity: 0.5;
  }
  
  ***JavaScript section.***

  //Gallery
const gallery = document.querySelectorAll('.pic') ***all pics in thumb gallery ***
const heroImg = document.querySelector('.product-hero')***main picture***
const btnNext = document.querySelector('.next')***right arrow***
const btnPrevious = document.querySelector('.previous')***left arrow***
const overlay = document.querySelector('.overlay');***dark shadow***
const lightbox = document.querySelector('.lightbox')***section div***

let lightboxGallery;
let lightboxHero;

btnNext.addEventListener('click', handleBtnClickNext) ***when clickin right arrow***
btnPrevious.addEventListener('click', handleBtnClickPrevious)***when clickin left arrow***
heroImg.addEventListener('click', onHeroImgClick)***when clickin larger image***

gallery.forEach(img => { ***for each pic in thumb gallery this is the action***
    img.addEventListener('click', onThumbClick)
});

function onThumbClick(event){
    //clear active state for all thumbnails
    gallery.forEach(img=> {
        img.classList.remove('active'); ***to remove opacity from img which is set style.css***
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    ***to add opacity to img which is set style.css***
    //update hero image 
    heroImg.src = event.target.src.replace('-thumbnail', '')
    ***to replace the pictures address from thumbanil with large images***
}

function handleBtnClickNext(){
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
***imageIndex is a function. It would increase index if under 4. ***
}

function handleBtnClickPrevious(){
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
    ***imageIndex is a function. It would decrease index if under 4. ***
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex; 
    ***replace image product with jpg main pic***
}

function setHeroImage(imageIndex) {
    heroImg.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    gallery[imageIndex-1].classList.add('active');
    ***change image product number to the next index***

}

function onHeroImgClick() {
    if (window.innerWidth >= 1440) ***for desktopview***
        if (overlay.childElementCount == 1){
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);
            ***to indicate only one overlay can be shown***

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose)
***section for the button to close the overlay****

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.product-hero');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });
***how the thumbnail gallery would work to replace the main picture***
            
            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.previous');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay); 
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay); 
***to move next or previous pictures within the overlay***
        }
        overlay.classList.remove('hidden'); 
    }
    ***then can show the black overlay***
}

function onBtnOverlayClose() {
    overlay.classList.add('hidden');
}
***the function to close the overlay***


function onThumbClickLightbox(event){
    //clear active state for all thumbnails
    lightboxGallery.forEach(img=> {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    lightboxHero.src = event.target.src.replace('-thumbnail', '')
}***same steps as in main page as in overlay***


function handleBtnClickNextOverlay(){
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

function handleBtnClickPreviousOverlay(){
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}
***same steps as in main page as in overlay***


function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    lightboxGallery[imageIndex-1].classList.add('active');
}


***HOW TO BUILD A CART***

<!--IN HTML-->
<div class="cart-sec btnCart">
    <img src="images/icon-cart.svg" alt="">
      <p class="cart-count hidden">
       3
      </p>
</div>

<div class="cart hidden">
    <div class="cart-header">Cart</div>
    <div class="products-in-cart">
      <!-- <div class="item">
        <img class="product-img" src="imagimage-product-1-thumbnail.jpg" alt="produone">
        <div class="details">
          <div class="product-name">
            Autumn Limited Edition...
          </div>
          <div class="price-group">
            <div class="price">
              $125.00
             </div> x
            <div class="count">
              3
            </div>
            <div class="total-amount">
              $375.00
            </div>
          </div>
        </div>
        <img src="images/icon-delete.svid="btnDelete" alt="icon delete
      </div> -->
    </div>
                
    <div class="msg-empty">
        Your cart is empty.
    </div>
    <div class="checkout hidden">
        Checkout
    </div>
</div>


<!--IN CSS ON DESKTOP VIEW-->

.right {
    display: flex;
}

.cart-sec {
    cursor: pointer;
    position: relative;
}

.cart-sec img {
    filter: contrast(4);
}
.cart-sec p {
    position: absolute;
    top: -25%;
    right: -32%;
    background-color: var(--orange);
    color: var(--white);
    font-size: 0.6rem;
    font-weight: 700;
    padding: 0.1rem 0.4rem;
    border-radius: 1rem;
}

.amount {
  background-color: var(--lt-gray-blue);
  display: flex;
  margin: 20px 0;
  padding: 20px 30px;
  justify-content: space-between;
  align-items:baseline;
  border-radius: 10px;
}

.amount p {
    color: black;
    font-weight: 700;
}

#btnPlus, #btnMinus {
  cursor: pointer;
}

button {
  width: 100%;
  background-color: var(--orange);
  color: var(--white);
  font-size: 18px;
  font-weight: 700;
  border: none;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
}

.cart-white {
    filter:brightness(5);
    padding-right: 20px;
}

.cart {
    position: absolute;
    top: calc(calc(100%) + 1rem);
    right: -1rem;
    width: 22.75rem;
    z-index: 5;
    background-color: var(--white);
    border-radius: 0.7rem;
}

.cart-header {
    border-bottom: 1px solid var(--gray-blue);
    padding: 1.5rem 1.75rem;
    font-size: 1rem;
    font-weight: 700;
}

.item {
    margin: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-img {
    width: 3rem;
    border-radius: 0.5rem;
}

.details {
    color: var(--dk-gray-blue);
    font-size: 1;
}

.price-group {
    display: flex;
    gap: 0.5rem;
}

.total-amount {
    font-weight: 700;
    color: black;
}

#btnDelete {
    padding: 0.5rem;
    border-radius: 0.5rem;
}

#btnDelete:hover {
    cursor: pointer;
    background-color: var(--lt-orange);
}

.msg-empty {
    color: var(--dk-gray-blue);
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    padding: 4.8rem 0;
}

.checkout {
    background-color: var(--orange);
    color: var(--white);
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    margin: 1.5rem;
    padding: 1.1rem;
    border-radius: 0.7rem;
    cursor: pointer;
}

.hidden {
    display: none;
}

<!--JAVASCRIPT SECTION-->

//Numerical Variables
let productCounterValue = 1;
let productsInCart = 0;
let price = 250.0;
let discount = 0.5;


let cart = document.querySelector('.cart'); ***div with hidden cart section***
let btnCart = document.querySelector('.btnCart')***div with cart icon***
const btnAddToCard = document.querySelector('button');***button to add to cart***
const cartCount = document.querySelector('.cart-count');***number on top of cart symbol***
const productInShoppingCart = document.querySelector('.products-in-cart');***div w/i cart carc that shows whats in the cart***
const msgEmpty = document.querySelector('.msg-empty');***div saying empty cart***
const checkout = document.querySelector('.checkout');***button in cart to checkout***


btnCart.addEventListener('click', OpenCart);***when symbol cart is click***
btnAddToCard.addEventListener('click', addToCart);***when add to cart button is click***

function OpenCart() { ***cart will show or hide***
    cart.classList.toggle('hidden');
}

function addToCart() {***when the add to cart button is click...***

***the productsInCart is 0, and it will add what productCounterValue shows(which setProductCounter function gives)***
    productsInCart += productCounterValue; 

***the message would be added to cart card on top***
    const productHTMLElement = `
    <div class="item">
                  <img class="product-img" src="images/image-product-1-thumbnail.jpg" alt="product one">
                  <div class="details">
                    <div class="product-name">
                      Autumn Limited Edition...
                    </div>
                    <div class="price-group">
                      <div class="price">
                        $${(price*discount).toFixed(2)}
                      </div> x
                      <div class="count">
                        ${productsInCart}
                      </div>
                      <div class="total-amount">
                        $${(price*discount*productsInCart).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <img src="images/icon-delete.svg" id="btnDelete" alt="icon delete">

                </div>
`;

***div in the card that the other functions would use with innerHTML***
    productInShoppingCart.innerHTML = productHTMLElement;


***function that the cart number with delete button and click action***
    updateCart();
    const btnDelete = document.querySelector('#btnDelete');***trash icon...***
    btnDelete.addEventListener('click', onBtnDeleteClick);***...when click the action it takes***
}

***function that the cart number three additional functions***
function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}


function updateCartIcon(){

***first it would match the cart symbol's # with number in the card. If it is 0, then hide the div item and the cart symbol's #*** 
    cartCount.textContent = productsInCart;
    if (productsInCart == 0) {
        if (!cartCount.classList.contains('hidden')){
            cartCount.classList.add('hidden');
        }
    } else {
***otherwise continue showing the card and number***
        cartCount.classList.remove('hidden');
}
}

function updateMsgEmpty() {
***the empty message would show if the counter is 0***
    if (productsInCart == 0){
        if (msgEmpty.classList.contains('hidden')){
         msgEmpty.classList.remove('hidden');   
        }        
    } else {
        if (!msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.add('hidden');
        }
    }
}

function updateCheckoutButton() {
***The checkout button would show if the counter is not 0***
    if (productsInCart == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        } else {
            checkout.classList.remove('hidden');
        }
    }
}

function onBtnDeleteClick() {
***when trash icon is click, it would decrease one by one and update cart***
    productsInCart--;
    updateCart();

    const el = document.querySelector('.count'); ***card # of product***
    const totalAmount = document.querySelector('.total-amount'); ***total to pay***
    el.innerHTML = productsInCart; ***text of # of product***
    totalAmount.innerHTML = `$${(price*discount*productsInCart).toFixed(2)}`; ***text of what to pay***
***if it is 0, then no text***
    if (productsInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}


//Counter
const btnPlus = document.querySelector('#btnPlus')***counter's plus button***
const btnMinus = document.querySelector('#btnMinus')***counter's minus button***
const productCounter = document.querySelector('.counter')***number display in the counter button***


btnPlus.addEventListener('click', productCounterPlus)***when plus button clicked***
btnMinus.addEventListener('click', productCounterMinus)***when minus button clicked***

function productCounterPlus() {
***when plus button clicked it would add one to counter. tip: add console.log to make sure it is working***
    setProductCounter(1);
}

function productCounterMinus() {
***when minus button clicked it would decrease one to counter. tip: add console.log to make sure it is working***
    setProductCounter(-1);
}

function setProductCounter(value){
***function that determine the amount of product for card and cart's symbol***
    if ((productCounterValue + value) > 0) {
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue;
    }
}
