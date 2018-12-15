/* cardsInterface
 * - Given a Blackboard page with a list of items
 * - Find all the items using the expected card data format
 * - Insert into the first item on the page a cards interface
 
 
 * data format
 * - Card's indicating by "Card Image: URL" in the description, though the URL can be empty
 * - Card title - heading of Blackboard item
 * - Module number - just the order in which they appear in the list
 * - picture - heading includes Card Image:**url**
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
    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <div class="bg-cover h-48" style="background-image: url('{PIC_URL}');"></div>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        Module {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 text-grey-darker text-sm flex-1">
          {DESCRIPTION}
        </div>
        </a>
         {LINK_ITEM}
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

/****
 * TO DO
 * 3. Rethink how images are provided. How many staff know how to source an image, place it online and get it's link? Should it be an image attachement? How to handle licencing?
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

/****
 * TO do
 * 1. Get only items with Card: at the start **DONE**
 * 2. Get the descriptions as well as titles **DONE**
 * 3. Parse both and constract array of objects **DONE**
 * 4. Get the link of the title  **DONE**
 * 5. Throw an error or do something if there's no link?
 *    - remove the ENGAGE link?
 */

function getCardItems($) {
	// Find all the items that containg Card Image: ??
	var cards = jQuery(tweak_bb.page_id + " > " +tweak_bb.row_element).children(".details").children('.vtbegenerated').filter(":contains('Card Image:')");
	var items=[];
	
	// Loop through each card and construct the items array with card data
	cards.each( function(idx){
        // Parse the description and remove the Card Image data	   
	    var description = $(this).html();
	    m = description.match(/[Cc]ard [Ii]mage: ([^ <]*)/ );
	    var picUrl=m[1];
	    description = description.replace( m[0], "");
	    
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
	        link:link};
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
 	var firstItem = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).children(".item").eq(0).siblings(".details")/*.children('.vtbegenerated')*/;
 	
 	// Use the card HTML template and the data in items to generate
 	// HTML for each card
    var cards = "" ;
    var moduleNum = 1;
    items.forEach( function(idx) {
	    var cardHtml=cardHtmlTemplate;
	    cardHtml = cardHtml.replace('{MODULE_NUM}',moduleNum);
	    cardHtml = cardHtml.replace('{PIC_URL}', idx.picUrl);
	    cardHtml = cardHtml.replace('{TITLE}', idx.title);
	    cardHtml = cardHtml.replace('{DESCRIPTION}', idx.description);
	    if ( idx.link ) {
	        cardHtml = cardHtml.replace('{LINK_ITEM}', linkItemHtmlTemplate );
	    } else {
	        cardHtml = cardHtml.replace('{LINK_ITEM}', '');
	    }
	    cardHtml = cardHtml.replace(/{LINK}/g, idx.link);
	    
	    cards = cards.concat(cardHtml);
	    moduleNum++;
	});
	
	// STick the cards into the complete card HTML
	var interfaceHtml = interfaceHtmlTemplate;
	interfaceHtml = interfaceHtml.replace('{CARDS}',cards);
	// Insert the HTML to the selected item(s)
	$(firstItem).append( interfaceHtml);
}
