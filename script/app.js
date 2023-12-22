const imageSouce = [
    {
        source: `<picture>
        <source media="(max-width:600px)" srcset="./images/bg-mobile-light.jpg">
        <img src="./images/bg-desktop-light.jpg" alt="background">
        </picture>`,
        className: '',
        moonDisplay: 'block',
        sunDisplay: 'none'
    },
    {
        source: `<picture>
        <source media="(max-width:600px)" srcset="./images/bg-mobile-dark.jpg">
        <img src="./images/bg-desktop-dark.jpg" alt="background">
        </picture>`,
        className: 'dark-mode',
        moonDisplay: 'none',
        sunDisplay: 'block'
    }
]


const imageBackground = document.querySelector('.background-One')
const mainCoainter = document.getElementById('main')
const moonToggle = document.getElementById('moon')
const toggle = document.querySelector('.toggle-mode')
const sunToggle = document.getElementById('sun')


const themeSource = JSON.parse(localStorage.getItem('theme')) || []


window.addEventListener('load', (e) => {
    e.preventDefault()
    getItem(themeSource)
})

function getItem(item) {
    const { source, className, moonDisplay, sunDisplay } = item
    moonToggle.style.display = moonDisplay
    sunToggle.style.display = sunDisplay
    imageBackground.innerHTML = source
    mainCoainter.className = className
}

moonToggle.addEventListener('click', () => {
    localStorage.setItem('theme', JSON.stringify(imageSouce[1]));
    getItem(themeSource)
    const { source, className, moonDisplay, sunDisplay } = imageSouce[1]
    moonToggle.style.display = moonDisplay
    sunToggle.style.display = sunDisplay
    imageBackground.innerHTML = source
    mainCoainter.className = className
});

sunToggle.addEventListener('click', () => {
    localStorage.setItem('theme', JSON.stringify(imageSouce[0]));
    getItem(themeSource)
    const { source, className, moonDisplay, sunDisplay } = imageSouce[0]
    moonToggle.style.display = moonDisplay
    sunToggle.style.display = sunDisplay
    imageBackground.innerHTML = source
    mainCoainter.className = className
});



