// notificarecupera.js

(async () => {
    const button = document.getElementById('recover-button');
  
    // Solicita permissão ao carregar a página
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  
    button.addEventListener('click', (event) => {
      event.preventDefault();
  
      if (Notification.permission === 'granted') {
        const notification = new Notification('Link de recuperação enviado com sucesso', {
          body: 'Recuperação de senha',
          icon: '/src/Logo_tema_claro144px.png' // Certifique-se de que o caminho está correto
        });
  
        console.log(notification);
  
        setTimeout(() => notification.close(), 4000);
      } else {
        console.log('Permissão para notificações não concedida.');
      }
    });
  })();
  