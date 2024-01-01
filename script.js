const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const itemList = document.getElementById('item-list');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


function onAddItemSubmit (e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem == '') {
        alert('enter the new item');
        return;
    }
    if (isEditMode) {
        const itemToEdit = document.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    else {
        if (checkIfItemExists(newItem)) {
            alert('item already exists');
            itemInput.value = '';
            return;
        }
    }

    addItemToDom(newItem);
    addItemToStorage(newItem);
    
    checkUI();
    itemInput.value = '';
}
function addItemToDom (item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}
function addItemToStorage (item) {
    let itemsFromStorage = getItemsFromStorage();
    
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage () {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return (itemsFromStorage);
}

function displayItems () {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDom(item));
    checkUI();
}
function createButton (classes) {
    const button = document.createElement('button');
    button.className = (classes);
    button.appendChild(createIcon('fa-solid fa-xmark'));
    return button;
}
function createIcon(classes) {
    const i = document.createElement('i');
    i.className = classes;

    return i;
}
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
    else {
        setItemToEdit(e.target);
    };
}
function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}
function setItemToEdit(item) {
    isEditMode = true;
    itemList
        .querySelectorAll('li')
        .forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228822';
    itemInput.value = item.textContent;

}
function removeItem (item) {
    if (confirm('are you sure?')) {
        item.remove();
        removeItemFromStorage(item.textContent);
        checkUI();
    }
}
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter(i => i !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function clearItems (e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    };
    localStorage.removeItem('items');
    checkUI();
}

function filterItems (e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text)!=-1) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    });

}

function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length == 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    };
    formBtn.innerHTML = '<i style="fa-solid fa-plus" </i> Add Item ';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

/*  ----event listeners----  */

function init() {
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI();
}
init();
