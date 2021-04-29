//Prevent the bubbling of the cards buttons
const clickProp = () => {
    const buttons = document.querySelectorAll('#delete-btn');
    buttons.forEach((button) =>{
        button.addEventListener('click', event => {
            event.preventDefault();
        });
    })
}
window.addEventListener('load', clickProp)