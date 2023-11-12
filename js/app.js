const loadPhone = (searchText , dataLimed) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayPhone(data.data , dataLimed))
}

const displayPhone = (phones , dataLimed) =>{
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    // display Only 10 than Show all btn
    const showAll = document.getElementById('show-all')
    if(dataLimed && phones.length > 10){
        phones =phones.slice(0,10)
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    
    // Not Found Code
    const noPhone  =  document.getElementById('not-found');
    if(phones.length === 0){
       noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none');
    }



    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img class="p-4" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    loaderFun(false);
}

const processSearch = (dataLimed) =>{
    loaderFun(true);
    const inputSearch = document.getElementById('input-search');
    const textSearch  = inputSearch.value;
    loadPhone(textSearch , dataLimed);
    inputSearch.value = '';

}

document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
    // inputSearch.value = '';
})

document.getElementById('input-search').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const loaderFun = (loaderShow) =>{
    const loaderSec = document.getElementById('loader');
    if(loaderShow === true){
        loaderSec.classList.remove('d-none')
    }
    else if(loaderShow === false){
        loaderSec.classList.add('d-none') 
    }
}

document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (phone) =>{

}

loadPhone('i');