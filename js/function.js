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

// Adiciona o evento ao botão "Pesquisar"
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.querySelector('.recover-form button[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', function(event) {
      event.preventDefault(); // Evita o envio do formulário

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

// Funções de geolocalização e acesso à câmera e galeria (sem alterações)
function generateLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocalização não é suportada por este navegador.");
  }
}

function showPosition(position) {
  document.getElementById('latitude').value = position.coords.latitude;
  document.getElementById('longitude').value = position.coords.longitude;
  // Implementar código para exibir o mapa com a localização
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("Usuário negou a solicitação de geolocalização.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("As informações de localização não estão disponíveis.");
      break;
    case error.TIMEOUT:
      alert("A solicitação para obter a localização do usuário expirou.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Ocorreu um erro desconhecido.");
      break;
  }
}

function accessCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
          document.body.appendChild(video);
      })
      .catch(error => console.error('Erro ao acessar a câmera:', error));
}

function accessGallery() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
          const img = new Image();
          img.src = e.target.result;
          document.body.appendChild(img);
      }
      reader.readAsDataURL(file);
  }
  input.click();
}

// Evento para submissão do formulário (sem alterações)
document.getElementById('formRegistro').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;

  const nomeAcs = form.nome-acs.value;
  const dataRegistro = form.data-registro.value;
  const nomeAgredido = form.nome-agredido.value;
  const dataAgressao = form.data-agressao.value;
  const sexo = form.sexo.value;
  const latitude = form.latitude.value;
  const longitude = form.longitude.value;
  const municipioAgressao = form.municipio-agressao.value;
  const enderecoAgressao = form.endereco-agressao.value;
  const localAgressao = Array.from(form['local-agressao']).filter(chk => chk.checked).map(chk => chk.value).join(', ');
  const foto = null; // Atualize conforme necessário para capturar a imagem da câmera
  const tratamento = form.tratamento.value;
  const animalAgredido = Array.from(form['animal-agredido']).filter(chk => chk.checked).map(chk => chk.value).join(', ');
  const fonteLuz = Array.from(form['fonte-luz']).filter(chk => chk.checked).map(chk => chk.value).join(', ');
  const circunstancia = Array.from(form['circunstancia']).filter(chk => chk.checked).map(chk => chk.value).join(', ');

  addRegistro(nomeAcs, dataRegistro, nomeAgredido, dataAgressao, sexo, latitude, longitude, municipioAgressao, enderecoAgressao, localAgressao, foto, tratamento, animalAgredido, fonteLuz, circunstancia);
  alert('Registro de mordida salvo com sucesso!');
});
