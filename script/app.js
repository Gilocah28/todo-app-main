


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
    backgroundImageSrc.innerHTML = imageSouce[index].source
    sunBtn.style.display = imageSouce[index].sunDisplay
    moonBtn.style.display = imageSouce[index].moonDisplay
}


// step 2 create a function for loading the themes;

const loaderThemes = (theme) => {
    const { source, className, moonDisplay, sunDisplay, backgroundClr } = theme
    backgroundClrSrc.style.backgroundColor = backgroundClr
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

const listGenerator = (inputValue) => {
    return `<div class="details">
    <div class="text-con">
      <div class="checkbox-wrapper-12">
        <div class="cbx">
          <input id="cbx-12" type="checkbox" />
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
      <p>${inputValue}</p>
    </div>
    <img src="./images/icon-cross.svg" alt="delete">
  </div>`
}



const checker = (field) => {
    if (field.value === '') {
        alert('Input field should not empty')
    } else {
        todoContainer.innerHTML += listGenerator(field.value)
    }
}

SubmitBtn.addEventListener('click', () => {
    checker(inputField)
})

// step 5 save todo to local Storage
const dataTodo = JSON.parse(localStorage.getItem('data')) || []
console.log(dataTodo);

const saveData = () => {
    
}




// step 6 load the todo List




window.addEventListener('load', (e) => {
    e.preventDefault()
    loaderThemes(theme);
});




































