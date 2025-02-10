function saveToLocalStorage(expense){

    let expenseArr = getFromLocalStorage();

    if(!expenseArr.includes(expense)){
        expenseArr.push(expense);
    }

    localStorage.setItem('expense', JSON.stringify(expenseArr));

}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('expense');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(expense){

    let localStorageData = getFromLocalStorage();

    let expenseIndex = localStorageData.indexOf(expense);

    localStorageData.splice(expenseIndex, 1);

    localStorage.setItem('expense', JSON.stringify(localStorageData));
}



export{ saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage }