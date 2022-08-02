// NavBar-SideNav
let toggle = document.getElementById('toggle')
let navbarShow = document.getElementById('navbar-list')

document.onclick = function(e){
    if(e.target.id !== 'navbarShow' && e.target.id !== 'toggle')
        {
        toggle.classList.remove('active')
        navbarShow.classList.remove('active')
    }
    }
    toggle.onclick = function(){
    toggle.classList.toggle('active')
    navbarShow.classList.toggle('active')
    }

//Cart 
let cart = document.querySelector('.cart');
let btnCart = document.querySelector('.btnCart')

btnCart.addEventListener('click', OpenCart);

function OpenCart() {
    cart.classList.toggle('hidden');
}

//Counter
const btnPlus = document.querySelector('#btnPlus')
const btnMinus = document.querySelector('#btnMinus')
const productCounter = document.querySelector('.counter')

let productCounterValue = 1;

btnPlus.addEventListener('click', productCounterPlus)
btnMinus.addEventListener('click', productCounterMinus)

function productCounterPlus() {
    // console.log(productCounterValue);
    setProductCounter(1);
}

function productCounterMinus() {
    setProductCounter(-1);
}

function setProductCounter(value){
    if ((productCounterValue + value) > 0) {
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue
    }
}

//Gallery
const gallery = document.querySelectorAll('.pic')

gallery.forEach(img => {
    img.addEventListener('click', onThumbClick)
})

function onThumbClick(){
    //clear active state for all thumbnails
    gallery.forEach(img=> {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
}