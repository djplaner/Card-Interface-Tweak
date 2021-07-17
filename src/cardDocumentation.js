/* eslint-disable no-tabs */
/**
 * cardDocumentation.js
 * - Implement methods to add docs to Blackboard based cards
 *
 */

const INTRO_HTML = `
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<h3>Note</h3>

<div class="mx-auto border-none box-content px-4 py-2">
  <div class="flex flex-wrap -mx-1 lg:-mx-4 p-0">

      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
	  <article class="overlow-hidden rounded-lg shadow-lg h-full">
	      <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
		  <h4>
			  <i class="fa fa-exclamation-triangle text-red"></i>
			  Change with care
		  </h4>
	      </header>
	      <div class="p-2 md:p-4">
		  <p>Changes to this item may stop the Card Interface from working.</p>
	      </div>
	  </article>
      </div>

      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
	  <article class="overlow-hidden rounded-lg shadow-lg h-full">
	      <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
		  <h4>
			  <i class="fa fa-exclamation-triangle text-red"></i>
			  Do not hide <a target="_blank" href="https://raw.githubusercontent.com/djplaner/Card-Interface-Tweak/master/tweak.js">the tweak code</a>
		  </h4>
	      </header>
	      <div class="p-2 md:p-4">
		  <p>If this item is hidden the Card Interface will not work.</p>
	      </div>
	  </article>
      </div>

      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
	  <article class="overlow-hidden rounded-lg shadow-lg h-full">
	      <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
		  <h4>
			  <i class="fa fa-info-circle text-orange"></i>
			  Cards are always last
		  </h4>
	      </header>
	      <div class="p-2 md:p-4">
		  <p>
		      You can add content to the Card Interface item using the <a target="_blank" href="https://help.blackboard.com/Learn/Administrator/Hosting/Tools_Management/Content_Editor"> 
			  Blackboard content editor</a>. But the cards will always appear after your content.
		  </p>
	      </div>
	  </article>
      </div>

  </div>
</div>
`;

//---------------------
// Specify where the documentation is located

// Github version
const DOCUMENTATION_LINKS = {
  what: 'https://djplaner.github.io/Card-Interface-Tweak/whatWhy/',
  addingCI: 'https://djplaner.github.io/Card-Interface-Tweak/createCards/',
  cardTypes:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#types-of-cards-information-and-navigation',
  cardComponents:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#the-components-of-a-card',
  addImage:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#adding-an-image',
  addActiveImage:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#adding-an-_active-_image',
  imageFit:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#changing-how-the-image-fits-the-card',
  backgroundColour:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#using-a-background-colour',
  useVideo:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#use-a-video-powerpoint-presentation-etc-instead',
  changeDate:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#adding-a-date-or-date-range',
  changeCardLabel:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#changing-the-card-label',
  changeCardNumber:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#changing-the-card-number',
  noCardNumber:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#removing-the-card-number',
  hideCard:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#hiding-a-card',
  comingSoon:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#making-a-coming-soon-card',
  enableReview:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#enabling-review-status',
  // customise all cards
  changeOrder:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-change-the-order-of-cards',
  changeEngage:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-change-or-remove-the-engage-button',
  templatesAndAttributes:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-customise-templates-and-attributes',
  arrangeVertical:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-arrange-cards-vertically-using-templatevertical',
  cardsPerRow:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-change-the-number-of-cards-per-row-using-templateb1y123456',
  assessment:
    'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-use-the-assessment-template-templateassessment',
};

const DOCUMENTATION_HTML = `

<div id="gu_card_intro"></div>

<h3>More information</h3>

<div class="box-content mx-auto border-none h-auto py-0 px-4 m-0">
  <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
	  <article class="overlow-hidden rounded-lg shadow-lg h-full">
	      <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
		  <h4 class="text-lg">
			  Getting started
		  </h4>
	      </header>
	      <div class="p-2 md:p-4">
		  Learn about
		  <ul style="padding-left:1em; margin-left:0">
		   <li> the <a target="_blank" href="${DOCUMENTATION_LINKS.what}">
		     what and why</a> of the Card Interface.</li>
		    <li> <a target="_blank" href="${DOCUMENTATION_LINKS.addingCI}">
		 adding the Card Interface</a> to a new Blackboard page. </li>
		    <li> <a target="_blank" href="${DOCUMENTATION_LINKS.cardTypes}">types of cards</a>.</li>
		    <li> <a target="_blank" href="${DOCUMENTATION_LINKS.cardComponents}">card components</a>.</li>
		</ul>

	      </div>
	  </article>
      </div>

      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
	  <article class="overlow-hidden rounded-lg shadow-lg h-full">
	      <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
		  <h4 class="text-lg">
			  Customising a card
		  </h4>
	      </header>
	      <div class="p-2 md:p-4">
      How do you...
      <ul style="padding-left:1em; margin-left:0">
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.addImage}">Add an image to a card</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.addActiveImage}">Add an <em>active</em> image to a card</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.imageFit}">fit an image</a> in a card. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.backgroundColour}">Use a background colour</a>, rather than an image. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.useVideo}">Add video or other embed type</a> to a card.</li>
	 <li> Add or <a target="_blank" href="${DOCUMENTATION_LINKS.changeDate}">change the date or date range</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.changeCardLabel}">Change the card label</a>. <br />
	      <i class="fa fa-plus-square text-green"></i> now auto-increment multiple labels
	 </li> 
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.changeCardNumber}">Change the card number</a>. </li>
	 <li> <i class="fa fa-plus-square text-green"></i>
	 <a target="_blank" href="${DOCUMENTATION_LINKS.noCardNumber}">Remove the card number</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.hideCard}">Hide a card</a>. </li>
	 <li> <i class="fa fa-plus-square text-green"></i>
	 Turn a card to a <a target="_blank" href="${DOCUMENTATION_LINKS.comingSoon}">"Coming Soon" (🚧) card</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.enableReview}">Enable "Review Status"</a>. </li>
      </ul>
	      </div>
	  </article>
      </div>

      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
	  <article class="overlow-hidden rounded-lg shadow-lg h-full">
	      <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
		  <h4 class="text-lg">
			 Customising all cards 
		  </h4>
	      </header>
	      <div class="p-2 md:p-4">
      How do you...   
      <ul style="padding-left:1em; margin-left:0">
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.changeOrder}">Change the card order</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.changeEngage}">Change the engage button</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.arrangeVertical}">Arrange cards vertically</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.cardsPerRow}">Change the number of cards per row</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.assessment}">Use the assessment template</a>. </li>
	 <li> <a target="_blank" href="${DOCUMENTATION_LINKS.templatesAndAttributes}">Learn about templates and attributes</a>. </li>
	</ul>
	      </div>
	  </article>
      </div>

  </div>
</div>
`;

export default function addCardDocumentation() {
	console.log('----------------- addCardDocumentation');

  document.querySelector('#gu_card_docs').innerHTML = DOCUMENTATION_HTML;
  document.querySelector('#gu_card_intro').inenerHTML = INTRO_HTML;
}
