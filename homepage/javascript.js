let sidenavButton = document.getElementsByClassName('sidenavButton'),
    sidenav = document.getElementsByClassName('sidenav')[0];

for (let i = 0; i < sidenavButton.length; i++){
    sidenavButton[i].addEventListener('click', ()=>{
        sidenav.classList.toggle('sidenavOpen');
    });
}