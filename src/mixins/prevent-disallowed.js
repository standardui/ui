/**
 * Disallow from a list of characters when the keydown event is fired.
 * Default:  ['KeyE', 'Equal', 'Minus', 'Comma', 'NumpadAdd', 'NumpadSubtract']
 */
export const preventDisallowed = (event, disallowedCharacters = []) => {
  if (disallowedCharacters.length === 0) {
    disallowedCharacters = ['KeyE', 'Equal', 'Minus', 'Comma', 'NumpadAdd', 'NumpadSubtract']
  }
  if (event.type === 'keydown') {
    if (disallowedCharacters.includes(event.code)) {
      event.preventDefault()
      return false
    }
  }
}

export default preventDisallowed
