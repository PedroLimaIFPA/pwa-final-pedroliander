document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = localStorage.getItem(email);
    if (!userData) {
        alert('Usuário não encontrado!');
        return;
    }

    const storedData = JSON.parse(userData);
    if (storedData.password === password) {
        alert('Login realizado com sucesso!');
        // Redirecionar para a página inicial ou dashboard
        window.location.href = 'inicial.html';
    } else {
        alert('Senha incorreta!');
    }
});