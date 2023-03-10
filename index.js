let colorsArray = []
const form = document.getElementById('color-picker')

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
}

// Fetch initial colors from The Color API
fetch(`https://www.thecolorapi.com/scheme?hex=010180&mode=monochrome&format=JSON&count=5`)
    .then(res => res.json())
    .then(data => {
        colorsArray = data.colors
        renderColors()
    })

// Setup event listener on the form and render new colors on submit
form.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get the color input's seed color value
    const seedColor = document.getElementById('color-input').value.substring(1)

    // Get the scheme selection by its ID
    const schemeSelection = document.getElementById("scheme-select")

    // Get the selected value from the select element
    const selectedScheme = schemeSelection.value

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${selectedScheme}`)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors
            renderColors()
        })
})
