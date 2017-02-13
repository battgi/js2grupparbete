// GOOGLE BOOKS API //////////////////////////////////////////////////////////////////////////////////////////////////////////////
let bookData, titleUserInput, xhr = new XMLHttpRequest()
    , parsedBookData, existingElement = document.getElementById('container')
    , currentImage, currentBuy;

function bookReq() {
    xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + titleUserInput + "&maxResults=40&key=AIzaSyBgyXxZuq30m2nVT8NmHhXc47LWtimjTIA", true);
    xhr.send(null);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                parsedBookData = JSON.parse(xhr.responseText);
                for (let i = 0; i < parsedBookData.items.length; i++) {
                    findImage(parsedBookData.items[i].volumeInfo);
                    findBuy(parsedBookData.items[i]);
                    addElement(parsedBookData.items[i].volumeInfo.title, parsedBookData.items[i].volumeInfo.subtitle, currentImage, currentBuy, parsedBookData.items[i].volumeInfo.description);
                    descriptionButton(i);
                }
            }
            else {
                console.error("ERROR: " + xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error("Error! " + xhr.statusText);
    };
}
//BUTTONS
function descriptionButton(current) {
    let viewDescriptionButton = document.getElementsByClassName('viewDescriptionButton');
    viewDescriptionButton[current].addEventListener('click', () => {
        document.getElementsByClassName('viewDescriptionContent')[current].classList.toggle('viewDescriptionContentDisplayed');
    });
}
document.getElementById('submitButton').addEventListener('click', ()=> {
    document.getElementById('container').classList.add('containerSize');
    titleUserInput = document.getElementById('userInput').value; //setting the new user value to query string
    removeChild(); // resetting the search
    bookReq(); //making the request
});
document.getElementById('hideNotAvailable').addEventListener('click', ()=> {
    let elements = document.querySelectorAll('.notAvailable');
    elements.forEach(function (element) {
        element.classList.toggle('hidden');
    })
});
//if element does not have a buy link, then add a place holder
function findBuy(data) {
    if (data.saleInfo.buyLink) {
        currentBuy = data.saleInfo.buyLink;
    }
    else {
        currentBuy = '#notAvailable';
    }
}
//if element does not have image, then add missing image file
function findImage(data) {
    if (data.imageLinks) {
        currentImage = data.imageLinks.thumbnail;
    }
    else {
        currentImage = "./images/missing.jpg";
    }
}
//resett the results before new search
function removeChild() {
    let removeThis = document.querySelectorAll('ul > li');
    removeThis.forEach(function (element) {
        existingElement.removeChild(element);
    });
}
//creating the new element from parsed data
function addElement(title, subtitle, image, buy, description) {
    let newContainer = document.createElement('li')
        , newTitle = document.createElement('h3')
        , newSubtitle = document.createElement('h6')
        , newTitleContent = document.createTextNode(title)
        , newSubtitleContent = document.createTextNode(subtitle)
        , newDescriptionContent = document.createTextNode(description)
        , newThumbnail = document.createElement('img')
        , newBuy = document.createElement('a')
        , newDescriptionButton = document.createElement('button')
        , newDescription = document.createElement('p');
    newContainer.appendChild(newTitle);
    newContainer.appendChild(newSubtitle);
    newContainer.appendChild(newThumbnail);
    newContainer.appendChild(newDescriptionButton);
    newContainer.appendChild(newDescription);
    newContainer.appendChild(newBuy);
    newTitle.appendChild(newTitleContent);
    newSubtitle.appendChild(newSubtitleContent);
    newThumbnail.setAttribute('src', image);
    newBuy.setAttribute('href', buy);
    newBuy.setAttribute('target', '_blank');
    newBuy.innerHTML = 'Buy';
    if (currentBuy == '#notAvailable') {
        newBuy.innerHTML = 'Not available';
        newBuy.setAttribute('target', '_self');
        newContainer.className = 'notAvailable'
    }
    newDescriptionButton.innerHTML = 'View Description';
    newDescriptionButton.className = 'viewDescriptionButton';
    newDescription.appendChild(newDescriptionContent);
    newDescription.className = 'viewDescriptionContent';
    existingElement.appendChild(newContainer);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////