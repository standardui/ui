export const COMPONENTS = {
  // CURRENCY_INPUT: {
  //   name: 'currency-input',
  //   path: './currency-input/currency-input.js'
  // },
  INTEGER_INPUT: {
    name: 'integer-input',
    path: './integer-input/integer-input.js'
  }
}

const components = [
  // COMPONENTS.CURRENCY_INPUT,
  COMPONENTS.INTEGER_INPUT
]

/**
 * Registers all components in the UI (probably not recommended).
 * @param {*} namespace The namespace to register the components into.
 */
export const registerUi = (namespace = 'standardui') => {
  registerComponents(namespace, components)
}

/**
 * Register only specific components in the UI.
 * @param {*} namespace
 * @param {*} components
 */
export const registerComponents = (namespace, components) => {
  components.forEach(component => {
    const componentName = `${namespace}-${component.name}`
    if (!window.customElements.get(componentName)) {
      import(component.path).then(component => {
        window.customElements.define(componentName, component.default)
      })
    }
  })
}

export default registerUi
