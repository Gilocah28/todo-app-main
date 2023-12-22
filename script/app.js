const imageSouce = [
    `<picture>
    <source media="(max-width:600px)" srcset="./images/bg-mobile-light.jpg">
    <img src="./images/bg-desktop-light.jpg" alt="background">
    </picture>`,
    `<picture>
    <source media="(max-width:600px)" srcset="./images/bg-mobile-dark.jpg">
    <img src="./images/bg-desktop-dark.jpg" alt="background">
    </picture>`
]

const themeSource = JSON.parse(localStorage.getItem('theme')) || []

const imageBackground = document.querySelector('.background-One')
const mainCoainter = document.getElementById('main')
const moonToggle = document.getElementById('moon')


const loader = (theme) => {
    
}

moonToggle.addEventListener('click', () => {
    moonToggle.style.display = 'none'
    sunToggle.style.display = 'block'
    mainCoainter.classList.toggle('dark-mode')

    imageBackground.innerHTML = imageSouce[1]
})

const sunToggle = document.getElementById('sun')
sunToggle.addEventListener('click', () => {
    sunToggle.style.display = 'none'
    moonToggle.style.display = 'block'
    mainCoainter.classList.toggle('dark-mode')

    imageBackground.innerHTML = imageSouce[0]
})
