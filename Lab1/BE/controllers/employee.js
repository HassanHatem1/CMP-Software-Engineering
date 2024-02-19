const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  const index = employee.findIndex((emp) => (emp.id) === (id));
  employee.splice(index, 1); // remove the employee from the array at the index
  res.status(200).json({ message: `Employee with id ${id} deleted` });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const newEmployee=req.body; // data recieved
  if (!/^[A-Za-z\s]+$/.test(newEmployee.name)) {  
    res.status(400).json({ message: 'Invalid name' });
    return;   
   }
   if(newEmployee.id < 1)
    {
      res.status(400).json({ message: 'Invalid id' });
      return;   
    }
   /// check if the id is already exist 
    if (employee.find((emp) => emp.id == newEmployee.id)) {
      res.status(400).json({ message: 'id already exists' });
      return;    
    } 
  employee.push(newEmployee);
  res.status(201).json({ message: "newEmployee inserted " }); 
};
 