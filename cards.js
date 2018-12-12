/* cardsInterface
 * - Given a Blackboard page with a list of items
 * - Find all the items using the expected card data format
 * - Insert into the first item on the page a cards interface
 
 
 * data format
 * - Card title - heading of Blackboard item with Card: as the start
 * - Module number - just the order in which they appear in the list
 * - picture - heading includes Image:**url**
 * - description - the rest of the description
 */

var interfaceHtmlTemplate = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" /></p>
<div class="flex flex-wrap -m-3">
 {CARDS}
</div>
`

var cardHtmlTemplate = `
  <div class="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
          <div class="bg-cover h-48" style="background-image: url('{PIC_URL}');"></div>
          <div class="p-4 flex-1 flex flex-col">
          Module {MODULE_NUM}
          <h3 class="mb-4 text-2xl">{TITLE}</h3>
          <div class="mb-4 text-grey-darker text-sm flex-1">
          {DESCRIPTION}

          <a href="{LINK}" class="border-t border-grey-light pt-2 text-xs text-grey hover:text-red uppercase no-underline tracking-wide" style="text-align: right;">Engage</a>
          </div>
        </div>
    </div>
  </div>
`
/****
 * TO DO
 * 1. Finish getCardItems
 * 2. append the html to the Card Interface: item
 * 3. Remove the title icon and do something with any title for Card Interface item 
 */
function cardsInterface($){
	//alert('Hello');
	
	/* define variables based on Bb page type */
	/* used to identify important components in html */
	var tweak_bb_active_url_pattern = "listContent.jsp";
	window.tweak_bb = { display_view: (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ), 
          page_id: "#content_listContainer",
	      row_element: "li" };
	
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
 * 4. Get the link of the title 
 * 5. Throw an error or do something if there's no link?
 *    - remove the ENGAGE link?
 */

function getCardItems($) {
    
	/* Get the headers in a div with class item 
	 * but only those containing Card: */      
	var headers = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).children(".item").filter(":contains('Card:')");
	var items=[];
	
	//alert('num headers ' + headers.length);
	
	headers.each( function(idx){
	    
	    /* Get heading text with edit on */
	    /* TODO - will likely need changes to work without edit */
	    var tspan = $(this).find("span")[2];
	    var fullTitle = $(tspan).html();
	    var title,picUrl,link;
	    
	    m = fullTitle.match(/^\s*[Cc]ard:(.*) Image:(.*)/m);
	    title=m[1];  picUrl=m[2]

	    /*console.log( "Header " + idx + " - " + $(tspan).html());
	    console.log( "    TItle - " + title );
	    console.log( "    picUrl - " + picUrl );*/
	    /* Get the description */
	    var desc = $(this).siblings(".details");
	    var cont = $(desc).children('.vtbegenerated');
	    //console.log( "Description " + idx + " - " + $(desc).html());
	    console.log( "Cont " + idx + " - " + $(cont).html());
	    
	    // save the item for later
	    var item = {title:title, picUrl:picUrl, description:$(cont).html()};
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
	    cardHtml = cardHtml.replace('{LINK}', "TO DO");
	    
	    cards = cards.concat(cardHtml);
	    moduleNum++;
	});
	
	// STick the cards into the complete card HTML
	var interfaceHtml = interfaceHtmlTemplate;
	interfaceHtml = interfaceHtml.replace('{CARDS}',cards);
	// Insert the HTML to the selected item(s)
	$(firstItem).append( interfaceHtml);
}