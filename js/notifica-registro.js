(async () => {
    const recoverButton = document.querySelector('#resgistrar-button');
  
    let granted = false;
  
    if (Notification.permission === 'granted') {
      granted = true;
    }
  
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      granted = permission === 'granted' ? true : false;
    }
  
    // Adiciona evento para o botão "Recuperar"
    recoverButton.addEventListener('click', () => {
      if (granted) {
        const notification = new Notification("Novo Registro efetuado", {
          body: "O registro foi efetuado com sucesso.",
          icon: "/src/Logo_tema_claro144px.png" // Use o mesmo ícone da logo
        });
  
        // Feche a notificação após 5 segundos
        setTimeout(() => {
          notification.close();
        }, 5000);
      }
    });
  
   
  })();