let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // se scroll pra baixo, esconde navbar
        navbar.style.top = '-100px';
    } else {
        // se scroll pra cima, mostrar navbar
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// mostra ou oculta botão de voltar para o começo da página
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 1170) { // quantidade em px de quando o botão de scrollar para cima é visto
        document.getElementById('topButton').style.display = 'block';
    } else {
        document.getElementById('topButton').style.display = 'none';
    }
});

// animação suave de scroll
document.getElementById('topButton').addEventListener('click', function(event) {
    event.preventDefault();
    // scroll suave
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});