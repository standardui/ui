import BaseComponent from '../base-component'

class BaseInput extends BaseComponent {
  // Identify the element as a form-associated custom element
  static formAssociated = true;

  constructor () {
    super()
    this.internals = this.attachInternals()
    this.setValue = this.setValue.bind(this)
  }

  set value (newValue) {
    this.value_ = newValue
    this.internals.setFormValue(newValue)
  }

  get value () { return this.value; }

  get name () { return this.getAttribute('name'); }

  get type() { return this.localName; }

  get validity() {return this.internals.validity; }

  get validationMessage() { return this.internals.validationMessage; }

  get willValidate() { return this.internals.willValidate; }

  checkValidity() { return this.internals.checkValidity(); }

  reportValidity() { return this.internals.reportValidity(); }

  setValue(value) {
    this.value = value
  }
}

export default BaseInput
