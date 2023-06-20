import React, { useState, useEffect, useCallback, useMemo, memo, useReducer } from 'react';

const Employee = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Sakshi', location: 'Dewas', age: '23', email: 'sakshi@gmail.com' },
    { id: 2, name: 'Vaibhavi', location: 'Indore', age: '22', email: 'vaibhabi@gmail.com' },
    { id: 3, name: 'Hritika', location: 'Dhar', age: '23', email: 'hritika@gmail.com' },
  ]);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('Employees updated:', employees);
  }, [employees]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'location') {
      setLocation(value);
    } else if (name === 'age') {
      setAge(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleAddEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      name,
      location,
      age,
      email,
    };
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    setName('');
    setLocation('');
    setAge('');
    setEmail('');
  };

  const handleEditEmployee = useCallback((index) => {
    const employeeToEdit = employees[index];
    setName(employeeToEdit.name);
    setLocation(employeeToEdit.location);
    setAge(employeeToEdit.age);
    setEmail(employeeToEdit.email);
    setEditingIndex(index);
  }, [employees]);

  const handleUpdateEmployee = () => {
    const updatedEmployee = { name, location, age, email };
    const updatedEmployees = [...employees];
    updatedEmployees[editingIndex] = updatedEmployee;
    setEmployees(updatedEmployees);
    setName('');
    setLocation('');
    setAge('');
    setEmail('');
    setEditingIndex(null);
  };

  const handleDeleteEmployee = useCallback((index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  }, [employees]);

  const handleView = useCallback((employee) => {
    alert(`name: ${employee.name}, location: ${employee.location}, age: ${employee.age}, email: ${employee.email}`);
  }, []);

  const totalEmployees = useMemo(() => employees.length, [employees]);

  /*const employeeReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'DELETE':
        return state.filter((employee) => employee.id !== action.payload);
      default:
        return state;
    }
  };

  const [reducerEmployees, dispatch] = useReducer(employeeReducer, employees);

  const handleAddEmployeeReducer = () => {
    const newEmployee = {
      id: Date.now(),
      name,
      location,
      age,
      email,
    };
    dispatch({ type: 'ADD', payload: newEmployee });
    setName('');
    setLocation('');
    setAge('');
    setEmail('');
  };*/

  return (
    <div>
      <h2>Employees</h2>

      <form>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" value={location} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="text" name="age" value={age} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={handleInputChange} />
        </label>
        <br />

        {!editingIndex ? (
          <button type="button" onClick={handleAddEmployee}>
            Add Employee
          </button>
        ) : (
          <button type="button" onClick={handleUpdateEmployee}>
            Update Employee
          </button>
        )}
      </form>

      <h3>Employees:</h3>
      <p>Total Employees: {totalEmployees}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Age</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.location}</td>
              <td>{employee.age}</td>
              <td>{employee.email}</td>
              <td>
                <button type="button" onClick={() => handleEditEmployee(index)}>
                  Edit
                </button>
              </td>
              <td>
                <button type="button" onClick={() => handleDeleteEmployee(index)}>
                  Delete
                </button>
              </td>
              <td>
                <button type="button" onClick={() => handleView(employee)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Employee);
