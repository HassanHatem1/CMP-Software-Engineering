function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.id = item.id;
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell)
        tableBody.appendChild(row)
        deleteButton.addEventListener('click', function() {
          deleteEmployee(deleteButton.id);
        });
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button 
 const submitButton = document.getElementById('submitbutton'); 
 submitButton.addEventListener('click', createEmployee);


// TODO
// add event listener to delete button 
 //done inside fetchEmployees function

// TODO
function createEmployee() {
  // Get data from input fields
  var name1 = document.getElementById("name").value; 
  var id1 = document.getElementById("id").value;
  // Create employee object
  var newEmployee = {name: name1 ,id: id1};
  console.log(newEmployee);
  // Send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEmployee),
  })
  .then(response => response.json()) // parse the response as JSON
  .then(data => {
    fetchEmployees(); // Refresh the table
  })
}

// TODO
function deleteEmployee(id) {
  // Send data to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    fetchEmployees(); // Refresh the table
  })
}
fetchEmployees()
