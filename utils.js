
// Add click event listeners to each "generate-hex" div
function handleHexClicks() {
  const generateHexDivs = document.getElementsByClassName('generate-hex')
  for (let generateHexDiv of generateHexDivs) {
    generateHexDiv.addEventListener('click', () => {
      const hexValue = generateHexDiv.textContent

        // Copy the text inside the text field
        navigator.clipboard.writeText(hexValue);

        // Insert the copied text to the page
        document.getElementById('selection-instruction').innerHTML = `
        <small>HEX code ${hexValue} was copied to your clipboard</small>`
      })
  }
}




export {handleHexClicks}
