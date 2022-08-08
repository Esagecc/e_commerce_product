***Build a lightroom gallery*** 

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
}

function onHeroImgClick() {
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1){
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose)

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.product-hero');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });
            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.previous');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay); 
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay); 
        }
        overlay.classList.remove('hidden');
    }
}

function onBtnOverlayClose() {
    overlay.classList.add('hidden');
}

function onThumbClickLightbox(event){
    //clear active state for all thumbnails
    lightboxGallery.forEach(img=> {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    lightboxHero.src = event.target.src.replace('-thumbnail', '')
}


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