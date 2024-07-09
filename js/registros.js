document.addEventListener('DOMContentLoaded', () => {
    const tabelaRegistros = document.getElementById('tabela-registros');
  
    // Simulação de registros armazenados localmente (substituir por dados reais do backend)
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
  
    registros.forEach(registro => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${registro.nomeAcs}</td>
        <td>${registro.dataRegistro}</td>
        <td>${registro.nomeAgredido}</td>
        <td>${registro.dataAgressao}</td>
        <td>${registro.sexo}</td>
        <td>${registro.municipioAgressao}</td>
        <td>${registro.enderecoAgressao}</td>
        <td>${registro.localAgressao.join(', ')}</td>
        <td>${registro.tratamento}</td>
        <td>${registro.animalAgredido.join(', ')}</td>
        <td>${registro.fonteLuz.join(', ')}</td>
        <td>${registro.circunstancia.join(', ')}</td>
      `;
  
      tabelaRegistros.appendChild(row);
    });
  });
  
  function searchTable() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('tabela-registros');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].getElementsByTagName('td');
      let rowContainsFilter = false;
  
      for (let j = 0; j < cells.length; j++) {
        if (cells[j]) {
          let cellValue = cells[j].textContent || cells[j].innerText;
          if (cellValue.toLowerCase().indexOf(filter) > -1) {
            rowContainsFilter = true;
            break;
          }
        }
      }
  
      rows[i].style.display = rowContainsFilter ? "" : "none";
    }
  }
  