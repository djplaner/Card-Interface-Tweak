/* cardsInterface
 * - Given a Blackboard page with a list of items
 * - Find all the items using the expected card data format
 * - Insert into the first item on the page a cards interface
 
 
 * data format
 * - Card's indicating by "Card Image: URL" in the description, though the URL can be empty
 * - Card title - heading of Blackboard item
 * - Card Label - Specify the label to apply to the card (default Module)
 * - Module number - just the order in which they appear in the list
 * - picture - heading includes Card Image:**url** OR inserted image with title attribute = 'Card Image'
 * - description - the rest of the description
 * - DATE
 *   - Card Date: Mar 5
 *     Specify the date to be displayed
 *   - Card Date Label: Due
 *     Specify the label for the date - default Commencing
 */

var TERM_DATES = {
    "3191" : {
         "1" : { "start" : "2019-02-25", "stop":"2019-03-03" } ,
         "2" : { "start" : "2019-03-04", "stop":"2019-03-10" } ,
         "3" : { "start" : "2019-03-11", "stop":"2019-03-17" } ,
         "4" : { "start" : "2019-03-18", "stop":"2019-03-24" } ,
         "5" : { "start" : "2019-03-25", "stop":"2019-03-31" } ,
         "6" : { "start" : "2019-04-01", "stop":"2019-04-07" } ,
         "7" : { "start" : "2019-04-08", "stop":"2019-04-14" } ,
         "8" : { "start" : "2019-04-22", "stop":"2019-04-28" } ,
         "9" : { "start" : "2019-04-29", "stop":"2019-05-05" } ,
         "10" : { "start" : "2019-05-06", "stop":"2019-05-12" },
         "11" : { "start" : "2019-05-13", "stop":"2019-05-19" } ,
         "12" : { "start" : "2019-05-20", "stop":"2019-05-26" } 
         },
    "3195" : {
         "1" : { "start" : "2019-07-08", "stop":"2019-07-14" } ,
         "2" : { "start" : "2019-07-15", "stop":"2019-07-21" } ,
         "3" : { "start" : "2019-07-22", "stop":"2019-07-28" } ,
         "4" : { "start" : "2019-07-29", "stop":"2019-08-04" } ,
         "5" : { "start" : "2019-08-05", "stop":"2019-08-11" } ,
         "6" : { "start" : "2019-08-19", "stop":"2019-08-25" } ,
         "7" : { "start" : "2019-08-26", "stop":"2019-09-01" } ,
         "8" : { "start" : "2019-09-02", "stop":"2019-09-08" } ,
         "9" : { "start" : "2019-09-09", "stop":"2019-09-15" } ,
         "10" : { "start" : "2019-09-16", "stop":"2019-09-22" },
         "11" : { "start" : "2019-09-23", "stop":"2019-09-29" } ,
         "12" : { "start" : "2019-09-30", "stop":"2019-10-01" } 
    }
    };
var TERM="3191";
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// Interface design from https://codepen.io/njs/pen/BVdwZB


// TEMPLATES - by 6

// define the template types
const HORIZONTAL=0, // original 3 cards per row
      VERTICAL=1, // 1 card per row 
      HORIZONTAL_NOENGAGE=2, // original, but no engage
      BY5=3, // horizontal but up to 5 cards per row
      BY5_NOIMAGE = 4, // horizontal, 5 cards, no image
      PEOPLE = 5; // horizontal but show off people (BCI) version

// Whether or not xAPI logging is turned on
// - turned on by adding "logging" to Card Interface
var LOGGING=false;

// Define the wrapper around the card interface

var interfaceHtmlTemplate = Array(5);

interfaceHtmlTemplate[HORIZONTAL] = `
<link rel="stylesheet" href="https://djon.es/gu/cards.css" />


<div id="guCardInterface" class="flex flex-wrap -m-3">
 {CARDS}
</div>
`;

interfaceHtmlTemplate[VERTICAL] = `
<link rel="stylesheet" href="https://djon.es/gu/cards.css" />
 {CARDS}
</div>
`;

interfaceHtmlTemplate[HORIZONTAL_NOENGAGE]=interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[BY5]= interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[BY5_NOIMAGE]= interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[PEOPLE]= interfaceHtmlTemplate[HORIZONTAL];


/*`
<link rel="stylesheet" href="https://djon.es/gu/cards.css" />
<div class="flex -m-1 flex-wrap">
 {CARDS}
</div>
`;**/

// template for each individual card

var cardHtmlTemplate = Array(5);

