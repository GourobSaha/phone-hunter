const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)
}

const displayPhone = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //display 21 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //no result found display
    const noResult = document.getElementById('no-result-message')
    if (phones.length === 0) {
        noResult.classList.remove('d-none');
    }
    else {
        noResult.classList.add('d-none');
    }
    //display searched phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4 rounded-4 border-0 shadow p-3 mb-5 bg-body rounded">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false)
}

const searchProcess = dataLimit => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProcess(9);
    }
});

document.getElementById('btn-search').addEventListener('click', function () {
    searchProcess(9)
})

const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('loader');
    if (isLoading) {
        loadingSection.classList.remove('d-none');
    }
    else {
        loadingSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess()
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}

// loadPhone();