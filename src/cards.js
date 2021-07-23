/* eslint-disable no-tabs */
/* eslint-disable vars-on-top */
/* eslint-disable object-property-newline */
/* eslint-disable indent */
/* eslint-disable no-var */
/* cardsInterface
 * - Given a Blackboard page with a list of items
 * - Find all the items using the expected card data format
 * - Insert into the first item on the page a cards interface

 * data format
 * - Card's indicating by "Card Image: URL" in the description, though the URL can be empty
 * - Card title - heading of Blackboard item
 * - Card Label - Specify the label to apply to the card (default Module)
 * - Module number - just the order in which they appear in the list
 * - picture - heading includes Card Image:**url** OR inserted image with title
 *   attribute = 'Card Image'
 * - description - the rest of the description
 * - DATE
 *   - Card Date: Mar 5
 *     Specify the date to be displayed
 *   - Card Date Label: Due
 *     Specify the label for the date - default Commencing
 */


// TERM/YEAR specify default period
// SET_DATE is used for testing activePic, specify a date strong for now
var TERM = '2207';
var DEFAULT_YEAR = 2021;
var SET_DATE = '';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MONTHS_HASH = {
  Jan: 0,
  January: 0,
  Feb: 1,
  February: 1,
  Mar: 2,
  March: 2,
  Apr: 3,
  April: 3,
  May: 4,
  Jun: 5,
  June: 5,
  Jul: 6,
  July: 6,
  Aug: 7,
  August: 7,
  Sep: 8,
  September: 8,
  Oct: 9,
  October: 9,
  Nov: 10,
  November: 10,
  Dec: 11,
  December: 11,
};

// kludge to parse card image when Blackboard inserts one of its icons
const BBIMG = '/images/ci/icons/cmlink_generic.gif';

// Interface design from https://codepen.io/njs/pen/BVdwZB

// TEMPLATES - by 6

// define the template types
const NUM_TEMPLATES = 6;
const HORIZONTAL = 0; // original 3 cards per row
const VERTICAL = 1; // 1 card per row
const HORIZONTAL_NOENGAGE = 2; // original, but no engage
const PEOPLE = 5;
const ASSESSMENT = 6; // horizontal but show off people (BCI) version

// Whether the images will be hidden
var HIDE_IMAGES = false;

// Whether or not xAPI logging is turned on
// - turned on by adding "logging" to Card Interface
var LOGGING = false;

// Define the wrapper around the card interface

var interfaceHtmlTemplate = Array(NUM_TEMPLATES);

// Kludge - hard code CSS path to enable shifting from
//          dev to live
// var CARDS_CSS="https://djon.es/gu/cards.css";
var CARDS_CSS = 'https://s3.amazonaws.com/filebucketdave/banner.js/cards.css';

interfaceHtmlTemplate[HORIZONTAL] = `
<link rel="stylesheet" href="{CARDS_CSS}" />


<div id="guCardInterface" class="flex flex-wrap -m-3">
 {CARDS}
</div>
`;
interfaceHtmlTemplate[HORIZONTAL] = interfaceHtmlTemplate[HORIZONTAL].replace(
  '{CARDS_CSS}',
  CARDS_CSS
);

interfaceHtmlTemplate[VERTICAL] = `
<link rel="stylesheet" href="{CARDS_CSS}" />
 {CARDS}
</div>
`;
interfaceHtmlTemplate[VERTICAL] = interfaceHtmlTemplate[VERTICAL].replace(
  '{CARDS_CSS}',
  CARDS_CSS
);

interfaceHtmlTemplate[HORIZONTAL_NOENGAGE] = interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[PEOPLE] = interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[ASSESSMENT] = interfaceHtmlTemplate[HORIZONTAL];

// template for each individual card

var cardHtmlTemplate = Array(NUM_TEMPLATES);

// the extract string for the hovers is used in a replace
//  Don't change it (Kludegy)
cardHtmlTemplate[HORIZONTAL] = `
  <div class="clickablecard w-full sm:w-1/2 {WIDTH} flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}" class="cardmainlink"></a>
      <div class="{BG_SIZE} h-48" style="background-image: url('{PIC_URL}'); background-color: rgb(255,255,255)">{IFRAME}
      </div>
      {COMING_SOON}
      <div class="carddescription p-4 flex-1 flex flex-col">
        <span class="cardLabel">
        {LABEL} {MODULE_NUM}
        </span>
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 flex-1">
          {DESCRIPTION}
          
        </div>
         
         {LINK_ITEM}
         {REVIEW_ITEM}
         {EDIT_ITEM}
         {DATE} 
      </div>
    </div>
  </div>
`;

cardHtmlTemplate[VERTICAL] = `
<a href="{LINK}">
<div class="lg:flex xl:flex md:flex mb-4 rounded-lg shadow-lg hover:shadow-outline">
  <div class="lg:w-1/4 md:w-1/4 sm:w-full h-auto lg:flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('{PIC_URL}')">
        <img src="{PIC_URL}" style="opacity:0;width:50%" />
        {IFRAME}
  </div>
    <div class="p-2 m-2 lg:flex md:w-1/5 lg:w-1/5 sm:w-full">
        <h3>{TITLE}</h3>
    </div>
    {COMING_SOON}
    <div class="carddescription m-2 p-2 lg:flex-initial md:w-1/2 lg:w-1/2 sm:w-full">
      <p class="text-grey-darker text-base">
        {DESCRIPTION} 
      </p>
      {LINK_ITEM}
      {EDIT_ITEM}
    </div>
</div>
</a>
`;

cardHtmlTemplate[HORIZONTAL_NOENGAGE] = `
  <div class="clickablecard w-full sm:w-1/2 {WIDTH} flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
    <a href="{LINK}" class="cardmainlink"></a>
      <div class="{BG_SIZE} h-48" style="background-image: url('{PIC_URL}');">
          {IFRAME}
      </div>
      {COMING_SOON}
      <div class="p-4 flex-1 flex flex-col">
        <span class="cardLabel"> 
        {LABEL} {MODULE_NUM}
        </span>
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="carddescription mb-4 flex-1">
          {DESCRIPTION}
        </div>
         {DATE} 
         {LINK_ITEM}
         {REVIEW_ITEM}
         {EDIT_ITEM}
      </div>
    </div>
  </div>
`;

// TODO - this might not be a better fit as something not a template?

