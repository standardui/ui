class BaseComponent extends HTMLElement {
  constructor () {
    super()
    // Sets and returns this.shadowRoot
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    // Handle stylesheets
    if (this.hasAttribute('stylesheet')) {
      const style = document.createElement('link')
      style.setAttribute('rel', 'stylesheet')
      style.setAttribute('href', this.getAttribute('stylesheet'))
      this.shadowRoot.appendChild(style)
    }
  }
}

export default BaseComponent
