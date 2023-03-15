import { handleHexClicks } from './utils.js';

let colorsArray = []
const form = document.getElementById('color-picker')
const colorInput = document.getElementById('color-input')
const generateRandomColor = (Math.random()*0xFFFFFF<<0).toString(16)

// Fetch colors and update colorInput with random color value
function fetchColors(url){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors
            renderColors()
        })
    colorInput.value = `#${generateRandomColor}`
}

// Render initial color pallete to the screen
function renderColors() {
    let html = ""
    for (let color of colorsArray) {
        html += `
         <div class="color-wrapper">
            <div class="generate-color" style="background:${color.hex.value}"></div>
            <div class="generate-hex" id="generate-hex">${color.hex.value}</div>
        </div>
         `
    }
    document.getElementById('colors-container').innerHTML = html
    handleHexClicks()
}

// Fetch initial colors from The Color API on load
fetchColors(`https://www.thecolorapi.com/scheme?hex=${generateRandomColor}&mode=monochrome&format=JSON&count=5`)

// Setup event listener on the form and render new colors on submit
form.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get the color input's seedColor value
    const seedColor = document.getElementById('color-input').value.substring(1)
    // Get the scheme selection by its ID
    const schemeSelection = document.getElementById("scheme-select")

    // Get the selected value from the select element
    const selectedScheme = schemeSelection.value

    // Fetch new colors from The Color API based on the form data
    fetchColors(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${selectedScheme}`)

    // Set the colorInput's value to the new seedColor
    colorInput.value = `#${seedColor}`

})
