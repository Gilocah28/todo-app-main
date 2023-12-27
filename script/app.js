const imageSouce = [
    {
        source: `<picture>
        <source media="(max-width:600px)" srcset="./images/bg-mobile-dark.jpg">
        <img src="./images/bg-desktop-dark.jpg" alt="background">
        </picture>`,
        className: 'dark-mode',
        moonDisplay: 'none',
        sunDisplay: 'block',
        backgroundClr: 'hsl(235, 24%, 19%)'
    },
    {
        source: `<picture>
        <source media="(max-width:600px)" srcset="./images/bg-mobile-light.jpg">
        <img src="./images/bg-desktop-light.jpg" alt="background">
        </picture>`,
        className: '',
        moonDisplay: 'block',
        sunDisplay: 'none',
        backgroundClr: 'hsl(0, 0%, 98%)',
    }
]

const mainBody = document.querySelector('body')
const input = document.querySelector('.input')
const moonBtn = document.getElementById('moon')
const sunBtn = document.getElementById('sun')
const backgroundImageSrc = document.querySelector('.background-One')
const backgroundClrSrc = document.getElementById('main')
const containerClr = document.querySelector('.floating-Container')
const theme = JSON.parse(localStorage.getItem('TodoDateThemes')) ?? imageSouce[1];





// step 1 save the themes and function of the btn
const saveThemes = (theme, index) => {
    const data = JSON.stringify(theme[index])
    localStorage.setItem('TodoDateThemes', data)
}

const themesGenerator = (index) => {
    backgroundClrSrc.style.backgroundColor = imageSouce[index].backgroundClr
    backgroundClrSrc.className = imageSouce[index].className
    mainBody.style.backgroundColor = imageSouce[index].backgroundClr
    backgroundImageSrc.innerHTML = imageSouce[index].source
    sunBtn.style.display = imageSouce[index].sunDisplay
    moonBtn.style.display = imageSouce[index].moonDisplay
}


// step 2 create a function for loading the themes;

const loaderThemes = (theme) => {
    const { source, className, moonDisplay, sunDisplay, backgroundClr } = theme
    backgroundClrSrc.style.backgroundColor = backgroundClr
    mainBody.style.backgroundColor = backgroundClr
    backgroundClrSrc.className = className
    backgroundImageSrc.innerHTML = source
    sunBtn.style.display = sunDisplay
    moonBtn.style.display = moonDisplay
}

moonBtn.addEventListener('click', () => {
    themesGenerator(0)
    saveThemes(imageSouce, 0)
})

sunBtn.addEventListener('click', () => {
    themesGenerator(1)
    saveThemes(imageSouce, 1)
})






// step 4 generate the todo 
const inputField = document.querySelector('.input')
const SubmitBtn = document.querySelector('.circle')
const todoContainer = document.querySelector('.todo-data')

const listGenerator = (inputValue, dataClassName, checkStatus) => {
    return `<div class="details" draggable="true">
        <div class="text-con">
            <div class="checkbox-wrapper-12">
                <div class="cbx">
                    <input id="cbx-12" type="checkbox" ${checkStatus ? 'checked' : ''}/>
                    <label for="cbx-12"></label>
                    <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="goo-12">
                            <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                            <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                result="goo-12"></fecolormatrix>
                            <feblend in="SourceGraphic" in2="goo-12"></feblend>
                        </filter>
                    </defs>
                </svg>
            </div>
            <p id="todoValueIndex" class="todoParam ${dataClassName ? 'line' : ''}">${inputValue}</p>
        </div>
        <img src="./images/icon-cross.svg" alt="delete" class="delete revs">
    </div>`;
}




const checker = (field) => {
    if (field.value === '') {
        alert('Input field should not empty')
    } else {
        todoContainer.innerHTML += listGenerator(field.value)
        saveData()
        inputField.value = ''
    }
}

SubmitBtn.addEventListener('click', () => {
    checker(inputField)
    todoCounter(dataTodo)

})

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checker(inputField)
        todoCounter(dataTodo)
    }
})

// step 5 save todo to local Storage
const dataTodo = JSON.parse(localStorage.getItem('data')) || []


function saveData() {
    const todoData = {
        id: new Date(),
        input: inputField.value,
        checkStatus: '',
        dataClassName: ''
    }
    dataTodo.push(todoData)
    const todoInfo = JSON.stringify(dataTodo)
    localStorage.setItem('data', todoInfo)
}

// step 6 load the todo List
function dataLoad(data) {
    let strData = ''
    for (const { input, checkStatus, dataClassName } of data) {
        strData += listGenerator(input, checkStatus, dataClassName)
    }
    todoContainer.innerHTML = strData
}

// step 7 delete item from local storage

