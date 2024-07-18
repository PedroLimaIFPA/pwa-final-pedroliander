let db;

// Inicializar o banco de dados
function initDatabase() {
    db = openDatabase('MordidasDB', '1.0', 'Database de Mordidas de Morcego', 2 * 1024 * 1024);

    // Criar tabela de usuários
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, email TEXT, senha TEXT)');
    });

    // Criar tabela de registros de mordidas
    db.transaction(function (tx) {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS registros (
            id INTEGER PRIMARY KEY,
            nome_acs TEXT,
            data_registro TEXT,
            nome_agredido TEXT,
            data_agressao TEXT,
            sexo TEXT,
            latitude TEXT,
            longitude TEXT,
            municipio_agressao TEXT,
            endereco_agressao TEXT,
            local_agressao TEXT,
            foto BLOB,
            tratamento TEXT,
            animal_agredido TEXT,
            fonte_luz TEXT,
            circunstancia TEXT
        )`);
    });
}

// Função para adicionar um novo usuário
function addUsuario(nome, sobrenome, email, senha) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, senha]);
    });
}

// Função para adicionar um novo registro de mordida
function addRegistro(nome_acs, data_registro, nome_agredido, data_agressao, sexo, latitude, longitude, municipio_agressao, endereco_agressao, local_agressao, foto, tratamento, animal_agredido, fonte_luz, circunstancia) {
    db.transaction(function (tx) {
        tx.executeSql(`INSERT INTO registros (
            nome_acs,
            data_registro,
            nome_agredido,
            data_agressao,
            sexo,
            latitude,
            longitude,
            municipio_agressao,
            endereco_agressao,
            local_agressao,
            foto,
            tratamento,
            animal_agredido,
            fonte_luz,
            circunstancia
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nome_acs, data_registro, nome_agredido, data_agressao, sexo, latitude, longitude, municipio_agressao, endereco_agressao, local_agressao, foto, tratamento, animal_agredido, fonte_luz, circunstancia]);
    });
}

// Inicializar o banco de dados ao carregar a página
document.addEventListener('DOMContentLoaded', initDatabase);

// Função para verificar credenciais de login
function verifyLogin(email, senha, callback) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], function (tx, results) {
            if (results.rows.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    });
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    verifyLogin(email, password, function(isValid) {
        if (isValid) {
            alert('Login bem-sucedido!');
            // Redirecionar para a página principal ou dashboard
            window.location.href = 'inicial.html';
        } else {
            alert('Email ou senha incorretos. Tente novamente.');
        }
    });
});
