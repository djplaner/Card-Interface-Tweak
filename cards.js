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
	
	/*** DOING - need to merge these into a single function and generate
	 *   an array of objects with all the parsed elements, but only for
	 *   items with Card: */
	items.forEach( function(idx) {
	    //var value = items[idx];
	    //console.log( "ITEM " + idx);
	    console.log( "     title " + idx.title);
	    console.log( "     picUrl " + idx.picUrl);
	    console.log( "     description " + idx.description);
	});
	
	
	/* Parse the items (mostly descriptions) further */
	
	/* generate the cards interface for the tiems */
}

/****
 * TO do
 * 1. Get only items with Card: at the start **DONE**
 * 2. Get the descriptions as well as titles
 * 3. Parse both and constract array of objects
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
	    var title,picUrl;
	    
	    
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
	    var item = {title:fullTitle, picUrl:picUrl, description:$(cont).html()};
	    items.push(item);
	});
	
	return items;
}
