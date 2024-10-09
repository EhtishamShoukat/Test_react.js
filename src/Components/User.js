import React, { useState, useEffect } from 'react';
import './Style/user.css';

const UserPage = () => {
  const [people, setPeople] = useState([]);
  const [companies, setCompanies] = useState([]);

  // State for totals
  const [totalPeople, setTotalPeople] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);

  useEffect(() => {
    updateReport();
    updateCompanyReport();
  }, []);

  const updateReport = () => {
    const peopleData = JSON.parse(localStorage.getItem('people')) || [];
    setPeople(peopleData);
    const totalPeopleCount = peopleData.length;
    let totalIncomeAmount = 0,
      totalExpenseAmount = 0,
      totalBalanceAmount = 0;

    peopleData.forEach((person) => {
      totalIncomeAmount += person.income;
      totalExpenseAmount += person.expense;
      totalBalanceAmount += person.balance;
    });

    setTotalPeople(totalPeopleCount);
    setTotalIncome(totalIncomeAmount.toFixed(2));
    setTotalExpense(totalExpenseAmount.toFixed(2));
    setTotalBalance(totalBalanceAmount.toFixed(2));
  };

  const updateCompanyReport = () => {
    const companiesData = JSON.parse(localStorage.getItem('companies')) || [];
    setCompanies(companiesData);
    setTotalCompanies(companiesData.length);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="container">
      <h2>Report</h2>
      <div id="report">
        <p>Total People: <span>{totalPeople}</span></p>
        <p>Total Income: <span>{totalIncome}</span></p>
        <p>Total Expense: <span>{totalExpense}</span></p>
        <p>Total Balance: <span>{totalBalance}</span></p>
      </div>

      <h2>Company Report</h2>
      <div id="companyReport">
        <p>Total Companies: <span>{totalCompanies}</span></p>
        <ul id="companyList">
          {companies.map((company, index) => (
            <li key={index}>
              {company.owner} - {company.company}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={printReport}>Print Report</button>
    </div>
  );
};

export default UserPage;
