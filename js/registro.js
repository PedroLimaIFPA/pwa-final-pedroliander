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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    document.getElementById('latitude').value = latitude;
                    document.getElementById('longitude').value = longitude;

                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    alert('Erro ao obter localização: ' + error.message);
                }
            );
        } else {
            alert('Geolocalização não é suportada neste navegador.');
        }
    };

    // Função para acessar a câmera
    window.accessCamera = function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } })
                .then((stream) => {
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.autoplay = true;
                    video.style.display = 'none';
                    document.body.appendChild(video);

                    const captureButton = document.createElement('button');
                    captureButton.innerText = 'Capturar Foto';
                    captureButton.style.position = 'absolute';
                    captureButton.style.top = '10px';
                    captureButton.style.left = '10px';
                    document.body.appendChild(captureButton);

                    captureButton.onclick = function() {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const context = canvas.getContext('2d');
                        context.drawImage(video, 0, 0);
                        const dataUrl = canvas.toDataURL('image/png');

                        // Salva a imagem no Local Storage
                        const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
                        fotos.push(dataUrl);
                        localStorage.setItem('fotos', JSON.stringify(fotos));
                        alert('Foto salva no Local Storage!');

                        // Limpa a tela e para o vídeo
                        stream.getTracks().forEach(track => track.stop());
                        document.body.removeChild(video);
                        document.body.removeChild(captureButton);
                    };
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
                    const dataUrl = e.target.result;

                    // Salva a imagem no Local Storage
                    const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
                    fotos.push(dataUrl);
                    localStorage.setItem('fotos', JSON.stringify(fotos));
                    alert('Foto da galeria salva no Local Storage!');
                };
                reader.readAsDataURL(file);
            }
        });

        input.click();
    };
});
