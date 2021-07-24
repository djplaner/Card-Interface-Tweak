/**
 * guCardsView
 * - View for cards. Provide render method
 */

import { html, render } from 'lit';

export default class guCards {
  constructor(model) {
	  // get the data
	  this.model = model;

    this.cardDiv = this.model.cardInterface;
  }

  render() {
    const cardInterface = html`<h1>Hello fred</h1>`;
    render( cardInterface, this.cardDiv );
  }
}
