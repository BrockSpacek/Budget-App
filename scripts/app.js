import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './localstorage.js';

   // IDs
    const budgetPopup = document.getElementById('budgetPopup');
    const expensePopup = document.getElementById('expensePopup');
    const viewExpensesPopup = document.getElementById('viewExpensesPopup');

    const updateBudgetBtn = document.getElementById('UpdateBudgetBtn');
    const addExpenseBtn = document.getElementById('AddExpenseBtn');
    const updateExpenseBtn = document.getElementById('UpdateExpenseBtn');

    const cancelBudgetBtn = document.getElementById('cancelBudgetBtn');
    const cancelExpenseBtn = document.getElementById('cancelExpenseBtn');
    const closeViewExpensesBtn = document.getElementById('closeViewExpensesBtn');

    const saveBudgetBtn = document.getElementById('saveBudgetBtn');
    const budgetInput = document.getElementById('budgetInput');
    const budgetText = document.getElementById('BudgetText');

    const saveExpenseBtn = document.getElementById('saveExpenseBtn');
    const expenseName = document.getElementById('expenseName');
    const expenseAmount = document.getElementById('expenseAmount');

    const expensesList = document.getElementById('expensesList');
    const expensesListPopup = document.getElementById('expensesListPopup');

    let amount = 0;


    
    // Buttons
    updateBudgetBtn.addEventListener('click', () => {
        budgetPopup.classList.remove('hidden')
    });

    addExpenseBtn.addEventListener('click', () => {
        expensePopup.classList.remove('hidden')
    });

    updateExpenseBtn.addEventListener('click', () => {
        viewExpensesPopup.classList.remove('hidden');
        displayExpenses();
    });

    cancelBudgetBtn.addEventListener('click', () => {
        budgetPopup.classList.add('hidden')
    });

    cancelExpenseBtn.addEventListener('click', () => {
        expensePopup.classList.add('hidden')
    });

    closeViewExpensesBtn.addEventListener('click', () => {
        viewExpensesPopup.classList.add('hidden')
    });

    
    saveBudgetBtn.addEventListener('click', () => {
        amount = budgetInput.value;
        if (amount) {
            budgetText.textContent = `$${amount}`;
            budgetPopup.classList.add('hidden');
            budgetInput.value = '';
        }
        remainingBudget();
    });


    saveExpenseBtn.addEventListener('click', () => {
        let name = expenseName.value
        let amount = expenseAmount.value

        if (name && amount) {
            let expense = { name, amount };
            saveToLocalStorage(expense);

            displayExpenses();
            expensePopup.classList.add('hidden');
            expenseName.value = '';
            expenseAmount.value = '';
        }
    });

  // Local Storage
  function displayExpenses() {
    let expenses = getFromLocalStorage();
    expensesList.innerHTML = ''; 
    expensesListPopup.innerHTML = ''; 

    expenses.forEach((expense, index) => {
       
        let expenseItemMain = document.createElement('div');
        expenseItemMain.className = 'bg-white p-2 rounded flex justify-between';

        let NameMain = document.createElement('div');
        NameMain.textContent = expense.name;

        let AmountMain = document.createElement('span');
        AmountMain.textContent = `$${expense.amount}`;

        let expenseContainerMain = document.createElement('div');
        expenseContainerMain.appendChild(AmountMain);

        expenseItemMain.appendChild(NameMain);
        expenseItemMain.appendChild(expenseContainerMain);

       
        expensesList.appendChild(expenseItemMain);

    
        let expenseItemPopup = document.createElement('div');
        expenseItemPopup.className = 'bg-white p-2 rounded flex justify-between';

        let NamePopup = document.createElement('div');
        NamePopup.textContent = expense.name;

        let AmountPopup = document.createElement('span');
        AmountPopup.textContent = `$${expense.amount}`;

        let deleteBtnPopup = document.createElement('button');
        deleteBtnPopup.textContent = 'Delete';
        deleteBtnPopup.className = 'bg-red-500 text-white px-2 rounded';
        deleteBtnPopup.addEventListener('click', () => {
            deleteExpense(index);
        });

        let expenseContainerPopup = document.createElement('div');
        expenseContainerPopup.appendChild(AmountPopup);
        expenseContainerPopup.appendChild(deleteBtnPopup);

        expenseItemPopup.appendChild(NamePopup);
        expenseItemPopup.appendChild(expenseContainerPopup);

       
        
        expensesListPopup.appendChild(expenseItemPopup);
    });

   
    remainingBudget();
}


function remainingBudget() {

    let totalBudget = amount;
    let expenses = getFromLocalStorage();

    
    let totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

    let remainder = totalBudget - totalExpenses;
    budgetText.textContent = `$${remainder}`; 
}

    

    function deleteExpense(index) {
        let expenses = getFromLocalStorage();
        expenses.splice(index, 1);
        localStorage.setItem('expense', JSON.stringify(expenses));
        displayExpenses();
    }

    remainingBudget();
    displayExpenses();

