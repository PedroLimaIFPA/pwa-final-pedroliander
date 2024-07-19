// Função para mostrar notificação
function showNotification(message) {
  if (Notification.permission === 'granted') {
      new Notification(message);
  } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
              new Notification(message);
          } else {
              console.log('Permissão para notificações foi negada.');
          }
      });
  } else {
      console.log('Permissão para notificações foi negada.');
  }
}

// Função para solicitar permissão para notificações
function askNotificationPermission() {
  return new Promise((resolve, reject) => {
      if (Notification.permission === 'granted') {
          resolve();
      } else if (Notification.permission === 'denied') {
          reject('Permissão de notificação negada.');
      } else {
          Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                  resolve();
              } else {
                  reject('Permissão de notificação negada.');
              }
          });
      }
  });
}

// Função para acessar a câmera
function accessCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
          .then(stream => {
              const video = document.createElement('video');
              video.srcObject = stream;
              video.autoplay = true;
              video.style.display = 'none'; // Oculta o vídeo
              document.body.appendChild(video);

              // Cria um botão para capturar a imagem
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

                  // Salva a imagem no localStorage
                  const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
                  fotos.push(dataUrl);
                  localStorage.setItem('fotos', JSON.stringify(fotos));

                  // Limpa a tela e para o vídeo
                  stream.getTracks().forEach(track => track.stop());
                  document.body.removeChild(video);
                  document.body.removeChild(captureButton);

                  alert('Foto salva com sucesso em localStorage!');
              };
          })
          .catch(error => {
              console.error('Erro ao acessar a câmera:', error);
          });
  } else {
      alert('Câmera não suportada neste navegador.');
  }
}

// Função para acessar a galeria
function accessGallery() {
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

              // Salva a imagem no localStorage
              const fotos = JSON.parse(localStorage.getItem('fotos')) || [];
              fotos.push(dataUrl);
              localStorage.setItem('fotos', JSON.stringify(fotos));

              alert('Imagem salva com sucesso em localStorage!');
          };
          reader.readAsDataURL(file);
      }
  });

  input.click();
}

// Função para gerar localização
function generateLocation() {
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
}

// Adiciona evento ao botão "Pesquisar"
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.querySelector('.recover-form button[type="submit"]');
  if (submitButton) {
      submitButton.addEventListener('click', function(event) {
          event.preventDefault();

          askNotificationPermission()
              .then(() => {
                  showNotification('Link de recuperação enviado para o email solicitado');
              })
              .catch(error => {
                  console.log(error);
              });
      });
  } else {
      console.log('Botão "Pesquisar" não encontrado.');
  }
});
