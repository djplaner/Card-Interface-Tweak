/**
 * guCardsView
 * - View for cards. Provide render method
 */

import { html } from 'lit';

export default class guCards {
  constructor(model) {
	  // get the data
	  this.model = model;
  }

  render() {
    return html`<h1>Hello fred</h1>`;
  }
}
