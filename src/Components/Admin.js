import React, { useState, useEffect } from 'react';
import './Style/admin.css';
const PersonAndCompanyManager = () => {
  const [people, setPeople] = useState(() => {
    const savedPeople = localStorage.getItem('people');
    return savedPeople ? JSON.parse(savedPeople) : [];
  });

  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem('companies');
    return savedCompanies ? JSON.parse(savedCompanies) : [];
  });

  const [personForm, setPersonForm] = useState({ name: '', income: '', expense: '' });
  const [companyForm, setCompanyForm] = useState({ owner: '', company: '' });

  const handlePersonInputChange = (e) => {
    const { id, value } = e.target;
    setPersonForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleCompanyInputChange = (e) => {
    const { id, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [id]: value }));
  };

  const addPerson = () => {
    const { name, income, expense } = personForm;
    const parsedIncome = parseFloat(income);
    const parsedExpense = parseFloat(expense);

    if (!name || isNaN(parsedIncome) || isNaN(parsedExpense)) {
      alert('Please enter valid values for all fields.');
      return;
    }

    const newPerson = {
      name,
      income: parsedIncome,
      expense: parsedExpense,
      balance: parsedIncome - parsedExpense,
    };

    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));

    setPersonForm({ name: '', income: '', expense: '' });
  };

  const deletePerson = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));
  };

  const addCompany = () => {
    const { owner, company } = companyForm;
    if (!owner || !company) {
      alert('Please enter valid values for all fields.');
      return;
    }

    const newCompany = { owner, company };
    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));

    setCompanyForm({ owner: '', company: '' });
  };

  const deleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  };

  const totalPeople = people.length;
  const totalIncome = people.reduce((acc, person) => acc + person.income, 0);
  const totalExpense = people.reduce((acc, person) => acc + person.expense, 0);
  const totalBalance = people.reduce((acc, person) => acc + person.balance, 0);

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [people, companies]);

  return (
    <div className="container">
      <h1>Company Manager</h1>
      <div className="form-section">
        <input
          type="text"
          id="owner"
          value={companyForm.owner}
          onChange={handleCompanyInputChange}
          placeholder="Owner Name"
        />
        <input
          type="text"
          id="company"
          value={companyForm.company}
          onChange={handleCompanyInputChange}
          placeholder="Company Name"
        />
        <button onClick={addCompany}>Add Company</button>
      </div>
      <table id="companyTable">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Company Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((companyData, index) => (
            <tr key={index}>
              <td>{companyData.owner}</td>
              <td>{companyData.company}</td>
              <td>
                <button onClick={() => deleteCompany(index)} style={{margin:"0px"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Company Report</h2>
      <p>Total Companies: {companies.length}</p>
      <ul>
        {companies.map((company, index) => (
          <li key={index}>
            {company.owner} - {company.company}
          </li>
        ))}
      </ul>

      <h1>Person Manager</h1>
      <div className="form-section">
        <input
          type="text"
          id="name"
          value={personForm.name}
          onChange={handlePersonInputChange}
          placeholder="Name"
        />
        <input
          type="number"
          id="income"
          value={personForm.income}
          onChange={handlePersonInputChange}
          placeholder="Income"
        />
        <input
          type="number"
          id="expense"
          value={personForm.expense}
          onChange={handlePersonInputChange}
          placeholder="Expense"
        />
        <button onClick={addPerson}>Add Person</button>
      </div>

      <table id="personTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.income.toFixed(2)}</td>
              <td>{person.expense.toFixed(2)}</td>
              <td>{person.balance.toFixed(2)}</td>
              <td>
                <button onClick={() => deletePerson(index)} style={{margin:"0px"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Person Report</h2>
      <p>Total People: {totalPeople}</p>
      <p>Total Income: {totalIncome.toFixed(2)}</p>
      <p>Total Expense: {totalExpense.toFixed(2)}</p>
      <p>Total Balance: {totalBalance.toFixed(2)}</p>
    </div>
  );
};

export default PersonAndCompanyManager;
