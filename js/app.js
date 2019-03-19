/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Requests
By: Patrick  Leroux
Treehouse profile name: patleroux 
******************************************/
const cardGallery = document.querySelector('.gallery');
const maxCard = 12;
const url = 'https://randomuser.me/api/?nat=us,gb&results=' + maxCard;
const container = document.querySelector('.container');

let allEmployees;
let closeButton;


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Error ', error));
}

Promise.all([
        fetchData(url)
    ])
    .then(data => {
        buildGallery(data[0].results);
    });

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

/**************************************************************************************/
/* Function: openModal
/*
/* Builde "on-the-fly" the HTML and data of an modal.
/**************************************************************************************/
function openModal(employee) {
    // Modal Container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    // Modal
    const modal = document.createElement('div');
    modal.className = 'modal';

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close-btn';
    closeButton.id = 'modalCloseBtn';
    closeButton.innerText = 'X';

    // Modal Information Container
    const modalInfoContainer = document.createElement('div');
    modalInfoContainer.className = 'modal-info-container';

    // Modal Information: Image
    const modalImg = document.createElement('img');
    const img = employee.picture.large;
    modalImg.className = 'modal-img';
    modalImg.src = img;
    modalImg.alt = 'profile picture';
    modalInfoContainer.appendChild(modalImg);

    // Modal Information: Name
    const nameH3 = document.createElement('h3');
    nameH3.className = 'modal-name cap';
    nameH3.innerText = employee.name.first + ' ' + employee.name.last;;
    modalInfoContainer.appendChild(nameH3);

    // Modal Information: eMail
    const eMailP = document.createElement('p');
    eMailP.className = 'modal-text';
    eMailP.innerText = employee.email;
    modalInfoContainer.appendChild(eMailP);

    // Modal Information: Location
    const locationP = document.createElement('p');
    locationP.className = 'modal-text cap';
    locationP.innerText = employee.location.city;
    modalInfoContainer.appendChild(locationP);

    // Modal Information: hr
    const hr = document.createElement('hr');
    modalInfoContainer.appendChild(hr);

    // Modal Information: Phone   
    const phone = document.createElement('p');
    phone.className = 'modal-text';
    phone.innerText = employee.cell;
    modalInfoContainer.appendChild(phone);

    // Modal Information: Adresse
    const addr = document.createElement('p');
    addr.className = 'modal-text';
    addr.innerText = employee.location.street + ' ' + employee.location.state + ' ' + employee.location.postcode;
    modalInfoContainer.appendChild(addr);

    // Modal Information: Birthday
    const birthday = document.createElement('p');
    birthday.className = 'modal-text';
    const date = employee.dob.date;
    const day = date.substr(8, 2);
    const month = date.substr(5, 2);
    const year = date.substr(2, 2);
    birthday.innerText = 'Birthday: ' + day + '/' + month + '/' + year;
    modalInfoContainer.appendChild(birthday);


    // Build Modal
    modal.appendChild(closeButton);
    modal.appendChild(modalInfoContainer);
    modalContainer.appendChild(modal);
    container.appendChild(modalContainer);

    modalContainer.style.display = 'block';

}



/**************************************************************************************/
/* Function: buildGallery
/*
/* Builde "on-the-fly" the HTML and data of the Gallery section
/**************************************************************************************/
function buildGallery(allEmployees) {
    for (let i = 0; i < maxCard; i++) {
        const name = allEmployees[i].name.first + ' ' + allEmployees[i].name.last;
        const eMail = allEmployees[i].email;
        const location = allEmployees[i].location.city;
        const img = allEmployees[i].picture.large;

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.id = i;

        const cardImgContainer = document.createElement('div');
        cardImgContainer.clasName = 'card-img-container';

        const cardInfoContainer = document.createElement('div');
        cardInfoContainer.className = ('card-info-container');

        const cardImg = document.createElement('img');
        cardImg.className = 'card-img';
        cardImg.src = img;
        cardImg.alt = 'profile picture';

        const nameH3 = document.createElement('h3');
        nameH3.className = 'card-name';
        nameH3.innerText = name;
        cardInfoContainer.appendChild(nameH3);

        const eMailP = document.createElement('p');
        eMailP.className = 'card-text';
        eMailP.innerText = eMail;
        cardInfoContainer.appendChild(eMailP);

        const locationP = document.createElement('p');
        locationP.className = 'card-text cap';
        locationP.innerText = location;
        cardInfoContainer.appendChild(locationP);

        cardImgContainer.appendChild(cardImg);
        cardDiv.appendChild(cardImgContainer);
        cardDiv.appendChild(cardInfoContainer);

        cardGallery.appendChild(cardDiv);
    }
    setupModal(allEmployees);
}

function setupModal(allEmployees) {
    let cards = document.getElementsByClassName("card");
    let closeX;

    for (let card of cards) {
        card.onclick = () => {
            let index = parseInt(card.id);
            openModal(allEmployees[index]);
            const modal = document.querySelector('.modal');
            closeX = document.querySelectorAll('button');

            // Event listener for the "X" button
            closeX[0].onclick = () => {
                const modalContainer = document.querySelector('.modal-container');
                const container = document.querySelector('.container');
                container.removeChild(modalContainer);
            };

            // Event listener on the a click outside of the  modal.
            window.onclick = (e) => {
                if (e.target.className == "modal-container") {
                    const modalContainer = document.querySelector('.modal-container');
                    const container = document.querySelector('.container');
                    container.removeChild(modalContainer);
                }
            };
        };
    }
}