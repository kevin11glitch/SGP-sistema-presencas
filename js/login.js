// Campo "Senha"
const inputSenha = document.getElementById('senha');
const botaoOlho1 = document.getElementById('botao-olho-1') || document.getElementById('botao-olho');

if (botaoOlho1) { 
    botaoOlho1.addEventListener('click', function() {
        if (inputSenha.type === 'password') {
            inputSenha.type = 'text';
            botaoOlho1.src = 'img/EyeSlash.png';
        } else {
            inputSenha.type = 'password';
            botaoOlho1.src = 'img/Eye.png';
        }
    });
}

// Campo "Confirmar senha"
const inputConfirmarSenha = document.getElementById('confirmar-senha');
const botaoOlho2 = document.getElementById('botao-olho-2');

if (botaoOlho2) {
    botaoOlho2.addEventListener('click', function() {
        if (inputConfirmarSenha.type === 'password') {
            inputConfirmarSenha.type = 'text';
            botaoOlho2.src = 'img/EyeSlash.png';
        } else {
            inputConfirmarSenha.type = 'password';
            botaoOlho2.src = 'img/Eye.png';
        }
    });
}