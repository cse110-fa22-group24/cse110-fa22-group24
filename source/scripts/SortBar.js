class SortBar extends HTMLElement {
    // Called once when document.createElement('job-details') is called, or
    // the element is written into the DOM directly as <job-details>
    constructor() {
      super(); // Inherit everything from HTMLElement
  
      // Attach the shadow DOM to this Web Component (leave the mode open)
      this.attachShadow({ mode: 'open' });
  
      // Create an <details> element - This will hold our markup once our data is set
      const div = document.createElement('div');
  
      // Create a style element - This will hold all of the styles for the Web Component
      const style = document.createElement('style');
      // Insert all of the styles from job-details.html into the <style> element
      style.textContent = `#sort_click{
        padding: 0;
        border: none;
        background-color: transparent;
        width: 100%;
    }
    #sort_bar{
        border: none;
        border-radius: 10px;
        background-color:  #dbf8ff;
        display: flex;
        flex-direction: row;
    }
    #sort_type{
        margin:10px;
        text-align: center;
        padding-left: 5px;
        font-size: 13pt;
        font-weight: 100;
        color: #1E7A1D;
    }
    #img_wrapper{
        margin-left: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 15px;
    }
    #sort_img{
        transform: rotate(90deg);
        width: 24px;
        height: 24px;
    }`;
  
      // Append the <details> and <style> elements to the Shadow DOM
      this.shadowRoot.append(div, style);
    }

    set name(name){
        if(!name) return;

        const div = this.shadowRoot.querySelector('div');

        div.innerHTML = `
        <button id="sort_click">
            <div id="sort_bar">
                <p id="sort_type">${name}</p>
                <div id="img_wrapper">
                    <img src="/source/assets/next.png" id="sort_img">
                </div>
                <input type="hidden" value="0" id="flag">
            </div>
        </button>`;
    }

    //action is an array of two functions
    set onClickSort(action){
        const details = this.shadowRoot.querySelector('div');
        const button = details.querySelector('button');
        button.addEventListener('click',() =>{
            const sortbar = this.shadowRoot.getElementById("sort_bar");
            const flag = this.shadowRoot.getElementById("flag");
            const sort_img = this.shadowRoot.getElementById("sort_img");
            if(flag.value == "0"){
                sortbar.style.backgroundColor = "#69ddff"
                sort_img.style.transform = 'rotate(270deg)'; 
                flag.value = "1";
            }
            else{
                sortbar.style.backgroundColor = ""
                sort_img.style.transform = 'rotate(90deg)'; 
                flag.value = "0"
            }
        })
    }
}

customElements.define('sort-bar', SortBar);