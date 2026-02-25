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


// --- Lógica de Enviar os Dados para o Banco (FastAPI) ---
const formCriarConta = document.getElementById('form-criar-conta');

if (formCriarConta) {
    formCriarConta.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem! Por favor, digite novamente.");
            return; 
        }

        const dadosUsuario = {
            nome_completo: nome,
            email: email,
            senha: senha
        };

        try {
            const resposta = await fetch('http://127.0.0.1:8000/api/usuarios/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosUsuario)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert("Sucesso: " + resultado.mensagem);
                window.location.href = 'index.html'; 
            } else {
                alert("Erro: " + resultado.detail);
            }

        } catch (erro) {
            console.error("Erro na comunicação com o servidor:", erro);
            alert("Não foi possível conectar ao servidor. Verifique se o FastAPI está rodando.");
        }
    });
}