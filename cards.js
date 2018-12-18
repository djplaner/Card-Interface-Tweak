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
 */

// Interface design from https://codepen.io/njs/pen/BVdwZB
var interfaceHtmlTemplate = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" /></p>
<div class="flex flex-wrap -m-3">
 {CARDS}
</div>
`;

var cardHtmlTemplate = `
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

var linkItemHtmlTemplate = `
        <p>&nbsp;<br /> &nbsp;</p>
        <div class="p-4 absolute pin-r pin-b">
           <a href="{LINK}"><button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            Engage
        </button></a>
        </div>
        `;
        
var dateHtmlTemplate = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs">
             Commencing
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

/** <a href="{LINK}" class="border-t border-grey-light pt-2 text-xs text-grey hover:text-red uppercase no-underline tracking-wide" style="text-align: right;">Engage</a>
 */

/****
 * TO DO
 * 1. Specify the content item into which card interface should be inserted **DONE**
 * 1. How to provide a "contextual" card at the start  **DONE**
 *     - experiment with the content item approach
 * 2. Allow "Module" word to be changed  **DONE**
 * 2. Allow the date word (commencing) to change (Assessment==due)
 * 2. Configure the number of cards and width of cards (e.g. 2 for assessment)
 * 2. Fix issues with formatting within the card
 * 2. Provide a "small" version of the card interface to 
 * 2. Provide a date CSS addition to the card **DONE**
 * 2. Make the whole card a link (but retain link as well) Consider new template for card interface that is more active (e.g. roll over)  **DONE***
 * 2. Exclude content items from the Module naming  **DONE**
 * 2. Add some instructions into the tweak HTML to point to documentation and help with setting up.
 * 3. Explore the use of opacity to highlight the whole card?
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
	    m = description.match(/[Cc]ard [Ii]mage: *([^\s<]*)/ );
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
	    var month,date,m = description.match(/[Cc]ard [Cc]ommencing: ([A-Za-z]*) ([0-9]*)/);
	    if (m) {
    	    month=m[1];
    	    date=m[2];
    	    description = description.replace(m[0],"");
	    }
	    
	    // See if the Course Label should be changed
	    var label="Module";
	    m = description.match(/[Cc]ard [Ll]abel: ([^<]*)/ );
	    if (m) {
	        label=m[1];
	    }
	    
	    // need to get back to the header which is up one div, a sibling, then span
	    var header = $(this).parent().siblings(".item").find("span")[2];
	    var title = $(header).html(),link;
	    link = $(header).parent('a').attr('href');
	    
	    // Hide the contentItem  TODO Only do this if display page
	    var tweak_bb_active_url_pattern = "listContent.jsp";
	    if (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ) { 
	        var contentItem = $(this).parent().parent().hide();
	        //console.log( "content item " + contentItem.html());
	    }
	    // save the item for later
	    var item = {title:title, picUrl:picUrl, description:description,
	        link:link,month:month,date:date,label:label};
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
    // Initial kludge, just append to the first item
 	/*var firstItem = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).children(".item").eq(0).siblings(".details")/*.children('.vtbegenerated')*/
 	
 	// get the content item with h3 heading containing Card Interface
 	var cardInterface = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).find(".item h3").filter(':contains("Card Interface")').eq(0);
 	
 	if ( cardInterface.length === 0){
        console.log("Card: Can't find item with heading 'Card Interface' in which to insert card interface");
        return false;
    }
    // make the h3 for the Card Interface item disappear
    // (Can't hide the parent as then you can't edit via Bb)
    cardInterface.hide();
 	// Get the content area in which to insert the HTML
 	var firstItem = cardInterface.parent().siblings(".details");
    
    console.log( "Num headers now is " + firstItem.length);
    //console.log( "Num x now is " + x.length);
    
    
   
 	// Use the card HTML template and the data in items to generate
 	// HTML for each card
    var cards = "" ;
    var moduleNum = 1;
    items.forEach( function(idx) {
	    var cardHtml=cardHtmlTemplate;
	    cardHtml = cardHtml.replace('{MODULE_NUM}',moduleNum);
	    cardHtml = cardHtml.replace('{LABEL}',idx.label);
	    cardHtml = cardHtml.replace('{PIC_URL}', idx.picUrl);
	    cardHtml = cardHtml.replace('{TITLE}', idx.title);
	    description = idx.description.replace(/<p/, '<p class="pb-2"');
	    description = description.replace(/<a/, '<a class="underline"');
	    console.log("Description " + description);
	    cardHtml = cardHtml.replace('{DESCRIPTION}', description);
	    // Does the card link to another content item?
	    if ( idx.link ) {
	        // add the link
	        cardHtml = cardHtml.replace('{LINK_ITEM}', linkItemHtmlTemplate );
	    } else {
	        // remove the link
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
	    
	    if ( idx.month ) {
	        cardHtml = cardHtml.replace('{DATE}', dateHtmlTemplate );
	        cardHtml = cardHtml.replace(/{MONTH}/g, idx.month);
	        cardHtml = cardHtml.replace(/{DATE}/g, idx.date);
	    } else {
	        cardHtml = cardHtml.replace('{DATE}', '');
	    }
	    cards = cards.concat(cardHtml);
	    moduleNum++;
	});
	
	// STick the cards into the complete card HTML
	var interfaceHtml = interfaceHtmlTemplate;
	interfaceHtml = interfaceHtml.replace('{CARDS}',cards);
	// Insert the HTML to the selected item(s)
	$(firstItem).append( interfaceHtml);
}