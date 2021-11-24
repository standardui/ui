// import CurrencyInput from './currency-input/currency-input.js'
import IntegerInput from './integer-input/integer-input.js'

export const COMPONENTS = {
  // CURRENCY_INPUT: {
  //   name: 'currency-input',
  //   component: CurrencyInput
  // },
  INTEGER_INPUT: {
    name: 'integer-input',
    component: IntegerInput
  }
}

const components = [
  // COMPONENTS.CURRENCY_INPUT,
  COMPONENTS.INTEGER_INPUT
]

/*
 * Registers all components in the UI (probably not recommended).
 */
export const registerUi = (namespace) => {
  console.debug(`StandardUI: registering UI for namespace: ${namespace}`)
  components.forEach(component => {
    const componentName = `${namespace}-${component.name}`
    console.debug(`StandardUI: registering ${componentName}`)
    if (!window.customElements.get(componentName)) {
      window.customElements.define(componentName, component.component)
    }
  })
}

export default registerUi
