/* eslint-disable accessor-pairs */
// SortBar.js

class SortBar extends HTMLElement {
  // Called once when document.createElement('sort-bar') is called, or
  // the element is written into the DOM directly as <sort-bar>
  constructor () {
    super() // Inherit everything from HTMLElement

    // Attach the shadow DOM to this Web Component (leave the mode open)
    this.attachShadow({ mode: 'open' })

    // Create a <div> element - This will hold our markup once our data is set
    const div = document.createElement('div')

    // Create a link element - This will hold a reference to the stylesheet for the Web Component
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', './styles/sort-bar.css')

    // Set the contents of the <div> with
    // the <div> template given in sort-bar.html
    div.innerHTML = `
      <span id="field">Sorting Field</span>
      <span><img src="./assets/next.png"></span>
    `

    // Add an event listener when the field is clicked
    const field = div.querySelector('#field')
    const img = div.querySelector('img')
    div.addEventListener('click', () => {
      if (this.state === 'enabled') {
        // Update state
        this.state = 'reversed'
        // Flip arrow
        img.setAttribute('style', 'transform: rotate(90deg)')
      } else {
        // Update state
        this.state = 'enabled'
        // Set new background color
        div.setAttribute('style', 'background-color: #69ddff')
        // Set text to white
        field.setAttribute('style', 'color: white')
        // Show order arrow
        img.removeAttribute('style')
      }
    })
    // Hide order arrow by default
    img.setAttribute('style', 'visibility: hidden')
    // Add a function to set the state to disabled
    this.disable = () => {
      // Update state
      this.state = 'disabled'
      // Reset styles to default
      div.removeAttribute('style')
      field.removeAttribute('style')
      // Hide order arrow
      img.setAttribute('style', 'visibility: hidden')
    }

    // Append the <div> and <style> elements to the Shadow DOM
    this.shadowRoot.append(div, link)
  }

  /**
   * The current sorting state
   */
  state = 'disabled'

  /**
   * Called when the .fieldName property is set on this element.
   *
   * @param {String} fieldName - The name of the field that this `sort-bar` represents.
   */
  set fieldName (fieldName) {
    // Select the <span> added to the Shadow DOM in the constructor
    const span = this.shadowRoot.querySelector('span')
    // Set the contents of the <span> with the name passed in
    span.textContent = fieldName
  }

  /**
   * Called when the .onClick property is set on this element
   *
   * @param {function} onClick - The function to be called
   *                             when the element is clicked
   */
  set onClick (onClick) {
    this.shadowRoot.querySelector('div').addEventListener('click', onClick)
  }

  /**
   * Simulate the user clicking on this element
   */
  click () {
    this.shadowRoot.querySelector('div').click()
  }

  /**
   * Called when the .fieldEnabled property is accessed on this element
   *
   * @returns True if the field is enabled, false otherwise
   */
  get fieldEnabled () {
    return this.state !== 'disabled'
  }

  /**
   * Called when the .orderReversed property is accessed on this element
   *
   * @returns True if the order is reversed, false otherwise
   */
  get orderReversed () {
    return this.state === 'reversed'
  }
}

// Define the Class as a customElement so we can create 'sort-bar' elements
customElements.define('sort-bar', SortBar)
