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
    // Implementar código para acessar a câmera
  }
  
  function accessGallery() {
    // Implementar código para acessar a galeria
  }
  