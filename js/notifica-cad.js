(async () => {
 const cadButton = document.querySelector('#cad-button');
 
 let granted = false;

 if (Notification.permission === 'granted') {
   granted = true;
 }

 if (Notification.permission !== 'denied') {
   const permission = await Notification.requestPermission();
   granted = permission === 'granted' ? true : false;
 }

 cadButton.addEventListener('click', () => {
  if (granted) {
    const notification = new Notification("Cadastro Efetuado", {
      body: "Seu cadastro foi efetuado com sucesso.",
      icon: "/src/Logo_tema_claro144px.png" // Use o mesmo ícone da logo
    });


    setTimeout(() => {
      notification.close();
    }, 5000);
  }
});

})();
