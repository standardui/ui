import preventDisallowed from "../mixins/prevent-disallowed.js"

class IntegerInput extends HTMLElement {
  max = 999999999999
  min = 0

  static formAssociated = true

  static get observedAttributes () {
    return ['min', 'max', 'value']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) { return }
    this[name] = newValue
  }

  constructor () {
    super()
    this.internals = this.attachInternals()
    this._onChange = this._onChange.bind(this)
    this.setValue = this.setValue.bind(this)
    this.setValue(0)

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
    this.attachShadow({ mode: 'open' })

    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    const underlyingInput = document.createElement('input')
    underlyingInput.setAttribute('type', 'number')
    this.underlyingInput = underlyingInput
    wrapper.appendChild(underlyingInput)
    if (this.hasAttribute('hideArrows')) {
      underlyingInput.classList.add('hideArrows')
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
    this.shadowRoot.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', this._onChange)
      input.addEventListener('keydown', this._preventDisallowed)
    })

    const underlyingInput = this.shadowRoot.querySelector('input')
    underlyingInput.setAttribute('min', this.min)
    underlyingInput.setAttribute('max', this.max)
    if (this.hasAttribute('value')) {
      this.setValue(this.getAttribute('value'))
      underlyingInput.setAttribute('value', this.getAttribute('value'))
    } else {
      this.setValue(0)
    }
  }

  _preventDisallowed (e) {
    preventDisallowed(e)
    // As this is an integer input, lets disallow the decimal point.
    preventDisallowed(e, ['NumpadDecimal', 'Period'])
  }

  setValue(value) {
    this.value = value
  }

  set value(newValue) {
    this.internals.setFormValue(newValue)
  }

  get value() {
    return this.underlyingInput.value || '0'
  }

  _onChange () {
    if (this.underlyingInput.value.match('e')) {
      this.underlyingInput.value.replace('e', '')
    }
    let value = parseInt(this.underlyingInput.value)
    if (value > parseInt(this.max)) {
      value = parseInt(this.max)
      this.underlyingInput.value = parseInt(this.max)
    }
    this.setValue(this.underlyingInput.value)
  }
}

export default IntegerInput
