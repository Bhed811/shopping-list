const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const addItem = function (e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem == '') {
        alert('enter the new item');
        return;
    }
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}
const createButton = function (classes) {
    const button = document.createElement('button');
    button.className = (classes);
    button.appendChild(createIcon('fa-solid fa-xmark'));
    return button;
}
const createIcon = function (classes) {
    const i = document.createElement('i');
    i.className = classes;
    return i;
}
itemForm.addEventListener('submit', addItem);