cardHtmlTemplate[HORIZONTAL]=`
  <div class="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}">
      <div class="bg-cover bg-yellow-lightest h-48" style="background-image: url('{PIC_URL}');">
      <!-- <div class="bg-contain bg-no-repeat bg-center bg-yellow-lightest h-64" style="background-image: url('{PIC_URL}');"> -->
      </div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 flex-1">
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

cardHtmlTemplate[VERTICAL]=`
<a href="{LINK}">
<div class="lg:flex xl:flex md:flex mb-4 rounded-lg shadow-lg hover:shadow-outline">
  <div class="lg:w-1/4 md:w-1/4 sm:w-full h-auto lg:flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('{PIC_URL}')">
        <img src="{PIC_URL}" style="opacity:0;width:50%" />
  </div>
    <div class="p-2 m-2 lg:flex md:w-1/5 lg:w-1/5 sm:w-full">
        <h3>{TITLE}</h3>
    </div>
    <div class="m-2 p-2 lg:flex-initial md:w-1/2 lg:w-1/2 sm:w-full">
      <p class="text-grey-darker text-base">
        {DESCRIPTION} 
      </p>
      {LINK_ITEM}
      {EDIT_ITEM}
    </div>
</div>
</a>
`;


cardHtmlTemplate[HORIZONTAL_NOENGAGE]=`
  <div class="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}"><div class="bg-cover bg-yellow-lightest h-48" style="background-image: url('{PIC_URL}');"></div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 flex-1">
          {DESCRIPTION}
        </div>
        </a>
         {DATE} 
         {EDIT_ITEM}
      </div>
    </div>
  </div>
`;

cardHtmlTemplate[BY5]=`
  <div class="flex flex-col p-2 sm:w-1/3 md:w-1/5">
  <style>
ul { display: block}
li { display: list-item} 
ul { list-style-type: circle}
#guDescription { display: block}
</style>
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
      <a href="{LINK}"><div class="bg-cover bg-yellow-lightest h-48" style="background-image: url('{PIC_URL}');"></div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 flex-1" id="guDescription">
          {DESCRIPTION}
        </div>
        </a>
         {DATE} 
         {EDIT_ITEM}
      </div>
    </div>
  </div>
`;

// TODO rounded cornes?
cardHtmlTemplate[BY5_NOIMAGE]=`
  <div class="flex flex-col p-2 sm:w-1/3 md:w-1/5">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
      <!-- <a href="{LINK}"><div class="bg-cover bg-yellow-lightest h-48" style="background-image: url('{PIC_URL}');"></div></a>-->
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 flex-1">
          {DESCRIPTION}
        </div>
        </a>
         {DATE} 
         {EDIT_ITEM}
      </div>
    </div>
  </div>