cardHtmlTemplate[PEOPLE] = `
<!-- <style>
  .codegena{position:relative;width:100%;height:0;padding-bottom:56.27198%;
  .codegena iframe{position:absolute;top:0;left:0;width:100%;height:100%;}
</style>-->
  
  
  <div class="clickablecard w-full sm:w-1/2 md:w-1/2 flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}" class="cardmainlink"></a>
      <div class="w-full"><iframe src='https://player.vimeo.com/video/226525600?&title=0&byline=0'></iframe></div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        <span class="cardLabel">
        {LABEL} {MODULE_NUM}
        </span>
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="carddescription mb-4 flex-1">
          {DESCRIPTION}
          
        </div>
        </a>
         {LINK_ITEM}
         {EDIT_ITEM}
         {DATE} 
      </div>
    </div>
  </div>
`;

// Implement the assessment template

cardHtmlTemplate[ASSESSMENT] = `
<div class="clickablecard lg:max-w-full w-full lg:flex xl:flex md:flex mb-6 rounded-lg shadow-lg hover:shadow-outline"> 
    <!-- padding kludge -->
    <!-- <div>&nbsp;</div> -->
    <div class="h-auto">
          <a href="{LINK}" class="cardmainlink"></a>
          <h1 class="mt-2 ml-2 font-extrabold rounded-full h-16 w-16 flex items-center justify-center border-2 border-black bg-red text-white ">{MODULE_NUM}</h1>
          <p class="text-xs p-2 pr-6">Weight: <span class="font-bold">{WEIGHTING}</p>
        
        <!-- date -->
        {DATE}
        
    </div>
    <div class="m-2">&nbsp;</div>
    {COMING_SOON}
    <div class="carddescription m-2">
          <div class="mb-4">
<h3 class="font-bold">{TITLE}</h3>
<p class="text-sm">{ASSESSMENT_TYPE}</p>
<p class="text-sm">Learning outcomes: {LEARNING_OUTCOMES}</p>
 </div>
 
 {DESCRIPTION}
 
 {LINK_ITEM}
 {EDIT_ITEM}
 
</div>
</div>
`;

// template to add the "ENGAGE" link to (more strongly) indicate that the card links somewhere

var linkItemHtmlTemplate = Array(NUM_TEMPLATES);

linkItemHtmlTemplate[HORIZONTAL] = `
        <p>&nbsp;<br /> &nbsp;</p>
        <div class="p-4 absolute pin-r pin-b">
           <a href="{LINK}" class="gu-engage"><div class="hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            {ENGAGE}
        </div></a>
        </div>
        `;

linkItemHtmlTemplate[VERTICAL] = '';
linkItemHtmlTemplate[HORIZONTAL_NOENGAGE] = '';
linkItemHtmlTemplate[PEOPLE] = '';
linkItemHtmlTemplate[ASSESSMENT] = '';

// TODO: need to decide how and what this will look like
// linkItemHtmlTemplate[1] = '<p><strong>Engage</strong></p>';
linkItemHtmlTemplate[VERTICAL] = '';

//* ****************************************************************
// Templates for the "Mark Review" and "Reviewed" features

var markReviewLinkHtmlTemplate = Array(NUM_TEMPLATES);
var markUnReviewedLinkHtmlTemplate = Array(NUM_TEMPLATES);

markReviewLinkHtmlTemplate[HORIZONTAL] = `
<div class="p-4 absolute pin-l pin-b">
     <a href="{LINK}"><button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
     <span class="font-bold rounded-full px-2 py-1 bg-yellow text-black">&#x26a0;</span>&nbsp; {MARK_REVIEWED}</button></a>
</div>
        `;

markUnReviewedLinkHtmlTemplate[HORIZONTAL] = `
<div class="p-4 absolute pin-l pin-b">
    <a href="{LINK}"><button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
                    <span class="font-bold rounded-full px-2 py-1 bg-green text-white">&#10003;</span>&nbsp;{REVIEWED}</button></a>
</div>
`;

markReviewLinkHtmlTemplate[VERTICAL] = '';
markUnReviewedLinkHtmlTemplate[VERTICAL] = '';
markReviewLinkHtmlTemplate[HORIZONTAL_NOENGAGE] =
  markReviewLinkHtmlTemplate[HORIZONTAL];
markUnReviewedLinkHtmlTemplate[HORIZONTAL_NOENGAGE] =
  markUnReviewedLinkHtmlTemplate[HORIZONTAL];
markReviewLinkHtmlTemplate[PEOPLE] = '';
markUnReviewedLinkHtmlTemplate[PEOPLE] = '';
markReviewLinkHtmlTemplate[ASSESSMENT] = '';
markUnReviewedLinkHtmlTemplate[ASSESSMENT] = '';

// Template for the calendar/date tab

var dateHtmlTemplate = Array(NUM_TEMPLATES);
var dualDateHtmlTemplate = Array(NUM_TEMPLATES);

dateHtmlTemplate[HORIZONTAL] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-t border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white py-1 border-l border-r border-black">
      	     {MONTH}
          </div>
          <div class="pt-1 border-l border-r border-b border-black rounded-b">
      	     <span class="text-2xl font-bold">{DATE}</span>
          </div>
        </div>
`;

dateHtmlTemplate[ASSESSMENT] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24  pin-b pin-l"> 
          <div class="bg-black text-white py-1 text-xs">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white py-1">
      	     {MONTH}
          </div>
          <div class="pt-1 border-l border-r border-b rounded-b">
      	     <span class="text-2xl font-bold">{DATE}</span>
          </div>
        </div>
`;

dualDateHtmlTemplate[HORIZONTAL] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white flex items-stretch py-1 border-l border-r border-black">
              <div class="w-1/2 flex-grow">{MONTH_START}</div>
              <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>
              <div class="w-1/2">{MONTH_STOP}</div>
          </div>
          <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1">
      	     <div class="w-1/2 text-2xl flex-grow font-bold">{DATE_START}</div>
      	     <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>
              <div class="w-1/2 text-2xl font-bold">{DATE_STOP}</div>
          </div>
         </div> 
`;

dualDateHtmlTemplate[ASSESSMENT] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24  pin-b pin-l">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-t border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white flex items-stretch py-1 border-l border-r border-black">
              <div class="w-1/2 flex-grow">{MONTH_START}</div>
              <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>
              <div class="w-1/2">{MONTH_STOP}</div>
          </div>
          <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1 rounded-b">
      	     <div class="w-1/2 text-2xl flex-grow font-bold">{DATE_START}</div>
      	     <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>
              <div class="w-1/2 text-2xl font-bold">{DATE_STOP}</div>
          </div>
         </div> 
`;

var comingSoonHtmlTemplate = Array(NUM_TEMPLATES);

