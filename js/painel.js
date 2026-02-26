document.addEventListener('DOMContentLoaded', function() {
    const nomeSalvo = localStorage.getItem('nome_usuario');

    if (nomeSalvo) {
        const elementoNome = document.getElementById('nome-professor');
        if (elementoNome) {
            elementoNome.innerText = nomeSalvo;
        }
    } else {
        console.warn("Nome do usuário não encontrado no sistema local.");
    }
});