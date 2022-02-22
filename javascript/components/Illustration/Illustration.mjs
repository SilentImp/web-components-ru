import Slide from '../Slide/Slide.mjs';
import { ClassNames } from "../../Selectors.mjs";
const CSS_URL = new URL('./Illustration.css', import.meta.url).href;
const templateHTML = ({dataset} = {}) => {
  return `<style>@import "${CSS_URL}";</style>
<img src="${dataset.src}" alt="${dataset.alt}" />
<slot></slot>`;
};

class Illustration extends Slide {
  constructor() {
    super({
      slot: templateHTML
    });

    this.restartGif = this.restartGif.bind(this);
  }

  restartGif() {
    if (this.classList.contains(ClassNames.currentSlide)) {
      this.image.setAttribute('src', this.dataset.src);
    }
  }

  connectedCallback () {
    super.connectedCallback();

    if (this.dataset.restart !== undefined) {
      this.image = this.shadowRoot.querySelector('img');
      window[Symbol.for("SlideMessanger")].register('slidecontroller:change', this.restartGif);
    }
  }

  
}

customElements.define('ex-illustration', Illustration);

export default Illustration;