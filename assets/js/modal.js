var modal = document.getElementById('modal');
var openModalBtn = document.getElementById('pesquisa');
var closeModalBtn = document.getElementById('closeModalBtn');


openModalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

function clearModal() {
    pokemonModal.innerHTML = '';
}
