let MyNav = document.querySelector('#MyNav')
let numero1 = document.querySelector('#numero1')
let numero2 = document.querySelector('#numero2')
let numero3 = document.querySelector('#numero3')

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    // MyNav.classList.remove('MyBg-primary')
    // MyNav.classList.add('MyBg-secondary')
    MyNav.classList.add('floatingNavbar')
  } else {
    MyNav.classList.add('MyBg-primary')
    // MyNav.classList.remove('MyBg-secondary')
    MyNav.classList.remove('floatingNavbar')
  }
})

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});





let reviews = [
  {
    id: 1,
    name: "Nome1",
    job: "web developer",
    img:
      "./media/Nome1.webp",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis atque neque aut laudantium illo incidunt error aliquam eius minima amet. Ad beatae, culpa obcaecati quam cupiditate similique consequatur! Inventore, et."
  },
  {
    id: 2,
    name: "Esempio",
    job: "web designer",
    img:
      "./media/poretti.jpg",
    text:
      "ALorem ipsum dolor sit amet consectetur adipisicing elit. Debitis atque neque aut laudantium illo incidunt error aliquam eius minima amet. Ad beatae, culpa obcaecati quam cupiditate similique consequatur! Inventore, et."
  },
  {
    id: 3,
    name: "Cognomone",
    job: "programmatore",
    img:
      "./media/storti.jpg",
    text:
      "BLorem ipsum dolor sit amet consectetur adipisicing elit. Debitis atque neque aut laudantium illo incidunt error aliquam eius minima amet. Ad beatae, culpa obcaecati quam cupiditate similique consequatur! Inventore, et."
  },
  {
    id: 4,
    name: "Nomone",
    job: "general manager",
    img:
      "",
    text:
      "CLorem ipsum dolor sit amet consectetur adipisicing elit. Debitis atque neque aut laudantium illo incidunt error aliquam eius minima amet. Ad beatae, culpa obcaecati quam cupiditate similique consequatur! Inventore, et."
  }
];

let img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentItem = 0;

// load initial item
window.addEventListener("DOMContentLoaded", () => {
  let item = reviews[currentItem];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
});

// show person based on item
function showPerson(person) {
  let item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

// show next person
nextBtn.addEventListener("click", () => {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});

// show prev person
prevBtn.addEventListener("click", () => {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});



function createInterval(n, element, time){
  let counter = 0;
  let interval = setInterval(()=>{
    if (counter < n){
      counter++;
      
      element.innerHTML = counter;
    }else{
      clearInterval(interval);
    }
  },time)
  

}
let confirm = true;
let observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting && confirm){
      createInterval(500, numero1, 10);
      createInterval(300, numero2, 15);
      createInterval(20, numero3, 650);
      confirm = false
      setTimeout(()=>{
        confirm = true;
      }, 5000)
     
    }
  })
  
});
 observer.observe(numero1);



// let numero = 0;
// let interval = setInterval(()=>{
//  if (numero < 10){
//   numero++;
//  } else {
//   console.log('mi sono fermato');
//  }
// }, 2000)

