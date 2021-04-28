const clickProp = () => {
    const button = document.getElementById('delete-btn');
    console.log(button)
    button.addEventListener('click', event => {
        console.log('stop propagation')
        event.preventDefault();
    });
}
window.addEventListener('load', clickProp)