comingSoonHtmlTemplate[HORIZONTAL] = `
<div class="cardComingSoon p-4 flex bg-yellow-light"> 
    <span>🚧</span>&nbsp;
    <span>{COMING_SOON_LABEL} {MONTH} {DATE} ({TIME})</span>
</div>
`;
comingSoonHtmlTemplate[HORIZONTAL_NOENGAGE] =
  comingSoonHtmlTemplate[HORIZONTAL];
comingSoonHtmlTemplate[PEOPLE] = comingSoonHtmlTemplate[HORIZONTAL_NOENGAGE];
comingSoonHtmlTemplate[VERTICAL] = comingSoonHtmlTemplate[HORIZONTAL_NOENGAGE];

var dualComingSoonHtmlTemplate = Array(NUM_TEMPLATES);

dualComingSoonHtmlTemplate[HORIZONTAL] = `
<div class="cardComingSoon p-4 flex bg-yellow-light"> 
    <span>🚧</span>&nbsp;
    <span>{COMING_SOON_LABEL} {MONTH_START} {DATE_START} ({TIME_START})-{MONTH_STOP} {DATE_STOP} ({TIME_STOP})</span>
</div>
`;
dualComingSoonHtmlTemplate[HORIZONTAL_NOENGAGE] =
  dualComingSoonHtmlTemplate[HORIZONTAL];
dualComingSoonHtmlTemplate[PEOPLE] =
  dualComingSoonHtmlTemplate[HORIZONTAL_NOENGAGE];
dualComingSoonHtmlTemplate[VERTICAL] =
  dualComingSoonHtmlTemplate[HORIZONTAL_NOENGAGE];

// week templates

var weekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1">
      {WEEK}
    </div>
    `;

var dualWeekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1 border-l border-r border-black">
      Week {WEEK_START} to {WEEK_STOP}
    </div>
    `;

var examPeriodTemplate = `
<div class="bg-yellow-lighter text-black py-1 border-l border-r border-black">
      Exam Period
    </div>
`;

dateHtmlTemplate[VERTICAL] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[HORIZONTAL_NOENGAGE] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[PEOPLE] = '';
// dateHtmlTemplate[ASSESSMENT] = dateHtmlTemplate[HORIZONTAL];

dualDateHtmlTemplate[VERTICAL] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[HORIZONTAL_NOENGAGE] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[PEOPLE] = '';
// dualDateHtmlTemplate[ASSESSMENT] = dualDateHtmlTemplate[HORIZONTAL];

// Template to allow editors to view the original Bb content item
// Same for all templates
var editLinkTemplate = `
	        <div class="text-xs grey-light">
	           [<a href="#{ID}">View origin</a>]
	        </div>`;

// Message to display on a card if EDIT mode on and the item is hidden
const HIDDEN_FROM_STUDENTS =
  '<div class="inline-block bg-yellow text-black text-xs rounded-t rounded-b">This item is <strong>hidden from students</strong></div>';

// LOCATION > 0 means view mode. < 0 means EDIT mode
var LOCATION = 1;

// GLOBALS

const DEFAULT_CARD_LABEL = 'Module';

// Big kludge for HDR

function hideJourney($) {
  // console.log("---------- RUNNING THE tmp script");

  var tweak_bb_active_url_pattern = 'listContent.jsp';
  window.tweak_bb = {
    display_view: location.href.indexOf(tweak_bb_active_url_pattern) > 0,
    page_id: '#content_listContainer',
    row_element: 'li',
  };

  var journeyTitle = jQuery(tweak_bb.page_id + ' > ' + tweak_bb.row_element)
    .find('.item h3')
    .filter(':contains("Your HDR Journey")')
    .eq(0);
  // console.log(journeyTitle);
  var journey = jQuery(journeyTitle)
    .parent()
    .next('div.details')
    .children('.vtbegenerated');
  // console.log(journey);
  var child = jQuery(journey).children('.yourJourney');
  // console.log(child);
  jQuery(child).unwrap();
}
/** **
 * Adapt this approach https://www.taniarascia.com/javascript-mvc-todo-app/ ??
 * -- but controller is probably very simple
 * REDESIGN
 * getCardItems - Model
 * - include a bbLearnContentArea class - to abstract all the Blackboard stuff
 *   - this can be a singleton for the window/page
 * -
 * addCardInterface - View
 * cardsInterface - Controller - perhaps handle some blackboard stuff
 * - create the bbLearnContentArea singelton reused in ContentInterface
 *
 *
 *
 * pageContent = bbLearrnContentArea() - add the singleton
 * cards = new cardItems( pageContent) - could be reused in componets
 * display = new cardView( cards)
 * controller = new cardController( cards,display)
 * html = display.render()
 *
 */

import bbLearnContentArea from './bbLearnContentArea.js';
import addCardDocumentation from './cardDocumentation.js';
import guCards from './guCards.js';
import guCardsView from './guCardsView.js'
import TERM_DATES from './term-dates';

//const bb = require("./bbLearnContentArea");

var TERM;
var YEAR;

document.addEventListener('DOMContentLoaded', cardsInterface);

export default function cardsInterface() {
    // TODO
    // - add in the CSS for the instructions??
    // - remove term-dates and use the university-date-calendar singleton

  let bbPage = new bbLearnContentArea();
  addCardDocumentation();

  // TODO remove the global kludges
  TERM = bbPage.term;
  YEAR = bbPage.year;
  // TODO location and a move eidtMode may be reversed
  LOCATION = bbPage.editMode;
  //LOCATION = location.href.indexOf("listContent.jsp");

  // cardMetaDaa in cards.cardMetaData
  let cards = new guCards(bbPage);

  let display = new guCardsView(cards);
  // html is a lit object
  const html = display.render()

  console.log("PARAMTERES");
  console.log(cards.parameters);


  /*window.addEventListener('load', (event) => {
      addCardInterface(cards.cardMetaData);
  }); */

  return false;
  //------------------------- ORIGINAL BELOW HERE  -------------------------


  /* Get the titles and descriptions of the items on the page */
//  var items = getCardItems($);

  /* generate the cards interface for the tiems */
  // addCardInterface(items);
  jQuery(window).on('load', addCardInterface(items));

  // remove click event handler from engage buttons

  // Add event handler for the engage links
  /*jQuery(".gu-engage").click( function(e) {
  
              e.stopPropagation();
      }); */

  /** ------ cards should be created by now -- */
  /* But make all the links in carddescription stop propagation */
  var cardContent = jQuery('.carddescription [href]').not('.gu-engage');

  for (var i = 0; i < cardContent.length; i++) {
    cardContent[i].addEventListener(
      'click',
      function (e) {
        // aim here is to allow internal links to override the
        // cardmainlink
        e.stopPropagation();
      },
      false
    );
  }

  /* Make all of the cards clickable by adding an event handler  */
  // Does this unwrap actually do anything???
  // jQuery( ".cardmainlink[href='undefined'" ).contents().unwrap();
  // return true;
  cards = document.querySelectorAll('.clickablecard');
  // var cards = document.querySelectorAll(".cardmainlink");
  for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener(
      'click',
      function (event) {
        var link = this.querySelector('.cardmainlink');

        if (link !== null) {
          // prevent clicking on a undefined blackboard link
          if (link.match(/blackboard\/content\/undefined$/)) {
            console.log('Undefined');
          } else {
            link.click();
          }
        }
      },
      false
    );
  }

  // if we want the images to be hidden, hide them at the end
  if (HIDE_IMAGES) {
    jQuery('.bg-cover').hide();
  }
  // check if the item icons exists, before trying to remove them
  let checkIcon = setInterval(function () {
    if (jQuery('img.item_icon').length) {
      removeBlackboardIcon(cardInterface);
      clearInterval(checkIcon);
    }
  }, 100);

  //    jQuery("ul#content_listContainer").show();
}



