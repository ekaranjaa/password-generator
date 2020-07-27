const form = document.getElementById('generator')
const passHolder = document.querySelector('#password input')
const copyText = document.getElementById('copyText')
const passLengthSlider = document.getElementById('passLengthSlider')
const passLengthNumber = document.getElementById('passLengthNumber')
const uppercase = document.getElementById('includeUppercase')
const numbers = document.getElementById('includeNumbers')
const symbols = document.getElementById('includeSymbols')

const lowerCaseCharCodes = characterCodeGenerator(97, 122)
const upperCaseCharCodes = characterCodeGenerator(65, 90)
const numberCharCodes = characterCodeGenerator(48, 57)
const symbolCharCodes = characterCodeGenerator(33, 47)
    .concat(
        characterCodeGenerator(58, 64)
    ).concat(91, 96).concat(
        characterCodeGenerator(123, 126)
    )

passLengthSlider.addEventListener('input', syncPassLengthInput)
passLengthNumber.addEventListener('input', syncPassLengthInput)
copyText.addEventListener('click', copyPass)

form.addEventListener('submit', e => {
    e.preventDefault()

    const passLength = passLengthNumber.value
    const includeUppercase = uppercase.checked
    const includeNumbers = numbers.checked
    const includeSymbols = symbols.checked

    const password = generatePassword(passLength, includeUppercase, includeNumbers, includeSymbols)
    passHolder.value = password
})

function generatePassword(passLength, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = lowerCaseCharCodes

    if (includeUppercase) charCodes = charCodes.concat(upperCaseCharCodes)
    if (includeNumbers) charCodes = charCodes.concat(numberCharCodes)
    if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes)

    const passwordCharacters = []

    for (let i = 0; i < passLength; i++) {
        const character = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(character))
    }

    return passwordCharacters.join('')
}

function characterCodeGenerator(low, high) {
    const characters = []

    for (let i = low; i <= high; i++) {
        characters.push(i)
    }

    return characters
}

function copyPass(e) {
    passHolder.select()
    passHolder.setSelectionRange(0, 99999)

    if (document.execCommand('copy')) {
        e.target.innerText = 'Copied!'
    }

    setTimeout(() => {
        e.target.innerText = 'Copy'
    }, 3000)
}

function syncPassLengthInput(e) {
    const value = e.target.value

    passLengthSlider.value = value
    passLengthNumber.value = value
}
