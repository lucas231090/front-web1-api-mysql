function handleSubmit(event) {
  event.preventDefault();

  // Captura dos dados do formulário
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    position: document.getElementById("position").value,
    salary: parseFloat(document.getElementById("salary").value),
    transportAllowance: document.getElementById("transportAllowance").checked,
    department_id: parseInt(document.getElementById("department").value),
  };

  console.log(formData);

  // Requisição POST usando Axios
  axios
    .post("http://localhost:3001/employees", formData)
    .then((response) => {
      console.log("Dados enviados com sucesso:", response.data);
    })
    .catch((error) => {
      console.error("Erro ao enviar dados:", error);
    });
}
document
  .getElementById("employeeForm")
  .addEventListener("submit", handleSubmit);

// Função para preencher o select com os departamentos
function populateDepartmentsSelect() {
  // Seleciona o elemento select
  const departmentSelect = document.getElementById("department");

  // Faz a requisição para obter os departamentos
  axios
    .get("http://localhost:3001/departments")
    .then((response) => {
      const departments = response.data;

      // Limpa as opções existentes no select
      departmentSelect.innerHTML = "";

      departments.forEach((department) => {
        const option = document.createElement("option");
        option.value = department.id;
        option.textContent = department.name;
        departmentSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar departamentos:", error);
    });
}

document.addEventListener("DOMContentLoaded", populateDepartmentsSelect);

// Função para buscar os dados dos funcionários da API
function fetchEmployees() {
  axios
    .get("http://localhost:3001/employees")
    .then((response) => {
      const employees = response.data;
      const employeeCardsContainer = document.getElementById("employeeCards");

      employees.forEach((employee) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.innerHTML = `
          <h3 class="card-title">${employee.name}</h3>
          <p class="card-subtitle">${employee.position}</p>
        `;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `
          <p><strong>Email:</strong> ${employee.email}</p>
          <p><strong>Salário:</strong> R$ ${employee.salary}</p>
          <p><strong>Data de Contratação:</strong> ${new Date(
            employee.hireDate
          ).toLocaleDateString()}</p>
          <p><strong>Departamento:</strong> ${employee.department_name}</p>
        `;

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        employeeCardsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar funcionários:", error);
    });
}

fetchEmployees();
