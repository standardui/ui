import preventDisallowed from "../mixins/prevent-disallowed.js"

class IntegerInput extends HTMLElement {
  max = 999999999999
  min = 0

  static formAssociated = true

  static get observedAttributes () {
    return ['min', 'max']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) { return }
    this[name] = newValue
  }

  constructor () {
    super()
    this.internals = this.attachInternals()
    this.setValue(0)
    this._onChange = this._onChange.bind(this)
    this.setValue = this.setValue.bind(this)

    /* Set default styles */
    const style = document.createElement('style')
    style.innerHTML = `
      html {
        font-size: var(--integer-input-font-size, 16px);
      }

      input {
        border: var(--integer-input-border, 1px solid black);
        color: var(--integer-input-color, initial);
        font-size: var(--integer-input-font-size, 1rem);
      }

      .wrapper {
        border: var(--integer-input-border, none);
      }
    `

    // Sets and returns this.shadowRoot
    this.attachShadow({ mode: 'open' })

    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    const underlyingInput = document.createElement('input')
    underlyingInput.setAttribute('type', 'number')
    this.underlyingInput = underlyingInput
    wrapper.appendChild(underlyingInput)

    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(wrapper)
  }

  connectedCallback () {
    this.shadowRoot.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', this._onChange)
      input.addEventListener('keydown', this._preventDisallowed)
    })

    const underlyingInput = this.shadowRoot.querySelector('input')
    underlyingInput.setAttribute('min', this.min)
    underlyingInput.setAttribute('max', this.max)
  }

  _preventDisallowed (e) {
    preventDisallowed(e)
    // As this is an integer input, lets disallow the decimal point.
    preventDisallowed(e, ['NumpadDecimal', 'Period'])
  }

  setValue(value) {
    this.internals.setFormValue(value)
  }

  _onChange () {
    if (this.underlyingInput.value.match('e')) {
      this.underlyingInput.value.replace('e', '')
    }
    let value = this.underlyingInput.value
    if (value > this.max) {
      value = this.max
      this.underlyingInput.value = this.max
    }
    this.setValue(this.underlyingInput.value)
  }
}

export default IntegerInput
