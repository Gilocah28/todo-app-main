const imageSouce = [
    {
        source: `<picture>
        <source media="(max-width:600px)" srcset="./images/bg-mobile-light.jpg">
        <img src="./images/bg-desktop-light.jpg" alt="background">
        </picture>`,
        className: '',
        moonDisplay: 'block',
        sunDisplay: 'none',
        backgroundClr: 'hsl(0, 0%, 98%)',
    },
    {
        source: `<picture>
        <source media="(max-width:600px)" srcset="./images/bg-mobile-dark.jpg">
        <img src="./images/bg-desktop-dark.jpg" alt="background">
        </picture>`,
        className: 'dark-mode',
        moonDisplay: 'none',
        sunDisplay: 'block',
        backgroundClr: 'hsl(235, 24%, 19%)'
    }
]





const imageBackground = document.querySelector('.background-One')
const mainCoainter = document.getElementById('main')
const moonToggle = document.getElementById('moon')
const toggle = document.querySelector('.toggle-mode')
const sunToggle = document.getElementById('sun')
const count = document.getElementById('counter')
const body = document.querySelector('body')
const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
const todoContainer = document.querySelector('.todo-data')
const todoEnter = document.querySelector('.circle')
const input = document.querySelector('.input')
const themeSource = JSON.parse(localStorage.getItem('theme')) || []




window.addEventListener('load', (e) => {
    e.preventDefault()
    getItem(themeSource)
    todoLoader(data)
    counterLength()
    loaderBtn()
})

function getItem(item) {
    const { source, className, moonDisplay, sunDisplay, backgroundClr } = item
    moonToggle.style.display = moonDisplay
    sunToggle.style.display = sunDisplay
    imageBackground.innerHTML = source
    mainCoainter.className = className
    body.style.backgroundColor = backgroundClr
}

moonToggle.addEventListener('click', () => {
    localStorage.setItem('theme', JSON.stringify(imageSouce[1]));
    getItem(themeSource)

    const { source, className, moonDisplay, sunDisplay, backgroundClr } = imageSouce[1]
    moonToggle.style.display = moonDisplay
    sunToggle.style.display = sunDisplay
    imageBackground.innerHTML = source
    mainCoainter.className = className
    body.style.backgroundColor = backgroundClr
});

sunToggle.addEventListener('click', () => {

    localStorage.setItem('theme', JSON.stringify(imageSouce[0]));
    getItem(themeSource)

    const { source, className, moonDisplay, sunDisplay, backgroundClr } = imageSouce[0]
    moonToggle.style.display = moonDisplay
    sunToggle.style.display = sunDisplay
    imageBackground.innerHTML = source
    mainCoainter.className = className
    body.style.backgroundColor = backgroundClr
});

function generateTodo(inputDiv, classVal, checkStatus) {
    return `<div class="details">
        <div class="text-con">
        <div class="checkbox-wrapper-12 checkboxChecker">
            <div class="cbx">
            <input id="cbx-12" type="checkbox" / value="line" ${checkStatus ? 'checked' : ''}>
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
        <p id="todoValueIndex" class="todoParam ${classVal}">${inputDiv}</p>
        </div>
        <img src="./images/icon-cross.svg" alt="delete" class="delete revs">
    </div>`
}





input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        inputValidation(input)
        counterLength()
    }
})

todoEnter.addEventListener('click', () => {
    inputValidation(input)
    counterLength()
})

const inputValidation = (inputDiv) => {
    if (inputDiv.value === '') {
        alert('Should not empty the field')
    } else {
        inputSave(inputDiv)
    }
}

const inputSave = (inputDiv, classVal, check) => {

    const str = generateTodo(inputDiv.value, classVal, check)
    todoContainer.innerHTML += str
    const value = inputDiv.value

    const todoListData = {
        todo: value,
        checkStatus: '',
        clasName: ''
    }

    data.push(todoListData)
    const saveToLocalStorage = JSON.stringify(data)
    localStorage.setItem('data', saveToLocalStorage)
    inputDiv.value = ''
}

function todoLoader(todo) {
    let strData = ''
    for (let i = 0; i < todo.length; i++) {
        const { todo, checkStatus, clasName } = data[i]
        strData += generateTodo(todo, clasName, checkStatus)
    }
    todoContainer.innerHTML += strData
}

function counterLength() {
    count.innerHTML = data.length;
}

function loaderBtn() {
    const todoContainer = document.querySelector('.todo-data');
    todoContainer.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.revs');
        if (deleteButton) {
            const todoItemContainer = deleteButton.closest('.details');
            const indexInDOM = Array.from(todoContainer.children).indexOf(todoItemContainer);
            todoItemContainer.remove();
            data.splice(indexInDOM, 1);
            localStorage.setItem('data', JSON.stringify(data));
            counterLength();
        }

        const checkBtn = event.target.closest('.checkboxChecker');
        if (checkBtn) {
            const todoItemContainer = checkBtn.closest('.details');
            const indexInDOM = Array.from(todoContainer.children).indexOf(todoItemContainer);
            const todoDataIndex = data[indexInDOM];
            todoDataIndex.clasName = 'line';
            todoDataIndex.checkStatus = true;
            const saveToLocalStorage = JSON.stringify(data);
            localStorage.setItem('data', saveToLocalStorage);

            // Find the associated todoParam element and update its style
            const todoParam = todoItemContainer.querySelector('.todoParam');
            if (todoParam) {
                todoParam.style.textDecoration = 'line-through';
            }
        }
    });
}



















