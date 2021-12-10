import BaseInput from "../base-input/base-input.js"
import preventDisallowed from "../mixins/prevent-disallowed.js"

class CurrencyInput extends BaseInput {
  max = 999999999999
  min = 0
  maxDecimal = 999999999999
  minDecimal = 0
  separator = "."
  symbol = "$"

  static get observedAttributes () {
    return ['min', 'max', 'value', 'maxDecimal', 'separator', 'symbol', 'minDecimal']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) { return }
    this[name] = newValue
  }

  constructor () {
    super()
    this._onChange = this._onChange.bind(this)
    this.handleWholeInputKeydown = this.handleWholeInputKeydown.bind(this)
    this.handleDecimalInputKeydown = this.handleDecimalInputKeydown.bind(this)

    /* Set default styles */
    const style = document.createElement('style')
    style.innerHTML = `
      html {
        font-size: var(--html-font-size, 16px);
      }

      input {
        border: var(--integer-input-border, 1px solid black);
        color: var(--integer-input-color, initial);
        font-size: var(--integer-input-font-size, 1rem);
        background: var(--integer-input-background, initial);
      }
      input:focus {
        outline: var(--integer-input-outline, none);
      }

      .wrapper {
        border: var(--integer-input-wrapper-border, none);
        max-width: fit-content;
      }
      .wrapper:focus, .wrapper:focus-within {
        outline: var(--integer-input-wrapper-outline, none);
        border: var(--integer-input-wrapper-focus-border, none);
      }

      /* Feature: Hide Arrows */
      .hideArrows::-webkit-outer-spin-button,
      .hideArrows::-webkit-inner-spin-button
      {
        -webkit-appearance: none;
        margin: 0;
      }

      .hideArrows {
        -moz-appearance: textfield;
      }
    `

    // Sets and returns this.shadowRoot
    // this.attachShadow({ mode: 'open' })

    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    const sym = document.createElement('span')
    sym.classList.add('symbol')
    sym.innerText = this.symbol
    wrapper.appendChild(sym)

    const wholeInput = document.createElement('input')
    wholeInput.setAttribute('type', 'number')
    wholeInput.setAttribute('data-name', 'whole')
    this.whole = wholeInput
    wrapper.appendChild(wholeInput)

    const divisor = document.createElement('span')
    divisor.innerText = this.separator
    divisor.classList.add('separator')
    wrapper.appendChild(divisor)

    const decimalInput = document.createElement('input')
    decimalInput.setAttribute('type', 'number')
    decimalInput.setAttribute('data-name', 'decimal')
    this.decimal = decimalInput
    wrapper.appendChild(decimalInput)

    if (this.hasAttribute('hideArrows')) {
      wholeInput.classList.add('hideArrows')
      decimalInput.classList.add('hideArrows')
    }

    if (this.hasAttribute('classes')) {
      const classes = this.getAttribute('classes').split(' ')
      classes.forEach(className => {
        wrapper.classList.add(className)
      })
    }

    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(wrapper)
  }

  connectedCallback () {
    super.connectedCallback()
    const wholeInput = this.shadowRoot.querySelector('input[data-name="whole"]')
    const decimalInput = this.shadowRoot.querySelector('input[data-name="decimal"]')

    // Set min/max values
    if (this.hasAttribute('min')) { this.max = this.getAttribute('min') }
    if (this.hasAttribute('max')) { this.max = this.getAttribute('max') }
    if (this.hasAttribute('minDecimal')) { this.maxDecimal = this.getAttribute('minDecimal')}
    if (this.hasAttribute('maxDecimal')) { this.maxDecimal = this.getAttribute('maxDecimal')}

    // Feature: when in whole input and . or , is pressed, move to decimal input
    wholeInput.addEventListener('keydown', this.handleWholeInputKeydown)

    // Feature: when in demianl input and backspace pressed and field is empty, move to whole input
    decimalInput.addEventListener('keydown', this.handleDecimalInputKeydown)

    // Handle Inputs
    this.shadowRoot.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', this._onChange)
      input.addEventListener('keydown', this._preventDisallowed)
    })

    wholeInput.setAttribute('max', this.max)
    wholeInput.setAttribute('min', this.min)
    decimalInput.setAttribute('max', this.maxDecimal)
    decimalInput.setAttribute('min', this.minDecimal)

    if (this.hasAttribute('value')) {
      const value = this.getAttribute('value')
      if (value.includes('.')) {
        const parts = value.split('.')
        this.whole.value = parts[0]
        this.decimal.value = parts[1]
      } else {
        this.whole.value = value
      }
      this.setValue(value)
    } else {
      this.setValue(0)
    }

    if (this.hasAttribute('separator')) {
      this.separator = this.getAttribute('separator')
    }

    if (this.hasAttribute('symbol')) {
      this.symbol = this.getAttribute('symbol')
    }
  }

  _preventDisallowed (e) {
    preventDisallowed(e)
    // As this is an integer input, lets disallow the decimal point.
    preventDisallowed(e, ['NumpadDecimal', 'Period'])
  }

  _onChange () {
    const parts = [this.whole, this.decimal]

    parts.forEach(part => {
      if (part.value.match('e')) {
        part.value.replace('e', '')
      }
    })

    let wholeValue = parseInt(this.whole.value)
    if (wholeValue > parseInt(this.max)) {
      wholeValue = parseInt(this.max)
      this.whole.value = parseInt(this.max)
    }

    let decimalValue = parseInt(this.decimal.value)
    if (decimalValue > parseInt(this.maxDecimal)) {
      decimalValue = parseInt(this.maxDecimal)
      this.decimal.value = parseInt(this.maxDecimal)
    }

    if (this.decimal.value === '') {
      this.setValue(wholeValue)
    } else {
      this.setValue(`${this.whole.value}.${this.decimal.value}`)
    }
  }

  handleWholeInputKeydown (e) {
    const decimalInput = this.shadowRoot.querySelector('input[data-name="decimal"]')

    switch (e.key) {
      case '.':
      case ',':
        decimalInput.focus()
        break
      default:
        break
    }
  }

  handleDecimalInputKeydown (e) {
    const wholeInput = this.shadowRoot.querySelector('input[data-name="whole"]')
    const decimalInput = this.shadowRoot.querySelector('input[data-name="decimal"]')

    switch (e.key) {
      case 'Backspace':
        if (decimalInput.value === '') {
          e.preventDefault()
          wholeInput.focus()
        }
        break
    }
  }
}

export default CurrencyInput