//------------------------------------------------------
// FUNCTIONS to handle card meta data changes

// handleCardImage()
// - given value associated with "card image", could be URL or html

function handleCardImage(param) {
  let picUrl = '',
    cardBGcolour = 'black';

  // is it a data URI, just return it
  const regex = /^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/;
  if (regex.test(param)) {
    return [param, cardBGcolour];
  }

  // check to see if it's a colour, rather than an image
  // TODO might need to modify identifyPicUrl to remove extraneous
  // lead html if there is a href?? after img src is checked??
  picUrl = identifyPicUrl(param);
  cardBGcolour = identifyCardBackgroundColour(param);

  // TODO/CHECK previously there was a test to remove a trainling </p> from end
  // Maybe this should be handled in the picURL

  return [picUrl.trim(), cardBGcolour];
}

// handleCardImageIframe
// - given the HTML for an iframe, modify any height/width params
//   to be more responsive

function handleCardImageIframe(param) {
  // replace the width and height
  let x = param.match(/width="[^"]+"/i);
  if (x) {
    param = param.replace(x[0], 'width="100%"');
  }
  x = param.match(/height="[^"]+"/i);
  if (x) {
    param = param.replace(x[0], 'height="auto"');
  }
  return param;
}

// handleCardImageSize
// - return contain if set

function handleCardImageSize(param) {
  if (param.includes('contain')) {
    return 'contain';
  }
  return '';
}

//* *************************************************
// handleCardDate( description )
// - given a description for an item find and parse Card Date
// - return an object that has two members
//   - start - start or only date {date:??,month:??}
//   - stop  - end date
// Options include
// - specify specific date by text
//          Card Date: Mar 5
// - specify date by text and time
//          Card Date: HH:MM Mar 5
// - specify date by week of Griffith term (monday)
//          Card Date: Week 1
// - specify date by week of Griffith term (monday) and time
//          Card Date: HH:MM Week 1
// - specify a date range
//          Card Date: Mar 5-Mar 10
//          Card Date: Week 3-5
// - specify a day of the week
//          Card Date: Monday Week 5
//          Card Date: Mon Week 5
// - specify a day of the week
//          Add HH::MM to the front of the above

function handleCardDate(param) {
  let empty1 = { date: '', week: '' };
  let empty2 = { date: '', week: '' };
  let date = { start: empty1, stop: empty2 }; // object to return

  param = param.replace(/<[^>]+>/, '');

  // is it a range (i.e. contain a -)
  let m = param.match(/^(.*)-(.*)$/);

  if (m) {
    // get first date and break it down
    date.start = parseDate(m[1]);
    // get second date and break it down
    // TODO Week 3-5 results in m[2] being just 5 (need to add week)
    // m[2]==int then add week

    date.stop = parseDate(m[2].trim(), true);
    //        if ( /^\+?(0|[1-9]\d*)$/.test(m[2].trim()) ) {
    //           m[2] = "Week ".concat(m[2].trim());
    //      }
    //     date.stop = parseDate(m[2]);
    if (date.stop.time === '') {
      date.stop.time = '23:59';
    }
  } else {
    // not a range
    // get the date and break it down
    date.start = parseDate(param);
  }

  if (typeof date === 'undefined') {
    return { start: empty1, stop: empty2 };
  }

  // if no time defined, set the default (midnight)
  if (typeof date.start !== 'undefined' && date.start.time === '') {
    date.start.time = '0:01';
  }
  return date;
}

/**
 * @function parseDate
 * @param {String} param
 * @param {Boolean} endRange is the date the end of a date range?
 * @returns {Object} date
 * @description Convert string date - (HH:MM) (Week 1) (Mar 25) into date
 *   If endRange and date is trimester week, then get the date for Friday
 */

