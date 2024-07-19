// registro.js

document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');

    formRegistro.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(formRegistro);
        const registro = {};

        formData.forEach((value, key) => {
            if (registro[key]) {
                if (!Array.isArray(registro[key])) {
                    registro[key] = [registro[key]];
                }
                registro[key].push(value);
            } else {
                registro[key] = value;
            }
        });

        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.push(registro);
        localStorage.setItem('registros', JSON.stringify(registros));

        alert('Registro salvo com sucesso!');
        formRegistro.reset();
    });

    // Função para gerar localização
    window.generateLocation = function() {
        // Verifica se a API de geolocalização está disponível
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                document.getElementById('latitude').value = latitude;
                document.getElementById('longitude').value = longitude;

                // Adicione aqui o código para mostrar o mapa, se necessário
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            }, (error) => {
                alert('Erro ao obter localização: ' + error.message);
            });
        } else {
            alert('Geolocalização não é suportada neste navegador.');
        }
    };

    // Função para acessar a câmera
    window.accessCamera = function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.autoplay = true;
                    document.body.appendChild(video);
                })
                .catch((error) => {
                    alert('Erro ao acessar a câmera: ' + error.message);
                });
        } else {
            alert('Câmera não suportada neste navegador.');
        }
    };

    // Função para acessar a galeria
    window.accessGallery = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        document.body.appendChild(input);

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    document.body.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });

        input.click();
    };
});
