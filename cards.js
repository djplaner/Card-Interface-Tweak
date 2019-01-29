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

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" /></p>
// <link rel="stylesheet" href="https://djon.es/gu/cards.css" />
// Interface design from https://codepen.io/njs/pen/BVdwZB

const HORIZONTAL=0, VERTICAL=1;

// TEMPLATES - by 2

// Define the wrapper around the card interface

var interfaceHtmlTemplate = Array(2);

interfaceHtmlTemplate[HORIZONTAL] = `
<link rel="stylesheet" href="https://djon.es/gu/cards.css" />
<div class="flex flex-wrap -m-3">
 {CARDS}
</div>
`;

interfaceHtmlTemplate[VERTICAL] = `
<link rel="stylesheet" href="https://djon.es/gu/cards.css" />
 {CARDS}
</div>
`;

// template for each individual card

var cardHtmlTemplate = Array(2);

cardHtmlTemplate[HORIZONTAL]=`
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
         {LINK_ITEM}
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
    </div>
</div>
</a>
`;

// template to add the "ENGAGE" link to (more strongly) indicate that the card links somewhere

var linkItemHtmlTemplate = Array(2);

linkItemHtmlTemplate[HORIZONTAL] = `
        <p>&nbsp;<br /> &nbsp;</p>
        <div class="p-4 absolute pin-r pin-b">
           <a href="{LINK}"><button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            Engage
        </button></a>
        </div>
        `;

// TODO: need to decide how and what this will look like
//linkItemHtmlTemplate[1] = '<p><strong>Engage</strong></p>';
linkItemHtmlTemplate[VERTICAL] = '';
/*`
<div class="relative pin-r pin-b m-18"> <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded"> Engage </button> 
        </div>`;*/
        
// Template for the calendar/date tab

var dateHtmlTemplate = Array(2);

dateHtmlTemplate[HORIZONTAL] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs">
             {DATE_LABEL}
          </div>
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

dateHtmlTemplate[VERTICAL] = dateHtmlTemplate[HORIZONTAL];

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
	      
	 if (location.href.indexOf("listContent.jsp") > 0) {
         $(".gutweak").parents("li").hide(); 
	 }

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
	    m = description.match(/[Cc]ard [Ii]mage *: *([^\s<]*)/ );
	    if (m) {
    	    picUrl=m[1];
	        description = description.replace( m[0], "");
	    }
	    
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
	    var month,date,m = description.match(/[Cc]ard [Dd]ate *: *([A-Za-z]*) ([0-9]*)/);
	    if (m) {
    	    month=m[1];
    	    date=m[2];
    	    description = description.replace(m[0],"");
	    }
	    
	    // See if there's a different label for date
	    m = description.match(/[Cc]ard [Dd]ate [Ll]abel *: ([^<]*)/);
	    var dateLabel='Commencing';
	    if (m) {
	        dateLabel=m[1];
	        description = description.replace( m[0], "");
	    }
	    
	    // See if the Course Label should be changed
	    var label="Module";
	    m = description.match(/[Cc]ard [Ll]abel *: *([^<]*)/ );
	    if (m) {
	        label=m[1];
	        description = description.replace( m[0], "");
	    }
	    
	    // need to get back to the header which is up one div, a sibling, then span
	    var header = $(this).parent().siblings(".item").find("span")[2];
	    var title = $(header).html(),link;
	    link = $(header).parent('a').attr('href');
	    
	    // Hide the contentItem  TODO Only do this if display page
	    var tweak_bb_active_url_pattern = "listContent.jsp";
	    if (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ) { 
	        $(this).parent().parent().hide();
	        //console.log( "content item " + contentItem.html());
	    }
	    // save the item for later
	    var item = {title:title, picUrl:picUrl, description:description,
	        link:link,month:month,date:date,label:label,dateLabel:dateLabel};
	    items.push(item);
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
 	
 	// get the content item with h3 heading containing Card Interface
 	var cardInterface = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).find(".item h3").filter(':contains("Card Interface")').eq(0);
 	
 	if ( cardInterface.length === 0){
        console.log("Card: Can't find item with heading 'Card Interface' in which to insert card interface");
        return false;
    } else {
        // parse title to change template, if necessary
        //var cardInterfaceTitle=$(cardInterface + "span:last");
        var cardInterfaceTitle=cardInterface.html();
        
        var m = cardInterfaceTitle.match(/Card Interface *([^<]*) *<\/span>/ );
	    if (m) {
	        templateChoice=m[1];
	        m = templateChoice.match(/[Vv]ertical/ );
	        if (m) {
	            template = VERTICAL;
	        } else if ( templateChoice.match(/[Hh]orizontal/ ) ) {
	            template = HORIZONTAL;
	        }
	    } // if no match, stay with default
        
        /*console.log( "Card interface html " + cardInterface.html());
        console.log( "titla object " + cardInterfaceTitle + "title is " + cardInterfaceTitle.html()); */
    }
    // make the h3 for the Card Interface item disappear
    // (Can't hide the parent as then you can't edit via Bb)
    cardInterface.hide();
 	// Get the content area in which to insert the HTML
 	var firstItem = cardInterface.parent().siblings(".details");//.children('.vtbegenerated');
    
 	// Use the card HTML template and the data in items to generate
 	// HTML for each card
    var cards = "" ;
    var moduleNum = 1;
    items.forEach( function(idx) {
	    var cardHtml=cardHtmlTemplate[template];
	    // Only show module number if there's a label
	    if ( idx.label!=='') {
	        cardHtml = cardHtml.replace('{MODULE_NUM}',moduleNum);
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
	    if ( idx.link ) {
	        // add the link
	        cardHtml = cardHtml.replace('{LINK_ITEM}', linkItemHtmlTemplate[template] );
	    } else {
	        // remove the link, as there isn't one
	        cardHtml = cardHtml.replace('{LINK_ITEM}', '');
	        cardHtml = cardHtml.replace(/<a href="{LINK}">/g,'');
	        cardHtml = cardHtml.replace('</a>','');
	        // remove the shadow/border effect
	        cardHtml = cardHtml.replace('hover:outline-none','');
	        cardHtml = cardHtml.replace('hover:shadow-outline', '');
	        // don't count it as a module
	        cardHtml = cardHtml.replace(idx.label + ' ' + moduleNum, '');
	        moduleNum--;
	    }
	    cardHtml = cardHtml.replace(/{LINK}/g, idx.link);
	    
	    // if there's a date, insert it
	    if ( idx.month ) {
	        cardHtml = cardHtml.replace('{DATE}', dateHtmlTemplate[template] );
	        cardHtml = cardHtml.replace(/{MONTH}/g, idx.month);
	        cardHtml = cardHtml.replace(/{DATE}/g, idx.date);
	        cardHtml = cardHtml.replace(/{DATE_LABEL}/g, idx.dateLabel);
	    } else {
	        cardHtml = cardHtml.replace('{DATE}', '');
	    }
	    cards = cards.concat(cardHtml);
	    moduleNum++;
	});
	
	// STick the cards into the complete card HTML
	var interfaceHtml = interfaceHtmlTemplate[template];
	interfaceHtml = interfaceHtml.replace('{CARDS}',cards);
	// Insert the HTML to the selected item(s)
	//return false;
	$(firstItem).append( interfaceHtml);
}

