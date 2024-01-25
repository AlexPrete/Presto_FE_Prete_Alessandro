let MyNav = document.querySelector('#MyNav')
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



fetch('./annunci.json').then((response) => response.json()).then((data) => {

    function troncaParola(string) {
        if (string.length > 15) {
            return string.split(' ')[0] + '...';
        } else {
            return string;
        }

    }

    let favourites = [];
    // let wrapper = document.querySelector('#wrapper')
    let articleCount = document.querySelector('#articleCount');

    function showCards(array){
        articleCount.innerHTML = array.length;
        wrapper.innerHTML =''
        array.forEach((annuncio) => {
            let div = document.createElement('div');
            div.classList.add('cardTemplate', 'col-12', 'col-md-3')
            div.innerHTML = `
            <p class="text-center PCustom" title="${annuncio.name}" >${troncaParola(annuncio.name)}</p>
            <p>${annuncio.category}</p>
            <p>${annuncio.price} $</p
            // OPERATORE TERNARIO CAMBIANDO IL VALORE DEL JASON DA NUMERI A STRINGA
            <p> <i class="${favourites.includes(annuncio.id.toString())? 'fa-solid': 'fa-regular'}  fa-heart" id="${annuncio.id}"></i> </p>
            
            `;
            wrapper.appendChild(div)

        })
        let heartIcons = document.querySelectorAll('.fa-heart');
        heartIcons.forEach((icon)=>{
            icon.addEventListener('click', ()=>{
                if(!favourites.includes(icon.id)){
                    favourites.push(icon.id);
                    
                }else{
                    let index = favourites.indexOf(icon.id);
                    favourites.splice(index, 1)
                    
                }
                globalFilter();
            })

        })
    }
    showCards(data);

    let radioWrapper = document.querySelector('#radioWrapper');
    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        let uniqueCategories = [];
        categories.forEach((category) => {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category)
            }
        })
        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault"
            id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
            `
            radioWrapper.appendChild(div);
        })
    }
    radioCreate();
    let radioButtons = document.querySelectorAll('.form-check-input');
    function filterByCategory(annunci) {
        let categoria = Array.from(radioButtons).find((button)=> button.checked).id;
        if(categoria !='All' &&  categoria !='Fav'){
            let filtered = annunci.filter((annuncio) => annuncio.category == categoria);
            return filtered;
        }else if (categoria =='All'){
            return annunci;
        }else{
            let filtered = annunci.filter((annuncio) => favourites.includes( annuncio.id.toString()));
            return filtered;
        }
        

    }
    // filterByCategory('mimmo');
    radioButtons.forEach((button) => {
        button.addEventListener('click', () => {
            globalFilter();
        })

    })
    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');
    function setPriceInput(){
        let prices = data.map((annuncio)=> +annuncio.price);
        // formula sort = mi ordina l'array in numeri in ordine crescente
         prices.sort((a, b)=>a - b);   
         let maxPrice =Math.ceil( prices.pop());
         priceInput.max = maxPrice;
         priceInput.value = maxPrice;
         priceValue.innerHTML = maxPrice;

    }

    setPriceInput();

    function filterByPrice(array){
        let filtered = array.filter((annuncio)=> +annuncio.price <= priceInput.value);
        return filtered;
    }
    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = priceInput.value;
        globalFilter();
    })

    let wordInput = document.querySelector('#wordInput');
    function filterByWord(array){
        let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    }

    wordInput.addEventListener('input', ()=>{
        globalFilter();
    })

    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByCategoryAndPrice = filterByPrice(filteredByCategory);
        let filteredByCategoryAndPriceAndWord = filterByWord(filteredByCategoryAndPrice);
        showCards(filteredByCategoryAndPriceAndWord)

    
    }
    


})


