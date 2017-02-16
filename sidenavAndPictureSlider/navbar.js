//sidenav

let sidenavButton = document.getElementsByClassName('sidenavButton'),
    sidenav = document.getElementsByClassName('sidenav');

for (let i = 0; i < sidenavButton.length; i++){
    sidenavButton[i].addEventListener('click', ()=>{
        sidenav[0].classList.toggle('sidenavOpen');
    });
}





