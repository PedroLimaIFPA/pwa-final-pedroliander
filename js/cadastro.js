document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementsByName('firstName')[0].value;
    const lastName = document.getElementsByName('lastName')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const confirmPassword = document.getElementsByName('confirmPassword')[0].value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Usuário já cadastrado!');
    } else {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            password: password
        };
        localStorage.setItem(email, JSON.stringify(userData));
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    }
});