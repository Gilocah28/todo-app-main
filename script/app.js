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




























