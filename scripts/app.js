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
        let amount = budgetInput.value;
        if (amount) {
            budgetText.textContent = `$${amount}`;
            budgetPopup.classList.add('hidden');
            budgetInput.value = '';
        }
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
    
        expenses.forEach((expense) => {
            let expenseItem = document.createElement('div');
            expenseItem.className = 'bg-white p-2 rounded flex justify-between';
            
            let Name = document.createElement('div');
            Name.textContent = expense.name;
    
            let Amount = document.createElement('span');
            Amount.textContent = `$${expense.amount}`;
    
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'bg-red-500 text-white px-2 rounded';
            deleteBtn.addEventListener('click', () => {
                deleteExpense(expense)
            });
    
            let expenseContainer = document.createElement('div');
            expenseContainer.appendChild(Amount);
            expenseContainer.appendChild(deleteBtn);
    
            expenseItem.appendChild(Name);
            expenseItem.appendChild(expenseContainer);
    
            expensesList.appendChild(expenseItem);
            expensesListPopup.appendChild(expenseItem); 
        });
    }

    

    function deleteExpense(expense) {
        removeFromLocalStorage(expense); 
        displayExpenses();
    }

   
    displayExpenses();

