const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
let people = [];

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const res = await checkStatus(response);
    return res.json();
  } catch (error) {
    return console.log('Looks like there was a problem, please check the error.', error);
  }
}

fetchData('https://randomuser.me/api/?nat=us&results=12')
  .then(data => {
    people = data.results;
    generateCards(people);
    clickableCards(people);
  });

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/** This function checks the status of the response */
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// ------------------------------------------
//  CARD GENERATOR
// ------------------------------------------

/** This function generates the cards to be displayed on the page */
function generateCards(people){
  people.forEach(person => {
    html = `<div class="card">
      <div class="card-img-container">
          <img class="card-img" src=${person.picture.thumbnail} alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
      </div>
    </div>`;

    gallery.insertAdjacentHTML('beforeend',html);
  });
}



// ------------------------------------------
//  MODAL
// ------------------------------------------

/** This function creates the modal */
function createModal(person){
  // gets the date of birth of the person
  const dateOfBirth = new Date(person.dob.date);
  // formats the date of birth of the person
  const formattedBirthday = `${dateOfBirth.getMonth() + 1}/${dateOfBirth.getDate()}/${dateOfBirth.getFullYear()}`;

  const html = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${person.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="modal-text">${person.email}</p>
            <p class="modal-text cap">${person.location.city}</p>
            <hr>
            <p class="modal-text">${person.phone}</p>
            <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.postcode}</p>
            <p class="modal-text">Birthday: ${formattedBirthday}</p>
        </div>
      </div>
    </div>
  `;

  gallery.insertAdjacentHTML('afterend', html);
}

// ------------------------------------------
//  CLOSE MODAL
// ------------------------------------------

/** This function adds an eventListener to the close modal button */
function closeModal() {
  // selects the modal close ID
  const modalCloseButton = document.getElementById('modal-close-btn');
  // click eventListener to the close modal button
  modalCloseButton.addEventListener('click', () => {
      const modalContainer = document.querySelector('.modal-container');
      if (modalContainer) {
        modalContainer.remove();
      }
  });
}

// ------------------------------------------
//  CLICKABLE CARDS
// ------------------------------------------

/** This function adds an eventListener to each card */
function clickableCards(people){
  // selects all of the cards generated
  const cards = gallery.querySelectorAll('.card');

  // Adds an event listener to each card and get the index
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const person = people[index];

      // creates a modal with the person data of index clicked
      createModal(person);

      closeModal();
    });
  })
}