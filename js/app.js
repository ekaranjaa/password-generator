const passLengthSlider = document.getElementById('passLengthSlider')
const passLengthNumber = document.getElementById('passLengthNumber')

passLengthSlider.addEventListener('input', syncPassLengthInput)
passLengthNumber.addEventListener('input', syncPassLengthInput)

function syncPassLengthInput(e) {
    const value = e.target.value

    passLengthSlider.value = value
    passLengthNumber.value = value
}