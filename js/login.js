const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const resposta = await fetch('http://127.0.0.1:8000/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                localStorage.setItem('usuario_id', resultado.usuario_id);
                localStorage.setItem('nome_usuario', resultado.nome_completo);
                localStorage.setItem('cargo', resultado.cargo);

                window.location.href = 'tela_professor.html';
            } else {
                alert("Erro: " + resultado.detail);
            }
        } catch (erro) {
            alert("Erro ao conectar com o servidor.");
        }
    });
}