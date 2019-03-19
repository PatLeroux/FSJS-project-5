/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Requests
By: Patrick  Leroux
Treehouse profile name: patleroux 
******************************************/

/*

    Get and display 12 random users

        With information provided from The Random User Generator API, send a request to the API, and use the response data to display 12 users, along with some basic information for each:
            Image
            First and Last Name
            Email
            City or location
        Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.


    */
// Get the 12 random employees from the APi from either the US or Great Britain

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
        getEmployees();
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

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}
/**********************************************************************/


function openModal(index) {
    // Modal Container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    // Modal
    const modal = createNode('div');
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
    const img = allEmployees[index].picture.large;
    modalImg.className = 'modal-img';
    modalImg.src = img;
    modalImg.alt = 'profile picture';
    modalInfoContainer.appendChild(modalImg);

    // Modal Information: Name
    const nameH3 = document.createElement('h3');
    nameH3.className = 'modal-name cap';
    nameH3.id = index;
    nameH3.innerText = allEmployees[index].name.first + ' ' + allEmployees[index].name.last;;
    modalInfoContainer.appendChild(nameH3);

    // Modal Information: eMail
    const eMailP = document.createElement('p');
    eMailP.className = 'modal-text';
    eMailP.innerText = allEmployees[index].email;
    modalInfoContainer.appendChild(eMailP);

    // Modal Information: Location
    const locationP = document.createElement('p');
    locationP.className = 'modal-text cap';
    locationP.innerText = allEmployees[index].location.city;
    modalInfoContainer.appendChild(locationP);

    // Modal Information: hr
    const hr = document.createElement('hr');
    modalInfoContainer.appendChild(hr);

    // Modal Information: Phone   
    const phone = document.createElement('p');
    phone.className = 'modal-text';
    phone.innerText = allEmployees[index].cell;
    modalInfoContainer.appendChild(phone);

    // Modal Information: Adresse
    const addr = document.createElement('p');
    addr.className = 'modal-text';
    addr.innerText = allEmployees[index].location.street + ' ' + allEmployees[index].location.state + ' ' + allEmployees[index].location.postcode;
    modalInfoContainer.appendChild(addr);

    // Modal Information: Birthday
    const birthday = document.createElement('p');
    birthday.className = 'modal-text';
    const date = allEmployees[index].dob.date;
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



function getEmployees() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            allEmployees = JSON.parse(xhr.responseText).results;
            console.log(allEmployees);
            buildGallery(allEmployees);
            //openModal(allEmployees);
            //initApplication();
        }
    };
    xhr.open("GET", "https://randomuser.me/api/?nat=us,gb&results=12");
    xhr.send();
    return allEmployees;
}

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

function setupModal(employeeList) {
    //let card = document.getElementById("employee0");
    let cards = document.getElementsByClassName("card");
    let closeX;

    for (let card of cards) {
        card.onclick = () => {
            let index = parseInt(card.id);
            openModal(index);
            console.log('clicked');
            const modal = document.querySelector('.modal');
            console.log(modal);
            closeX = document.querySelectorAll('button');
            console.log('closeX = ', closeX);
            // Clicking on the X causes the modal to close
            closeX[0].onclick = () => {
                console.log('clicked');
                const modalContainer = document.querySelector('.modal-container');
                const container = document.querySelector('.container');
                container.removeChild(modalContainer);
            };



        };
    }
    // Get the <span> element that closes the modal


    // Clicking outside of the modal cause it to close
    /*    window.onclick = (e) => {
            console.log('e.target = ', e.target);
            //  if (e.target == modal) {
            //      modal.style.display = "none";
            //  }
        };

        // Get the previous employee and fill in the modal with their information
        /*prev.onclick = (e) => {
           let currentEmail = document.getElementById("modal-email").textContent.toLowerCase();
           let employeeId = getEmployeeId(currentEmail);
           let adjustedIndex = ((employeeId - 1) + allEmployees.length) % allEmployees.length;
           fillModal(allEmployees[adjustedIndex]);
         };
     
         // Get the next employee and fill in the modal with their information
         next.onclick = (e) => {
           let currentEmail = document.getElementById("modal-email").textContent.toLowerCase();
           let employeeId = getEmployeeId(currentEmail);
           let adjustedIndex = ((employeeId + 1) + allEmployees.length) % allEmployees.length;
           fillModal(allEmployees[adjustedIndex]);
         };*/
}

// Set up the application
/*function initApplication() {
    let searchInput = document.getElementById("search-input");
    //let clearButton = document.getElementsByTagName("button")[0];

    // fillCards(allEmployees);
    //  setupModal(allEmployees);

    searchInput.addEventListener("keyup", function() {
        //  searchEmployees();
    });

    /*  clearButton.addEventListener("click", function() {
        fillCards(allEmployees);
        // setupModal(allEmployees);
    });

    document.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
        e.preventDefault();
    });
}*/

// add the employee information as text into the appropriate places in the cards for the collection sent
/*function fillCards(employeeList) {
    for (let i = 0; i < employeeList.length; i++) {
        let currentCard = document.getElementById(`${i}`);
        currentCard.getElementsByTagName("img")[0].setAttribute("src", `${employeeList[i].picture.large}`);
        currentCard.getElementsByClassName("fullname")[0].textContent = `${employeeList[i].name.first}  ${employeeList[i].name.last}`;
        currentCard.getElementsByClassName("email")[0].textContent = `${employeeList[i].email}`;
        currentCard.getElementsByClassName("city")[0].textContent = `${employeeList[i].location.city}`;
        currentCard.style.display = "block";
    }
}
*/