`;

// TODO - this might not be a better fit as something not a template?

cardHtmlTemplate[PEOPLE]=`
<!-- <style>
  .codegena{position:relative;width:100%;height:0;padding-bottom:56.27198%;
  .codegena iframe{position:absolute;top:0;left:0;width:100%;height:100%;}
</style>-->
  
  
  <div class="w-full sm:w-1/2 md:w-1/2 flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}">
      <div class="w-full"><iframe src='https://player.vimeo.com/video/226525600?&title=0&byline=0'></iframe></div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 flex-1">
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

// template to add the "ENGAGE" link to (more strongly) indicate that the card links somewhere

var linkItemHtmlTemplate = Array(5);

linkItemHtmlTemplate[HORIZONTAL] = `
        <p>&nbsp;<br /> &nbsp;</p>
        <div class="p-4 absolute pin-r pin-b">
           <a href="{LINK}"><button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            {ENGAGE}
        </button></a>
        </div>
        `;

linkItemHtmlTemplate[VERTICAL] ='';
linkItemHtmlTemplate[HORIZONTAL_NOENGAGE] = '';
linkItemHtmlTemplate[BY5] = '';
linkItemHtmlTemplate[BY5_NOIMAGE] = '';
linkItemHtmlTemplate[PEOPLE] = '';

// TODO: need to decide how and what this will look like
//linkItemHtmlTemplate[1] = '<p><strong>Engage</strong></p>';
linkItemHtmlTemplate[VERTICAL] = '';
/*`
<div class="relative pin-r pin-b m-18"> <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded"> Engage </button> 
        </div>`;*/
        
// Template for the calendar/date tab

var dateHtmlTemplate = Array(5);
var dualDateHtmlTemplate = Array(5);

dateHtmlTemplate[HORIZONTAL] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white py-1">
      	     {MONTH}
          </div>
          <div class="pt-1 border-l border-r border-b">
      	     <span class="text-2xl font-bold">{DATE}</span>
          </div>
          <!-- <div class="pb-2 px-2 border-l border-r border-b rounded-b flex justify-between">
      	    <span class="text-xs font-bold">Fri</span>
      	    <span class="text-xs font-bold">2018</span>
          </div> -->
        </div>
`;

dualDateHtmlTemplate[HORIZONTAL] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white flex items-stretch py-1">
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

weekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1">
      Week {WEEK}
    </div>
    `;
    
dualWeekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1">
      Week {WEEK_START} to {WEEK_STOP}
    </div>
    `;    

dateHtmlTemplate[VERTICAL] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[HORIZONTAL_NOENGAGE] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[BY5] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[BY5_NOIMAGE] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[PEOPLE] = '';

dualDateHtmlTemplate[VERTICAL] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[HORIZONTAL_NOENGAGE] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[BY5] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[BY5_NOIMAGE] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[PEOPLE] = '';

// Template to allow editors to view the original Bb content item
// Same for all templates
var editLinkTemplate = `
	        <div class="text-xs grey-light">
	           [<a href="#{ID}">View original</a>]
	        </div>`;

// Message to display on a card if EDIT mode on and the item is hidden
HIDDEN_FROM_STUDENTS = `<div class="inline-block bg-yellow text-black text-xs rounded-t rounded-b">This item is <strong>hidden from students</strong></div>`;

// LOCATION > 0 means view mode. < 0 means EDIT mode
var LOCATION = 1;

/****
 * TODO
 * - Add a "right now" important way to highlight a card
 * - Configure the number of cards and width of cards (e.g. 2 for assessment)
 * - Fix issues with formatting within the card
 * - Explore the use of opacity to highlight the whole card?
 *     i.e. an overview that goes over the top? or perhaps just shade bottom same blue as the border with white text
 */
 
function cardsInterface($){
	/* define variables based on Bb page type */
	/* used to identify important components in html */
	var tweak_bb_active_url_pattern = "listContent.jsp";
	window.tweak_bb = { display_view: (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ), 
          page_id: "#content_listContainer",
	      row_element: "li" };

    /* Calculate actual term by using id="courseMenuLink"
     * - which includes the courseId */
     
    courseTitle = $("#courseMenu_link").attr('title');
	 if (location.href.indexOf("listContent.jsp") > 0) {
         $(".gutweak").parents("li").hide(); 
	 }
	m = courseTitle.match(/.*\([0-9]*[A-Z]*_([0-9]*)[_A-Z]*\)/i);
    if (m) {
        TERM=m[1];
        if (TERM==='') {
            TERM='3191';
        }
    }
	    
	LOCATION = location.href.indexOf("listContent.jsp");

    var cardInterface = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).find(".item h3").filter(':contains("Card Interface")').eq(0);
 	
 	if ( cardInterface.length === 0){
 	    return false;
 	}
    /* Get the titles and descriptions of the items on the page */
	var items = getCardItems($);
	
	/* generate the cards interface for the tiems */
	addCardInterface(items);
	
}

/***
 * Extract an array of items from the page that have been specified as part 
 * of the card interface
 */

function getCardItems($) {
	// Find all the items that containg Card Image: ??
	var cards = jQuery(tweak_bb.page_id + " > " +tweak_bb.row_element).children(".details").children('.vtbegenerated').filter(":contains('Card Image:')");
	var items=[];
	
	// Loop through each card and construct the items array with card data
	cards.each( function(idx){
        // Parse the description and remove the Card Image data	    
	    var description = $(this).html(),picUrl;
		// - get rid of any &nbsp; inserted by Bb
	    description = description.replace(/&nbsp;/gi, ' ');
	    m = description.match(/[Cc]ard [Ii]mage\s*: *([^\s<]*)/ );
	    if (m) {
    	    picUrl=m[1];
    	    description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    // Find any ItemDetailsHeaders that indicate the item is hidden
	    hidden = $(this).parent().find('.contextItemDetailsHeaders').filter(":contains('Item is hidden from students.')");
	    //.siblings('contextItemDetailsHeaders')
	
	    // Check to see if an image with title "Card Image" has been inserted
	    var inlineImage = $(this).find('img').attr('title', 'Card Image');
	    if (inlineImage.length) {
	        picUrl=inlineImage[0].src;
	        //console.log("item html" + inlineImage[0].outerHTML);
	        description = description.replace(inlineImage[0].outerHTML,"");
	        // Bb also adds stuff when images inserted, remove it from 
	        // description to be placed into card
	        var bb = $.parseHTML(description);
	        // This will find the class
	        stringToRemove = $(description).find('.contextMenuContainer').parent().clone().html();
	        description = description.replace( stringToRemove, '');
	    }
	    
	    // Parse the date for commencing
	    // date will be in object with start and end members
	    var date = handleDate( description );
	    // kludge to modify the local description based on changes
	    // done in handleDate
	    description = date.descrip;
	    
	    // See if there's a different label for date
	    m = description.match(/[Cc]ard [Dd]ate [Ll]abel *: ([^<]*)/);
	    var dateLabel='Commencing';
	    if (m) {
	        dateLabel=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    
	    // See if the Course Label should be changed
	    var label="Module";
	    m = description.match(/[Cc]ard [Ll]abel *: *([^<]*)/ );
	    if (m) {
	        label=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    
	    // Get course number
	    var number='x';
	    m = description.match(/[Cc]ard [Nn]umber *: *([^<]*)/ );
	    if (m) {
	        number=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	        if (number.match(/none/i)) {
	            number='&nbsp;'
	        }
	    }
	    
	    // need to get back to the header which is up one div, a sibling, then span
	    var header = $(this).parent().siblings(".item").find("span")[2];
	    var title = $(header).html(),link;
	    link = $(header).parents('a').attr('href');
	    // get the itemId to allow for "edit" link in card
	    var itemId = $(this).parents('.liItem').attr('id');
	    //console.log("Item id " + itemId + " for link " + link );
	    // Hide the contentItem  TODO Only do this if display page
	    var tweak_bb_active_url_pattern = "listContent.jsp";
	    if (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ) { 
	        $(this).parent().parent().hide();
	        //console.log( "content item " + contentItem.html());
	    }
	    // save the item for later
	    var item = {title:title, picUrl:picUrl, description:description,
	        link:link,date:date,label:label,dateLabel:dateLabel,
	        id:itemId
	    };
	    if (number!=='x' ) {
	        item.moduleNum=number;
	    }
	    // only add the card to display if
	    // - VIEW MODE is on and it's not hidden
	    // - EDIT MODE is on 
	    if ( hidden.length===0 || LOCATION < 0) {
	        // add message that item is hidden to students when EDIT mode on
	        if ( hidden.length===1) {
	            item.description = item.description.concat( HIDDEN_FROM_STUDENTS);
	        }
	        items.push(item);
	    } 
	});
	
	return items;
}

/****
 * addCardInterface( items )
 * - Given an array of items to translate into cards add the HTML etc
 *   to generate the card interface
 * - Add the card interface to any item that has a title including
 *     "Card Interface:" with an optional title
 * 
 */
 
 function addCardInterface( items ) {
   
    // Define which template to use 
    var template = HORIZONTAL;
 	var engageVerb = 'Engage';
 	
 	// get the content item with h3 heading containing Card Interface
 	var cardInterface = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).find(".item h3").filter(':contains("Card Interface")').eq(0);
 	

 	if ( cardInterface.length === 0){
        console.log("Card: Can't find item with heading 'Card Interface' in which to insert card interface");
        return false;
    } else {
        // get the title - text only, stripped of whitespace before/after
        var cardInterfaceTitle= jQuery.trim(cardInterface.text());
        
        //Extract parameters
        var m = cardInterfaceTitle.match(/Card Interface *([^<]*)/ );
	    if (m) {
	        // get list of parameters
	        params = m[1].match(/\S+/g);
	        
	        if ( params ) {
	        params.forEach( function(element) {
	        //    console.log("element is " + element);
	        
	            m = element.match(/[Vv]ertical/ );
	            if (m) {
	                template = VERTICAL;
	            } else if ( element.match(/[Hh]orizontal/ ) ) {
	                template = HORIZONTAL;
	            } else if ( element.match(/[Bb][yY]5[nN][Oo]/)) {
	                template = BY5_NOIMAGE;
	            } else if ( element.match(/[Bb][yY]5/)) {
	                template = BY5;
	            } else if ( element.match(/people/i)) {
	                template = PEOPLE;
	            } else if (element.match(/noengage/i )) {
	                template = HORIZONTAL_NOENGAGE;
	            } else if ( element.match(/logging/i)) {
	                LOGGING = true;
	            } else if ( m = element.match(/engage='([^']*)'/)) {
	                engageVerb = m[1];
	            }
	        });
	        }
	    } // if no match, stay with default
        
    }
    
  //  console.log("LOGGING IS " + LOGGING);
    // make the h3 for the Card Interface item disappear
    // (Can't hide the parent as then you can't edit via Bb)
    cardInterface.hide();
 	// Get the content area in which to insert the HTML
 	var firstItem = cardInterface.parent().siblings(".details");
    
 	// Use the card HTML template and the data in items to generate
 	// HTML for each card
    var cards = "" ;
    var moduleNum = 1;
    items.forEach( function(idx) {
	    var cardHtml=cardHtmlTemplate[template];
	    // replace the Engage verb
	    
	    //console.log("template is " + template);
	    // Only show module number if there's a label
	    if ( idx.label!=='') {
	        if (idx.moduleNum) {
	            // if there's a hard coded moduleNum use that
	            cardHtml = cardHtml.replace('{MODULE_NUM}',idx.moduleNum);
	        } else {
	            // use the one we're calculating
	            cardHtml = cardHtml.replace('{MODULE_NUM}',moduleNum);
	        }
	    } else { 
	       cardHtml = cardHtml.replace('{MODULE_NUM}','');
	    }
	    cardHtml = cardHtml.replace('{LABEL}',idx.label);
	    cardHtml = cardHtml.replace(/{PIC_URL}/g, idx.picUrl);
	    cardHtml = cardHtml.replace('{TITLE}', idx.title);
	    
	    // Get rid of some crud Bb inserts into the HTML
	    description = idx.description.replace(/<p/, '<p class="pb-2"');
	    description = description.replace(/<a/, '<a class="underline"');
	    cardHtml = cardHtml.replace('{DESCRIPTION}', description);
	    // Does the card link to another content item?
//	    console.log( " template is " + template + " and H_E " + HORIZONTAL_NOENGAGE);
	    if ( idx.link ) {
	        
	        
	        // add the link
	        linkHtml = linkItemHtmlTemplate[template];
	        linkHtml = linkHtml.replace( '{ENGAGE}',engageVerb);
	        cardHtml = cardHtml.replace('{LINK_ITEM}',linkHtml);
	        // if there is a label and no hard coded moduleNum, 
	        //  then increment the module number
	        if ( idx.label!=="" && ! idx.moduleNum) {
	          moduleNum++;
	        } 
	        
	    } else {// if (template!==HORIZONTAL_NOENGAGE) {
	        // remove the link, as there isn't one
	        cardHtml = cardHtml.replace('{LINK_ITEM}', '');
	        cardHtml = cardHtml.replace(/<a href="{LINK}">/g,'');
	        cardHtml = cardHtml.replace('</a>','');
	        // remove the shadow/border effect
	        cardHtml = cardHtml.replace('hover:outline-none','');
	        cardHtml = cardHtml.replace('hover:shadow-outline', '');
	        // don't count it as a module
	        cardHtml = cardHtml.replace(idx.label + ' ' + moduleNum, '');
	        //moduleNum--;
	    }
	    cardHtml = cardHtml.replace(/{LINK}/g, idx.link);
	    
	    // Should we add a link to edit/view the original content
	    if (location.href.indexOf("listContentEditable.jsp") > 0) {
	        editLink = editLinkTemplate.replace('{ID}', idx.id);
	        
	        cardHtml = cardHtml.replace(/{EDIT_ITEM}/, editLink );
	    } else {
	        cardHtml = cardHtml.replace(/{EDIT_ITEM}/,'');
	    }
	    
	    // If need add the date visualisation
	    if ( idx.date.start.month ) {
	        // Do we have dual dates - both start and stop?
	        if ( idx.date.stop.month ) {
	            // start and stop dates
	            cardHtml = cardHtml.replace('{DATE}', dualDateHtmlTemplate[template] );
	            cardHtml = cardHtml.replace(/{MONTH_START}/g, 
	                            idx.date.start.month);
	            cardHtml = cardHtml.replace(/{DATE_START}/g, 
	                            idx.date.start.date);
	            cardHtml = cardHtml.replace(/{MONTH_STOP}/g, 
	                            idx.date.stop.month);
	            cardHtml = cardHtml.replace(/{DATE_STOP}/g, 
	                            idx.date.stop.date);
	            cardHtml = cardHtml.replace(/{DATE_LABEL}/g, idx.dateLabel);
	            console.log(idx.date);
	            if ( ! idx.date.start.hasOwnProperty('week')) {
	                cardHtml = cardHtml.replace('{WEEK}','');
	            } else {
	                var weekHtml = dualWeekHtmlTemplate.replace('{WEEK_START}', 
	                            idx.date.start.week);
	                weekHtml = weekHtml.replace('{WEEK_STOP}',
	                    idx.date.stop.week);
	                cardHtml = cardHtml.replace('{WEEK}',weekHtml);
	            }
	        } else {
	            // just start date
	            cardHtml = cardHtml.replace('{DATE}', dateHtmlTemplate[template] );
	            cardHtml = cardHtml.replace(/{MONTH}/g, idx.date.start.month);
	            cardHtml = cardHtml.replace(/{DATE}/g, idx.date.start.date);
	            cardHtml = cardHtml.replace(/{DATE_LABEL}/g, idx.dateLabel);
	            if ( !idx.date.start.hasOwnProperty('week')) {
	                cardHtml = cardHtml.replace('{WEEK}','');
	            } else
	                var weekHtml = weekHtmlTemplate.replace('{WEEK}', idx.date.start.week);
	                cardHtml = cardHtml.replace('{WEEK}',weekHtml);
	        }
	    } else {
	        // no dates at all
	        cardHtml = cardHtml.replace('{DATE}', '');
	    }
	    cards = cards.concat(cardHtml);
	});
	
	// STick the cards into the complete card HTML
	var interfaceHtml = interfaceHtmlTemplate[template];
	interfaceHtml = interfaceHtml.replace('{CARDS}',cards);
	// Insert the HTML to the selected item(s)
	//return false;
	$(firstItem).append( interfaceHtml);
}

//*********************
// getTermDate( week )
// - given a week of Griffith semester return date for the 
//   start of that week

function getTermDate( week ) {
    var date = { date: "", month: "", week: week };
    if (( week<1) || (week>12)) {
        return date;
    }
    var start = TERM_DATES[TERM][week].start;//[week].start;
	//console.log(" Starting date " + start);
	var d = new Date(start);
	date.month=MONTHS[d.getMonth()];
	date.date=d.getDate();
	
	return date;
}
	         
//**************************************************
// handleDate( description )
// - given a description for an item find and parse Card Date
// - return an object that has two members
//   - start - start or only date {date:??,month:??}
//   - stop  - end date
// Options include
// - specify specific date by text
//          Card Date: Mar 5     
// - specify date by week of Griffith term (monday)
//          Card Date: Week 1
// - specify a date range
//          Card Date: Mar 5-Mar 10
//          Card Date: Week 3-5

function handleDate( description ) {
    var month,endMonth,date,endDate,week="",endWeek="";
    var empty1 = { date:"",week:""};
    var empty2 = { date:"",week:""};
	var date = { start: empty1, stop: empty2 } ; // object to return 
	// date by griffith week    
	
    m = description.match(/[Cc]ard [Dd]ate *: *week ([0-9]*)/i);
	if (m) {
	    // check to see if a range was specified
	    x = description.match(/[Cc]ard [Dd]ate *: *week ([0-9]*)-([0-9]*)/i);
	    if (x) {
	        //console.log('ZZZZZZZZZZZZZZZZZZZZZZ handling a range');
	        week = x[1];
	        endWeek = x[2];
	        date.stop = getTermDate( endWeek);
	        //console.log(date.stop);
	            
	        description = description.replace( "<p>"+x[0]+"</p>","");
            description = description.replace(x[0],"");
        } else {
            week = m[1];
	           
            description = description.replace( "<p>"+m[0]+"</p>","");
            description = description.replace(m[0],"");
        }
        
        date.start = getTermDate( week )
        //console.log( " Date " + month + " " + date);
	        
	         
	} else {
	    // TODO need to handle range here
	    
	    m = description.match(/card date *: *([a-z]+) ([0-9]+)/i);
	    if (m) {
	        
	        x = description.match(/card date *: *([a-z]+) ([0-9]+)-+([a-z]+) ([0-9]+)/i);
	        if (x) {
	            
	            date.start = { month: x[1],date: x[2] }
	            date.stop = { month: x[3], date: x[4] }

	            description = description.replace( "<p>"+x[0]+"</p>","");
                description = description.replace(x[0],"");
            } else {
            
                date.start = { month:m[1],date:m[2]};
    	        description = description.replace( "<p>"+m[0]+"</p>","");
    	        description = description.replace(m[0],"");
	        } 
	    }
	}
	date.descrip = description;
	return date;
} 