function parseDate(param, endRange = false) {
  let date = {}; // object to return
  let time = '';

  // check for a time at the start of the date and save it away
  //  then add it at the end
  // HH:MM 24-hour format, optional leading 0, but with whitespace at end
  const regex = /\s*([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s*$/;
  let m = param.match(regex);

  if (m) {
    // save the time
    time = m[0];
    // remove time from param
    param = param.replace(regex, '');
  }
  // a number by itself is the scond part of a week period
  // add week
  if (/^\+?(0|[1-9]\d*)$/.test(param)) {
    param = 'Week '.concat(param);
  }

  // is it a week of trimester
  m = param.match(/^\s*week\s*([0-9]*)/i);
  if (m) {
    let week = m[1];
    if (!endRange) {
      // if not end of range, just get Monday
      date = getTermDate(week);
    } else {
      // end of range should be set to Friday
      date = getTermDate(week, true, 'Fri');
    }
  } else {
    // does it have a day of week
    // start date becomes start of week + number of days in
    m = param.match(
      /^\s*\b(((mon|tues|wed(nes)?|thu|thur(s)?|fri|sat(ur)?|sun)(day)?))\b\s*week *([0-9]*)\s*$/i
    );
    if (m) {
      const day = m[1];
      const week = m[m.length - 1];
      date = getTermDate(week, true, day);
    } else {
      // is it the an actual date
      m = param.match(/ *([a-z]+) ([0-9]+)/i);
      if (m) {
        date = { month: m[1], date: m[2], year: DEFAULT_YEAR };
      }
      // else {
      // Fall back to check for exam period
      //   m = param.match(/ *exam *(period)*/i);
      //   if (m) {
      //       date.start = getTermDate('exam');
      //       date.stop = getTermDate('exam', false);
      //    }
      // }
    }
  }
  if (typeof date !== 'undefined') {
    if (time !== '') {
      date.time = time;
    } else {
      date.time = '';
    }
  }

  return date;
}

// Given some HTML, remove all the HTML code, trim and return the text

function cleanTrimHtml(html) {
  const aux = document.createElement('div');
  aux.innerHTML = html;
  return aux.innerText.trim();
}
// handleCardLabelNumber
// - given hash with last number for each label type and label and number
//   return the appropriate [ label, number] to use for the card
// - label is the label specified for the card,
//   - if nothing, default to module
// - number specify card number,
//   - if nothing & nothing in numbering element set to 1,
//   - else set to the next value from numbering element
// Labels can only ever be text

// storage for the multiple label numberings used across all cards
var CARD_LABEL_NUMBERING = {};

function handleCardLabelNumber(label, number) {
  // Handle the cases where label is
  // - empty - we don't want a label
  // - undefined - we want the default label

  // ensure label is empty HTML (incl &nbsp; as empty)
  let trimLabel = cleanTrimHtml(label);

  if (trimLabel === '') {
    // return no label or number if the label is empty (but defined)
    return ['', ''];
  } else if (typeof number !== 'undefined' && number.match(/none/i)) {
    // if there is a card number and it is the word "none", then
    // return the label and an empty number
    // TODO, should this be label of trimLabel. i.e allow user defined
    // html to be included as part of the label?
    return [label, ''];
  } else if (typeof label === 'undefined') {
    // set the label to the DEFAULT if no label specified
    // numbering gets decided below.
    trimLabel = DEFAULT_CARD_LABEL;
    label = DEFAULT_CARD_LABEL;
  }

  // Update the numbering schemes
  // - no existing numbering, set to 1
  // - otherwise increment existing
  if (!(trimLabel in CARD_LABEL_NUMBERING)) {
    CARD_LABEL_NUMBERING[trimLabel] = 1;
  } else {
    // if it does exist increment to next value
    CARD_LABEL_NUMBERING[trimLabel] += 1;
  }

  // if specific number specified, set numbering to that
  if (typeof number !== 'undefined') {
    CARD_LABEL_NUMBERING[trimLabel] = parseInt(number);
  }

  return [label, CARD_LABEL_NUMBERING[trimLabel]];
}


/**
 * @function removeBlackboardIcon
 * @param {Object} cardInterface jQuery object for where the card interface will go
 * @description If exists, update cardInterface to remove Blackboard icon
 */

function removeBlackboardIcon(cardInterface) {
  let container = jQuery(cardInterface).parent().parent();
  // hide the icon
  let icon = jQuery(container).find('img.item_icon').css('display', 'none');
  // update the padding on the div
  let div = jQuery(container).find('div.details').css('padding-left', '10px');
}

/** **
 * addCardInterface( items )
 * - Given an array of items to translate into cards add the HTML etc
 *   to generate the card interface
 * - Add the card interface to any item that has a title including
 *     "Card Interface:" with an optional title
 *
 */

function addCardInterface(items) {
  // Define which template to use
  let template = HORIZONTAL;
  let linkTemplate = HORIZONTAL;
  let engageVerb = 'Engage';

  // Define the text for Review Status
  let MARK_REVIEWED = 'Mark Reviewed';
  let REVIEWED = 'Reviewed';
  let NO_CARD_NUMBER = false;
  let NO_COMING_SOON = false;

  // get the content item with h3 heading containing Card Interface
  var cardInterface = jQuery(
    window.tweak_bb.page_id + ' > ' + window.tweak_bb.row_element
  )
    .find('.item h3')
    .filter(function (x) {
      return this.innerText.toLowerCase().includes('card interface');
    })
    .eq(0);

  if (cardInterface.length === 0) {
    console.log(
      "Card: Can't find item with heading 'Card Interface' in which to insert card interface"
    );
    return false;
  } 
    // get the title - text only, stripped of whitespace before/after
  //  console.log("LOGGING IS " + LOGGING);
  // make the h3 for the Card Interface item disappear
  // (Can't hide the parent as then you can't edit via Bb)
  // Need to have the span in order to be able to reorder
  cardInterface.html('<span class="reorder editmode"></span>');
  // Get the content area in which to insert the HTML
  var firstItem = cardInterface.parent().siblings('.details');

  // Use the card HTML template and the data in items to generate
  // HTML for each card
  var cards = '';
  var moduleNum = 1;
  items.forEach(function (idx) {
    let cardHtml = cardHtmlTemplate[template];
    let linkHtml = linkItemHtmlTemplate[linkTemplate];

    // coming soon
    // By default comingSoon is empty
    let comingSoon = '';
    // TODO need to only display this if outside the date
    if (typeof idx.comingSoon !== 'undefined' && !NO_COMING_SOON) {
      if (!inDateRange(idx.comingSoon, false)) {
        // we have coming soon and NOT in the available date range
        // generate the html
        comingSoon = generateDateHtml(
          comingSoonHtmlTemplate[template],
          dualComingSoonHtmlTemplate[template],
          idx.comingSoon
        );
        comingSoon = comingSoon.replace(
          '{COMING_SOON_LABEL}',
          idx.comingSoonLabel
        );

        // if students are viewing remove the link stuff
        if (window.tweak_bb.display_view) {
          // don't show an engage button
          linkHtml = '';
          // remove the clickableCard link and hover shadow
          cardHtml = cardHtml
            .replace('clickablecard', '')
            .replace('hover:outline-none hover:shadow-outline ', '');
        }
      }
    }
    cardHtml = cardHtml.replace('{COMING_SOON}', comingSoon);

    // TODO either here, or above in the link section need to remove
    // the link
    cardHtml = cardHtml.replace('{WIDTH}', WIDTH);

    // replace the default background colour if a different one
    // is specific
    if (idx.cardBGcolour) {
      cardHtml = cardHtml.replace(
        /background-color:\s*rgb\(255,255,255\)/i,
        'background-color: ' + idx.cardBGcolour
      );
    }

    // <div class="bg-cover h-48" style="background-image: url('{PIC_URL}'); //background-color: rgb(255,255,204)">{IFRAME}
    // replace the Engage verb

    //---------------------------------------------
    // Add in the mark review/reviewed options
    var reviewTemplate = '';
    if (idx.review !== undefined) {
      // only do it if there is a review option found
      // check whether its a mark review or review
      // - if link contains markUnreviewed then it has been
      //   reviewed
      if (idx.review.match(/markUnreviewed/)) {
        reviewTemplate = markUnReviewedLinkHtmlTemplate[template];
        reviewTemplate = reviewTemplate.replace('{REVIEWED}', REVIEWED);
      } else {
        // it's the other one which indicates it has not been reviewed
        reviewTemplate = markReviewLinkHtmlTemplate[template];

        reviewTemplate = reviewTemplate.replace(
          '{MARK_REVIEWED}',
          MARK_REVIEWED
        );
      }
      // set the right link
      reviewTemplate = reviewTemplate.replace('{LINK}', idx.review);
    }
    cardHtml = cardHtml.replace('{REVIEW_ITEM}', reviewTemplate);
    // console.log("template is " + template);
    // Only show module number if there's a label
    if (idx.label !== '') {
      var checkForNum = idx.moduleNum;
      if (NO_CARD_NUMBER) {
        // global setting not to show card numbers
        cardHtml = cardHtml.replace('{MODULE_NUM}', '');
        checkForNum = '';
      } else if (idx.moduleNum) {
        // if there's a hard coded moduleNum use that
        cardHtml = cardHtml.replace('{MODULE_NUM}', idx.moduleNum);
      } else {
        // use the one we're calculating
        // cardHtml = cardHtml.replace('{MODULE_NUM}',moduleNum);
        cardHtml = cardHtml.replace(/\{MODULE_NUM\}/g, idx.moduleNum);
        // checkForNum probably not required
        checkForNum = idx.moduleNum;
      }

      // Update the title, check to see if it starts with label and
      // moduleNum.  If it does, remove them from the title
      // So that the card doesn't duplicate it, but the information is
      // still there in Blackboard
      var regex = new RegExp(
        '^' + idx.label.trim() + '\\s*' + checkForNum + '\\s*[-:]*\\s*(.*)',
        's'
      );
      // const regex = /^Week\s*1\s*[-:]*\s*(.*)/gs;

      var m = idx.title.match(regex);
      // var m = regex.test(idx.title);
      if (m) {
        idx.title = m[1];
        // kludge for COM14 which has a <br> after label in title
        idx.title = idx.title.replace(/^<br\s*\/*>/i, '');
      }
    } else {
      cardHtml = cardHtml.replace('{MODULE_NUM}', '');
    }
    cardHtml = cardHtml.replace('{LABEL}', idx.label);

    // ------------------ set the card image

    // Two options for BG_SIZE
    // 1. cover (bg-cover)
    //    Default option. Image covers the entire backgroun
    // 2. contain (bg-contain bg-no-repeat)
    //    Entire image must fit within the card

    if (idx.bgSize === 'contain') {
      cardHtml = cardHtml.replace(
        /{BG_SIZE}/,
        'bg-contain bg-no-repeat bg-center'
      );
    } else {
      cardHtml = cardHtml.replace(/{BG_SIZE}/, 'bg-cover');
    }

    // figure out which image we're going to show
    var picUrl = setImage(idx);

    // replace the {IMAGE_URL} variable if none set
    if (!idx.hasOwnProperty('iframe')) {
      cardHtml = cardHtml.replace(/{IFRAME}/g, '');
    } else {
      cardHtml = cardHtml.replace(/{IFRAME}/g, idx.iframe);
      // set pic URl to empty so non is provided
      picUrl = '';
    }
    cardHtml = cardHtml.replace(/{PIC_URL}/g, picUrl);
    cardHtml = cardHtml.replace('{TITLE}', idx.title);
    cardHtml = cardHtml.replace(/\{ASSESSMENT[_ ]TYPE\}/g, idx.assessmentType);
    cardHtml = cardHtml.replace(/\{WEIGHTING\}/g, idx.assessmentWeighting);
    cardHtml = cardHtml.replace(
      /\{LEARNING_OUTCOMES\}/g,
      idx.assessmentOutcomes
    );

    // Get rid of some crud Bb inserts into the HTML
    let description = idx.description.replace(/<p/g, '<p class="pb-2"');
    description = description.replace(/<a/g, '<a class="underline"');
    cardHtml = cardHtml.replace('{DESCRIPTION}', description);
    // Does the card link to another content item?
    //	    console.log( " template is " + template + " and H_E " + HORIZONTAL_NOENGAGE);
    if (idx.link) {
      // add the link

      linkHtml = linkHtml.replace('{ENGAGE}', engageVerb);
      cardHtml = cardHtml.replace('{LINK_ITEM}', linkHtml);
      // if there is a label and no hard coded moduleNum,
      //  then increment the module number
      // TENTATIVE
      /*          if (idx.label !== "" && !idx.moduleNum) {
                                moduleNum++;
                            } */
    } else {
      // if (template!==HORIZONTAL_NOENGAGE) {
      // remove the link, as there isn't one
      cardHtml = cardHtml.replace('{LINK_ITEM}', '');
      cardHtml = cardHtml.replace(/<a href="{LINK}">/g, '');
      cardHtml = cardHtml.replace('</a>', '');
      // remove the shadow/border effect
      cardHtml = cardHtml.replace('hover:outline-none', '');
      cardHtml = cardHtml.replace('hover:shadow-outline', '');
      // don't count it as a module
      //  cardHtml = cardHtml.replace(idx.label + ' ' + moduleNum, '');
      // moduleNum--;
    }

    // If there is a linkTarget in Blackboard
    if (typeof idx.linkTarget !== 'undefined') {
      // replace "{LINK}" with "{LINK}" target="linkTarget"
      cardHtml = cardHtml.replace(
        /"{LINK}"/g,
        '"{LINK}" target="' + idx.linkTarget + '"'
      );
    }

    if (typeof idx.link !== 'undefined') {
      cardHtml = cardHtml.replace(/{LINK}/g, idx.link);
    } else {
      cardHtml = cardHtml.replace(
        /<a href="{LINK}" class="cardmainlink">/g,
        ''
      );
      cardHtml = cardHtml.replace(/class="clickablecard /, 'class="');
    }

    // Should we add a link to edit/view the original content
    if (location.href.indexOf('listContentEditable.jsp') > 0) {
      const editLink = editLinkTemplate.replace('{ID}', idx.id);
      cardHtml = cardHtml.replace(/{EDIT_ITEM}/, editLink);
    } else {
      // cardHtml = cardHtml.replace(/{EDIT_ITEM}/,'');

      // editLink = editLinkTemplate.replace('{ID}', idx.id);
      const editLink = '<div><a href="#hello">&nbsp;</a></div>';
      cardHtml = cardHtml.replace(/{EDIT_ITEM}/, editLink);
    }

    // standard date
    let date = '';
    date = generateDateHtml(
      dateHtmlTemplate[template],
      dualDateHtmlTemplate[template],
      idx.date
    );
    date = date.replace('{DATE_LABEL}', idx.dateLabel);
    cardHtml = cardHtml.replace('{DATE}', date);

    // add the individual card html to the collection
    cards = cards.concat(cardHtml);
  });

  // STick the cards into the complete card HTML
  var interfaceHtml = interfaceHtmlTemplate[template];
  interfaceHtml = interfaceHtml.replace('{CARDS}', cards);
  // Insert the HTML to the selected item(s)
  // return false;
  jQuery(firstItem).append(interfaceHtml);
}

/**
 * @function to12
 * @param {String} t 24 hour
 * @returns {String} time converted to 12 hour with am/pm
 */

function to12(t) {
  if (typeof t === 'undefined') {
    return '';
  }
  // break home and set hh, m
  const regex = /^\s*([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])\s*/;
  let m = t.match(regex);

  // we have a 24 hour time, convert it
  if (m) {
    let h,
      hh,
      mins,
      dd = 'AM';
    hh = parseInt(m[1]);
    mins = parseInt(m[2]);

    h = hh;
    // set PM
    if (h >= 12) {
      h = hh - 12;
      dd = 'PM';
    }
    if (h == 0) {
      h = 12;
    }
    if (mins < 10) {
      mins = `0${mins}`;
    }
    return `${h}:${mins} ${dd}`;
  }
  // not a 24 hour time show nothing
  return '';
}

/**
 * @function generateDateHtml
 * @params singleTemplate {String} HTML for a single date
 * @params dualTemplate {String} HTML for a dual date
 * @params date {Object} the date data structure
 * @description parse the date object and use the correct template to
 * construct date html to be added to the card
 */

function generateDateHtml(singleTemplate, dualTemplate, date) {
  // by default no html
  let cardHtml = '';

  if (
    typeof date !== 'undefined' &&
    typeof date.start !== 'undefined' &&
    'month' in date.start
  ) {
    // Do we have dual dates - both start and stop?
    if (date.stop.month) {
      // start and stop dates
      // cardHtml = cardHtml.replace('{DATE}', dualDateHtmlTemplate[template]);
      cardHtml = dualTemplate;
      cardHtml = cardHtml.replace(/{MONTH_START}/g, date.start.month);
      cardHtml = cardHtml.replace(/{DATE_START}/g, date.start.date);
      cardHtml = cardHtml.replace(/{MONTH_STOP}/g, date.stop.month);
      cardHtml = cardHtml.replace(/{DATE_STOP}/g, date.stop.date);
      cardHtml = cardHtml.replace(/{TIME_STOP}/g, to12(date.stop.time));
      cardHtml = cardHtml.replace(/{TIME_START}/g, to12(date.start.time));
      if (!date.start.hasOwnProperty('week')) {
        cardHtml = cardHtml.replace('{WEEK}', '');
      } else {
        // if exam, use that template
        // other wise construct dual week
        let weekHtml = examPeriodTemplate;
        if (date.start.week !== 'exam') {
          weekHtml = dualWeekHtmlTemplate.replace(
            '{WEEK_START}',
            date.start.week
          );
          weekHtml = weekHtml.replace('{WEEK_STOP}', date.stop.week);
        }
        cardHtml = cardHtml.replace('{WEEK}', weekHtml);
      }
    } else {
      // just start date
      // cardHtml = cardHtml.replace('{DATE}', dateHtmlTemplate[template]);
      cardHtml = singleTemplate;
      cardHtml = cardHtml.replace(/{MONTH}/g, date.start.month);
      cardHtml = cardHtml.replace(/{DATE}/g, date.start.date);
      cardHtml = cardHtml.replace(/{TIME}/g, to12(date.start.time));
      //                cardHtml = cardHtml.replace(/{DATE_LABEL}/g, idx.dateLabel);
      if (!date.start.hasOwnProperty('week')) {
        cardHtml = cardHtml.replace('{WEEK}', '');
      } else {
        // SKETCHY TODO change added block around else
        let weekReplace = 'Week ' + date.start.week;
        if (date.start.hasOwnProperty('day')) {
          weekReplace = date.start.day + ' ' + weekReplace;
        }
        let weekHtml = weekHtmlTemplate.replace('{WEEK}', weekReplace);
        cardHtml = cardHtml.replace('{WEEK}', weekHtml);
      }
    }
  }
  return cardHtml;
}

/**
 * @function inDateRange
 * @param cardDate {Object} card.date object
 * @param assumeStop {Boolean} true if assuming a stop date if one not specified
 * @returns {Boolean} true if the current time (or SET_DATE) is within the
 *                  date range
 */

function inDateRange(cardDate, assumeStop = true) {
  if (typeof cardDate !== 'undefined') {
    let start, stop, now;

    // Set now to current date OR SET_DATE if we want to do testing
    if (SET_DATE === '') {
      now = new Date();
    } else {
      now = new Date(SET_DATE);
    }

    // set the start date
    if (cardDate.start.hasOwnProperty('month') && cardDate.start.month !== '') {
      start = convertToDate(cardDate.start);
    }

    // set the card stop date
    // - to card.date.stop if valid
    // - to the end of the week if using a week
    // - to the end of the day if no stop
    if (cardDate.stop.hasOwnProperty('month') && cardDate.stop.month !== '') {
      if (cardDate.stop.time === '') {
        cardDate.stop.time = '23:59';
      }
      stop = convertToDate(cardDate.stop);
    } else if (
      cardDate.start.hasOwnProperty('week') &&
      cardDate.start.week !== ''
    ) {
      // there's no end date, but there is a start week
      // so set stop to end of that week, but only if inWeek is true
      if (cardDate.start.week in TERM_DATES[TERM]) {
        if (assumeStop) {
          stop = new Date(TERM_DATES[TERM][cardDate.start.week].stop);
          stop.setHours(23, 59, 0);
        }
      } else {
        // problem with week, just set it to end of date
        if (typeof start !== 'undefined' && assumeStop) {
          stop = new Date(start.getTime());
          stop.setHours(23, 59, 0);
        }
      }
      /*        } else { // no week for stop, meaning it's just on the day
                              stop = new Date(start.getTime());
                              stop.setHours(23, 59, 0); */
    }

    // figure out if we're in range
    if (typeof stop !== 'undefined') {
      // if stop defined, check in range
      return now >= start && now <= stop;
    } else {
      // check passed start
      return now >= start;
    }
  }
  return false;
}

/**
 * @function convertToDate
 * @param {Object} dateObj
 * @returns {Date} Javascript date object
 * Converts the simple date object into a Javascript date object
 */

function convertToDate(dateObj) {
  // check for valid month??
  let date = new Date(
    dateObj.year,
    MONTHS_HASH[dateObj.month],
    parseInt(dateObj.date)
  );

  // if time set time
  if (dateObj.hasOwnProperty('time') && dateObj.time !== '') {
    // split into hours minutes
    let m = dateObj.time.match(
      /^\s*([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])\s+/
    );

    if (m) {
      date.setHours(m[1], m[2], 0);
    }
  }
  return date;
}

//* ********************
// getTermDate( week, day )
// - given a week of Griffith semester return date for the
//   start of that week
// - optional pass day of the week, add more days Monday=0

function getTermDate(week, startWeek = true, dayOfWeek = 'Monday') {
  if (typeof TERM_DATES[TERM] === 'undefined') {
    return undefined;
  }

  dayOfWeek = dayOfWeek.toLowerCase();
  // console.log("TERM is " + TERM + " week is " + week);
  var date = { date: '', month: '', week: week, year: 0 };
  if (week < 0 || week > 15) {
    if (week !== 'exam') {
      return date;
    }
  }
  var start;
  if (startWeek === true) {
    // setting start week
    if (typeof TERM_DATES[TERM][week] !== 'undefined') {
      start = TERM_DATES[TERM][week].start; // [week].start;
    }
  } else {
    start = TERM_DATES[TERM][week].stop;
  }
  var d = new Date(start);

  // if dayOfWeek is not Monday, add some days
  if (dayOfWeek !== 'monday') {
    var dayToNum = {
      tuesday: 1,
      tue: 1,
      wednesday: 2,
      wed: 2,
      thursday: 3,
      thu: 3,
      friday: 4,
      fri: 4,
      saturday: 5,
      sat: 5,
      sunday: 6,
      sun: 6,
    };
    // add in the day abbreviation so it can appear
    date.day = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substr(1, 2);
    if (dayOfWeek in dayToNum) {
      d.setDate(d.getDate() + dayToNum[dayOfWeek.toLowerCase()]);
    }
  }

  date.month = MONTHS[d.getMonth()];
  date.date = d.getDate();
  date.year = d.getFullYear();

  return date;
}

//* ************************************************************
// picUrl = setImage( card )
// - given card object containing information about a card
// - return picUrl if no active card image
// - return picUrl if there is an active card image, but it's
//   not the date
// - return activePicUrl if there is one and it's not the date

function setImage(card) {
  // only use activePicURL if it is set and there are dates on
  // the card
  if (card.activePicUrl !== '' && typeof card.date !== 'undefined') {
    // there is an activePicUrl, check if it should be active

    // active means that the current date falls within the start/stop
    // dates for the card
    var start, stop, now;

    // Set now to current date OR SET_DATE if we want to do testing
    if (SET_DATE === '') {
      now = new Date();
    } else {
      now = new Date(SET_DATE);
    }

    // set the start date
    if (
      card.date.start.hasOwnProperty('month') &&
      card.date.start.month !== ''
    ) {
      start = new Date(
        parseInt(DEFAULT_YEAR),
        // MONTHS.indexOf(card.date.start.month),
        MONTHS_HASH[card.date.start.month],
        parseInt(card.date.start.date)
      );
    }

    // set the card stop date
    // - to card.date.stop if valid
    // - to the end of the week if using a week
    // - to the end of the day if no stop
    if (card.date.stop.hasOwnProperty('month') && card.date.stop.month !== '') {
      stop = new Date(
        DEFAULT_YEAR,
        MONTHS_HASH[card.date.stop.month],
        card.date.stop.date
      );
      stop.setHours(23, 59, 0);
    } else if (card.date.start.hasOwnProperty('week')) {
      // there's no end date, but there is a start week
      // so set stop to end of that week
      if (card.date.start.week in TERM_DATES[TERM]) {
        stop = new Date(TERM_DATES[TERM][card.date.start.week].stop);
        stop.setHours(23, 59, 0);
      } else {
        // problem with week, just set it to end of date
        if (typeof start !== 'undefined') {
          stop = new Date(start.getTime());
          stop.setHours(23, 59, 0);
        }
      }
    } else {
      // no week for stop, meaning it's just on the day
      stop = new Date(start.getTime());
      stop.setHours(23, 59, 0);
    }

    if (now >= start && now <= stop) {
      return card.activePicUrl;
    }
  }
  return card.picUrl;
}

//* *************************************************************
// cardBGcolour = identifyCardBackgroundColour( value );
// return undefined if value is not a valid CSS colour
// Otherwise return rgb(X,Y,Z)

function identifyCardBackgroundColour(input) {
  // don't both if it's an empty string or a URL (or relative URL)
  let url = input.match(/^\s*http/i) || input.match(/^\//);
  if (input === '' || url) {
    return undefined;
  }
  var div = document.createElement('div'),
    m;
  div.style.color = input;
  // add to DOMTree to work
  document.body.appendChild(div);

  // extract the rgb numbers
  m = getComputedStyle(div).color.match(
    /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
  );
  if (m) {
    return 'rgb(' + m[1] + ',' + m[2] + ',' + m[3] + ')';
  }
  return undefined;
}

//* *************************************************************
// picUrl = identifyPicUrl( value )
// TODO - return "" if value is not a valid URI
//   Otherwise return the value

function identifyPicUrl(value) {
  let re = new RegExp(/img src="([^"]*)/, 'i');
  let m = value.match(re);

  // found an image
  if (m) {
    // not a BBIMG, then return it
    if (!m[1].includes(BBIMG)) {
      console.log("-- doens't include BBIMG");
      return m[1];
    }
    // is a BBIMG try extract the link
    // kludge because I couldn't get registers to work in JS REs
    re = new RegExp(/<a href="([^"]*)">([^>]*)<\/a>/, 'i');
    m = value.match(re);
    if (m) {
      if (m[1] === m[2]) {
        return m[1];
      }
    }
  }

  // is there a link to the image
  re = new RegExp('href="([^"]*)', 'i');
  m = value.match(re);

  // if it's a <a href="picUrl"></a> return the picUrl
  if (m) {
    return m[1];
  }

  // remove all html and just use the text content that's left
  let tmp = document.createElement('DIV');
  tmp.innerHTML = value;
  value = tmp.textContent || tmp.innerText || '';
  // must be just a lone URL TODO check it actually does
  return value;
}

//-----------------------------------------------------------------
// getReviewStatus
// - given a vtbgenerated item from Bb Item, check to see if the
//   parent div contains a review status element (anchor with class
//   button-5)
// - if not return NULL
// - if there is one return the link (which indicates with it's
//   mark reviewed, or reviewed)

function getReviewStatus(vtbgen) {
  // get parent
  var parent = jQuery(vtbgen).parent();

  // check to see if it has the anchor with class button-5
  const review = jQuery(parent).find('a.button-5');

  if (review.length === 0) {
    return undefined;
  } else {
    return jQuery(review).attr('href');
  }
}

