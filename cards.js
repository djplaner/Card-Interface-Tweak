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
	titles = getTitles($);
	
	/*** DOING - need to merge these into a single function and generate
	 *   an array of objects with all the parsed elements, but only for
	 *   items with Card: */
	console.log( "TITLES: " + titles);
	/*descriptions = getDescriptions($);
	console.log( "Descriptions: " + descriptions);*/
	
	/* Parse the items (mostly descriptions) further */
	
	/* generate the cards interface for the tiems */
}

/****
 * TO do
 * 1. Get only items with Card: at the start
 * 2. Get the descriptions as well as titles
 * 3. Parse both and constract array of objects
 */

function getTitles($) {
    
	/* Get the headers in a div with class item 
	 * but only those containing Card: */      
	var headers = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).children(".item").filter(":contains('Card:')");
	var titles = [];
	
	alert('num headers ' + headers.length);
	
	headers.each( function(idx){
	    
	    /* Get heading text with edit on */
	    /* TODO - will likely need changes to work without edit */
	    var tspan = $(this).find("span")[2];
	    titles.push( $(tspan).html() );
	    
	    console.log( "Header " + idx + " - " + $(tspan).html())
	    /* Get the description */
	    var desc = $(this).siblings(".details")/*.children('vtbegenerated')*/;
	    console.log( "Description " + idx + " - " + $(desc).html());
	    
	});
	
	return titles;
}

/*
 * Get an array containing the descriptions for each of the items on the
 * Blackboard page
 */

function getDescriptions($) {
    
	/* Get the headers in a div with class item */      
	/* Is the vtbegenerated class present on view? */
	var headers = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).children(".details").children('.vtbegenerated');
	var descriptions = [];
	
	alert('num headers ' + headers.length);
	
	headers.each( function(idx){
	    /* Get heading text with edit on */
	    /* TODO - will likely need changes to work without edit */
	    /*var tspan = $(this).find("span")[2];*/
	    titles.push( $(this).html() );
	    
	});
	
	return titles;
}