function remove() {
    todoContainer.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.revs')
        if (deleteBtn) {
            const dataOfTodo = deleteBtn.closest('.details')
            const indexOfItem = Array.from(todoContainer.children).indexOf(dataOfTodo)
            dataOfTodo.remove()
            dataTodo.splice(indexOfItem, 1)
            const todoInfo = JSON.stringify(dataTodo)
            localStorage.setItem('data', todoInfo)
            todoCounter(dataTodo)
        }
    })
}

// step 8 update the data of check btn
function checkStatusUpdate() {
    todoContainer.addEventListener('click', (e) => {
        const checkBtn = e.target.closest('.checkbox-wrapper-12');
        if (checkBtn) {
            e.preventDefault();
            const dataOfTodo = checkBtn.closest('.details');
            const indexOfItem = Array.from(todoContainer.children).indexOf(dataOfTodo);

            if (dataTodo[indexOfItem].checkStatus === 'checked') {
                dataTodo[indexOfItem].checkStatus = '';
                dataTodo[indexOfItem].dataClassName = '';
            } else {
                dataTodo[indexOfItem].checkStatus = 'checked';
                dataTodo[indexOfItem].dataClassName = 'line';
            }

            const todoInfo = JSON.stringify(dataTodo);
            localStorage.setItem('data', todoInfo);
            dataLoad(dataTodo);
            todoCounter(dataTodo)
        }
    });
}


// step 9 create the count of the todo
function todoCounter(data) {
    const counterElement = document.getElementById('counter');
    const infoElement = document.getElementById('info');

    let count = 0;

    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            const { dataClassName } = data[i];
            if (dataClassName !== 'line') {
                count++;
            }
        }

        if (count > 0) {
            counterElement.innerText = `${count} items left`;
            infoElement.innerText = '';
        } else {
            counterElement.innerText = '';
            infoElement.innerText = 'All items completed';
        }
    } else {
        counterElement.innerText = '';
        infoElement.innerText = 'No items left';
    }
}





// step 9 clear or remove complete todo data
document.querySelector('.clear').addEventListener('click', () => {

    for (let i = dataTodo.length - 1; i >= 0; i--) {
        if (dataTodo[i].dataClassName === 'line') {
            dataTodo.splice(i, 1);
        }
    }

    const todoInfo = JSON.stringify(dataTodo);
    localStorage.setItem('data', todoInfo);
    dataLoad(dataTodo);
    todoCounter(dataTodo)
});


// show all completed todo
const completedTodo = (data) => {
    let result = ''
    for (let i = 0; i < data.length; i++) {
        const { input, checkStatus, dataClassName } = data[i]
        if (dataClassName === 'line') {
            result += listGenerator(input, checkStatus, dataClassName)
        }
    }
    todoContainer.innerHTML = result
    console.log(result);
}

const activeTodo = (data) => {
    let result = ''
    for (let i = 0; i < data.length; i++) {
        const { input, checkStatus, dataClassName } = data[i]
        if (dataClassName === '') {
            result += listGenerator(input, checkStatus, dataClassName)
        }
    }
    todoContainer.innerHTML = result
}

document.getElementById('completed-one').addEventListener('click', () => {
    completedTodo(dataTodo)
})

document.getElementById('active-one').addEventListener('click', () => {
    activeTodo(dataTodo)
})

document.getElementById('all-one').addEventListener('click', () => {
    dataLoad(dataTodo)
})


document.getElementById('completed-two').addEventListener('click', () => {
    completedTodo(dataTodo)
})

document.getElementById('active-two').addEventListener('click', () => {
    activeTodo(dataTodo)
})

document.getElementById('all-two').addEventListener('click', () => {
    dataLoad(dataTodo)
})

function addDragAndDropListeners() {
    const todoItems = document.querySelectorAll('.details');

    todoItems.forEach((item) => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}


let dragSrcElement = null;
let dragSrcIndex = 0;

function handleDragStart(e) {
    this.style.opacity = '0.5';
    dragSrcElement = this;
    dragSrcIndex = Array.from(this.parentNode.children).indexOf(this);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragLeave() {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (dragSrcElement !== this) {
        const dropIndex = Array.from(this.parentNode.children).indexOf(this);
        const removedItem = dataTodo.splice(dragSrcIndex, 1)[0];
        dataTodo.splice(dropIndex, 0, removedItem);
        const todoInfo = JSON.stringify(dataTodo);
        localStorage.setItem('data', todoInfo);
        dataLoad(dataTodo);
    }
    return false;
}

function handleDragEnd() {
    this.style.opacity = '1';
    document.querySelectorAll('.details').forEach((item) => {
        item.classList.remove('over');
    });
}



window.addEventListener('load', (e) => {
    e.preventDefault();
    loaderThemes(theme);
    dataLoad(dataTodo);
    todoCounter(dataTodo);
    remove();
    checkStatusUpdate();
    addDragAndDropListeners();
});