/* eslint-disable vars-on-top */
/* eslint-disable object-property-newline */
/* eslint-disable indent */
/* eslint-disable no-var */
/* cardsInterface
 * - componentise
 */

//import TERM_DATES from './term-dates';

const COMPONENT_HTML = `
<script type="module" src="https://unpkg.com/@djplaner/university-date-calendar/university-date-calendar.js"></script>
<script type="module" src="https://unpkg.com/@djplaner/university-date/university-date.js"></script>

<h1>Hello world</h1>

<ul>
<li><university-date> Monday, Week 1 </university-date></li>
<li><university-date> Tuesday, Week 1 </university-date></li>
<li><university-date> Wednesday, Week 1 </university-date> hello</li>
<li><university-date> Thursday, Week 1 </university-date></li>
</ul>

`;

function cardsInterface() {
    //    jQuery("ul#content_listContainer").hide();

    /* define variables based on Bb page type */
    /* used to identify important components in html */
    let tweak_bb_active_url_pattern = 'listContent.jsp';
    window.tweak_bb = {
        display_view: (location.href.indexOf(tweak_bb_active_url_pattern) > 0),
        page_id: '#content_listContainer',
        row_element: 'li',
    };

    // get the card Interface
    let bbItems = document.querySelectorAll(`${tweak_bb.page_id} > ${tweak_bb.row_element}`);
    let cardInterface = getCardInterface(bbItems)

    // add the component to the card interface
    addComponentToCardInterface( cardInterface)

}

/**
 * @function addComponentToCardInterface
 * @param {Element} cardInterface
 * @returns 
 * Add all the component stuff to the Card Interface body
 * Add to the div.details
 */

function addComponentToCardInterface( cardInterface){
    let details = cardInterface.querySelector('div.details');

    details.innerHTML = COMPONENT_HTML;
}

/**
 * @function getCardInterface
 * @params {ElementNodeList} bbItem
 * @returns Element containing the card interface title
 * 
 */

function getCardInterface(bbItems) {
    let cardInterface;

    bbItems.forEach(function(item) {
        let h3 = item.querySelector('.item h3');
        if ( h3.innerText.toLowerCase().includes('card interface')){
            cardInterface = item
        }

    })
    console.log('Card interface');
    console.log(cardInterface);

    return cardInterface;

}
