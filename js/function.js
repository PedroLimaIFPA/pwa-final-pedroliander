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

// Funções de acesso à câmera e galeria
function accessCamera() {
  // Solicita acesso à câmera traseira
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { exact: "environment" } // Tenta usar a câmera traseira
    }
  })
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

      // Adiciona a imagem capturada ao formulário ou à página
      const img = new Image();
      img.src = dataUrl;
      img.style.maxWidth = '150px'; // Ajuste o tamanho da imagem
      img.style.maxHeight = '150px'; // Ajuste o tamanho da imagem
      document.querySelector('.foto-galeria').innerHTML = ''; // Limpa a div antes de adicionar a nova imagem
      document.querySelector('.foto-galeria').appendChild(img);

      // Limpa a tela e para o vídeo
      stream.getTracks().forEach(track => track.stop());
      document.body.removeChild(video);
      document.body.removeChild(captureButton);

      document.getElementById('foto').value = dataUrl; // Atualiza o campo do formulário com a imagem capturada
    };
  })
  .catch(error => console.error('Erro ao acessar a câmera:', error));
}


function accessGallery() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(event) {
    const div = document.querySelector('.foto-galeria');
    div.innerHTML = ''; // Limpa a div antes de adicionar a nova imagem
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.src = e.target.result;
      img.style.maxWidth = '150px'; // Ajusta a largura da imagem
      img.style.maxHeight = '150px'; // Ajusta a altura da imagem
      div.appendChild(img);
      document.getElementById('foto').value = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
// Evento para submissão do formulário
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
  const foto = form.foto.value; // Atualize conforme necessário para capturar a imagem da câmera
  const tratamento = form.tratamento.value;
  const animalAgredido = Array.from(form['animal-agredido']).filter(chk => chk.checked).map(chk => chk.value).join(', ');
  const fonteLuz = Array.from(form['fonte-luz']).filter(chk => chk.checked).map(chk => chk.value).join(', ');
  const circunstancia = Array.from(form['circunstancia']).filter(chk => chk.checked).map(chk => chk.value).join(', ');

  addRegistro(nomeAcs, dataRegistro, nomeAgredido, dataAgressao, sexo, latitude, longitude, municipioAgressao, enderecoAgressao, localAgressao, foto, tratamento, animalAgredido, fonteLuz, circunstancia);
  alert('Registro de mordida salvo com sucesso!');
});
