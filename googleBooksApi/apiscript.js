// Previewer //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let viewer;
google.books.load();
google.books.setOnLoadCallback(initialize);

function initialize() {
    viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
}
// GOOGLE BOOKS API //////////////////////////////////////////////////////////////////////////////////////////////////////////////
let bookData, titleUserInput, xhr = new XMLHttpRequest()
    , parsedBookData, existingElement = document.getElementById('container')
    , currentImage, currentBuy, currentIdentifier;

function bookReq() {
    xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + titleUserInput + "&maxResults=40&key=AIzaSyBgyXxZuq30m2nVT8NmHhXc47LWtimjTIA", true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                parsedBookData = JSON.parse(xhr.responseText);
                console.log(parsedBookData);
                for (let i = 0; i < parsedBookData.items.length; i++) {
                    findImage(parsedBookData.items[i].volumeInfo);
                    findBuy(parsedBookData.items[i]);
                    findIdentifier(parsedBookData.items[i].volumeInfo);
                    addElement(parsedBookData.items[i].volumeInfo.title, parsedBookData.items[i].volumeInfo.subtitle, currentImage, currentBuy, parsedBookData.items[i].volumeInfo.description);
                    info(i, currentIdentifier);
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
    xhr.send(null);
}
//BUTTONS
function info(current, data) {
    let viewDescriptionButton = document.getElementsByClassName('viewDescriptionButton')
        , previewButton = document.getElementsByClassName('previewButton');
    viewDescriptionButton[current].addEventListener('click', () => {
        console.log(current);
        document.getElementsByClassName('viewDescriptionContent')[current].classList.toggle('viewDescriptionContentDisplayed');
    });
    previewButton[current].addEventListener('click', () => {
        console.log("Preview?");
        initialize();
        viewer.load(data);
    });
}
document.getElementById('submitButton').addEventListener('click', () => {
    document.getElementById('container').classList.add('containerSize');
    titleUserInput = document.getElementById('userInput').value; //setting the new user value to query string
    removeChild(); // resetting the search
    bookReq(); //making the request
});
document.getElementById('hideNotAvailable').addEventListener('click', () => {
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

function findIdentifier(data) {
    if (data.industryIdentifiers[0].identifier) {
        currentIdentifier = data.industryIdentifiers[0].identifier;
    }
    else {
        currentIdentifier = '0';
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
        , newPreviewButton = document.createElement('button')
        , newDescription = document.createElement('p');
    newContainer.appendChild(newTitle);
    newContainer.appendChild(newSubtitle);
    newContainer.appendChild(newThumbnail);
    newContainer.appendChild(newDescriptionButton);
    newContainer.appendChild(newDescription);
    newContainer.appendChild(newPreviewButton);
    newContainer.appendChild(newBuy);
    newTitle.appendChild(newTitleContent);
    newSubtitle.appendChild(newSubtitleContent);
    newThumbnail.setAttribute('src', image);
    newBuy.setAttribute('href', buy);
    newBuy.setAttribute('target', '_blank');
    newBuy.innerHTML = 'Order';
    if (currentBuy == '#notAvailable') {
        newBuy.innerHTML = 'Not available';
        newBuy.setAttribute('target', '_self');
        newContainer.className = 'notAvailable'
    }
    newDescriptionButton.innerHTML = 'View Description';
    newPreviewButton.innerHTML = 'Preview';
    newDescriptionButton.className = 'viewDescriptionButton';
    newPreviewButton.className = 'previewButton';
    newDescription.appendChild(newDescriptionContent);
    newDescription.className = 'viewDescriptionContent';
    existingElement.appendChild(newContainer);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////