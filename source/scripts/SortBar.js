// SortBar.js

class SortBar extends HTMLElement {
  // Called once when document.createElement('sort-bar') is called, or
  // the element is written into the DOM directly as <sort-bar>
  constructor() {
    super(); // Inherit everything from HTMLElement

    // Attach the shadow DOM to this Web Component (leave the mode open)
    this.attachShadow({ mode: 'open' });

    // Create a <div> element - This will hold our markup once our data is set
    const div = document.createElement('div');

    // Create a style element - This will hold all of the styles for the Web Component
    const style = document.createElement('style');
    // Insert all of the styles from sort-bar.html into the <style> element
    style.textContent = `
      /* font */

      * {
        font-family: "Nunito", sans-serif;
        font-size: 14pt;
        color: #1e7a1d;
      }
      
      /* background */
      
      div {
        display: flex;
        align-items: center;
        border: none;
        border-radius: 10px;
        background-color:  #dbf8ff;
      }
      
      /* labels */
      
      label {
        padding: 0.5rem 1rem;
        user-select: none; /* prevent text selection */
      }
      
      label[for=field] {
        flex-grow: 1;
      }
      
      #order ~ img {
        transform: rotate(270deg);
      }
      
      #order:checked ~ img {
        transform: rotate(90deg);
      }
      
      /* checkboxes */
      
      input {
        display: none; /* hide default checkbox */
      }
    `;

    // Set the contents of the <div> with
    // the <div> template given in sort-bar.html
    div.innerHTML = `
      <label for="field">
        <input type="checkbox" id="field" name="field"/>
        <span></span>
      </label>
      <label for="order">
        <input type="checkbox" id="order" name="order"/>
        <img src="./assets/next.png">
      </label>
    `;

    // Add an event listener when the field is clicked
    const fieldText = div.querySelector('span');
    const orderImg = div.querySelector('img');
    div.querySelector('#field').addEventListener('click', e => {
      // If field is toggled on
      if (e.target.checked) {
        div.setAttribute('style', 'background-color: #69ddff')
        // Set text and arrow to white
        fieldText.setAttribute('style', 'color: white');
        orderImg.setAttribute('style', 'filter: invert()');
      } else {
        // Reset styles to default
        div.removeAttribute('style');
        fieldText.removeAttribute('style');
        orderImg.removeAttribute('style');
      }
    });

    // Append the <div> and <style> elements to the Shadow DOM
    this.shadowRoot.append(div, style);
  }

  /**
   * Called when the .fieldName property is set on this element.
   * 
   * @param {String} fieldName - The name of the field that this `<sort-bar>` represents.
   */
  set fieldName(fieldName) {
    // Select the <span> added to the Shadow DOM in the constructor
    const span = this.shadowRoot.querySelector('span');
    // Set the contents of the <span> with the name passed in
    span.textContent = fieldName;
  }

  /**
   * Called when the .onClick property is set on this element
   * 
   * @param {function} onClick - The function to be called
   *                             when the element is clicked
   */
  set onClick(onClick) {
    this.shadowRoot.querySelector('div').addEventListener('click', onClick);
  }

  /**
   * Called when the .fieldEnabled property is accessed on this element
   * 
   * @returns True if the field is enabled, false otherwise
   */
  get fieldEnabled() {
    return this.shadowRoot.querySelector('#field').checked;
  }

  /**
   * Called when the .orderAscending property is accessed on this element
   * 
   * @returns True if the order is ascending, false if descending
   */
   get orderAscending() {
    return !this.shadowRoot.querySelector('#order').checked;
  }
}

// Define the Class as a customElement so we can create 'sort-bar' elements
customElements.define('sort-bar', SortBar);
