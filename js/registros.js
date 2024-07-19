// registros.js

document.addEventListener('DOMContentLoaded', () => {
  carregarRegistros();
});

function carregarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const tabela = document.getElementById('tabela-registros');
  
  tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os registros

  registros.forEach((registro, index) => {
      const tr = document.createElement('tr');

      // Cria uma célula para cada propriedade do registro
      Object.keys(registro).forEach(key => {
          const td = document.createElement('td');
          if (Array.isArray(registro[key])) {
              td.textContent = registro[key].join(', ');
          } else {
              td.textContent = registro[key];
          }
          tr.appendChild(td);
      });

      // Adiciona uma célula para o botão de exclusão
      const tdDelete = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.addEventListener('click', () => {
          excluirRegistro(index);
      });
      tdDelete.appendChild(deleteButton);
      tr.appendChild(tdDelete);

      tabela.appendChild(tr);
  });
}

function excluirRegistro(index) {
  let registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.splice(index, 1); // Remove o registro pelo índice
  localStorage.setItem('registros', JSON.stringify(registros));
  carregarRegistros(); // Recarrega os registros após exclusão
}

function searchTable() {
  const input = document.getElementById('search');
  const filter = input.value.toUpperCase();
  const tabela = document.querySelector('table');
  const tr = tabela.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName('td');
      let found = false;

      for (let j = 0; j < td.length; j++) {
          if (td[j] && td[j].textContent.toUpperCase().indexOf(filter) > -1) {
              found = true;
              break;
          }
      }

      tr[i].style.display = found ? '' : 'none';
  }
}
