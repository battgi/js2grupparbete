let tableElement = document.getElementById('tableElement'),
    priceGenerator = ()=> Math.floor((Math.random() * 30) + 5 );



function addTableElement(currentBook, currentPrice) {
    let tr = document.createElement('tr'),
        tdBook = document.createElement('td'),
        tdPrice = document.createElement('td'),
        tdBookContent = document.createTextNode(currentBook),
        tdPriceContent = document.createTextNode(currentPrice);
    
    tdBook.appendChild(tdBookContent);
    tdPrice.appendChild(tdPriceContent);
    
    tr.appendChild(tdBook);
    tr.appendChild(tdPrice);
    
    tableElement.appendChild(tr);
}

addTableElement("Frank", priceGenerator() + "€");