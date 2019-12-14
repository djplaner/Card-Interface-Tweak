/* cardsAnalytics
 * - Implement analytics for the Card Interface
 
 * Initially will define
 * - a setupCardsAnalytics function that does the necessary checks
 *   and eventually registers the handler for clicking on cards
 * - the function logCardClick is the handler
 */


// LOCATION > 0 means view mode. < 0 means EDIT mode
var LOCATION = 1;

/****
 * TODO
 
 */
 
/********************************************
 * logCardClick
 * - send to the flow a JSON query with the studentId,
 *   which card was clicked, and the time
 */   
 
 // Currently using anonymous function, TODO move it here
 
/*********************************************
 * setupCardsAnalytics
 * - do checks that Card Interface is present on page and
 *   that there is a FLOW_URL defined
 * - If ok, set up a handler to send analytics to the FLOW_URL
 *   based on method above
 */
 
function setupCardsAnalytics($){
    
	/* define variables based on Bb page type */
	/* used to identify important components in html */
	var tweak_bb_active_url_pattern = "listContent.jsp";
	window.tweak_bb = { display_view: (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ), 
          page_id: "#content_listContainer",
	      row_element: "li" };

    /* Calculate actual term by using id="courseMenuLink"
     * - which includes the courseId */
     
    // hide the cardAnalytics tweak
    courseTitle = $("#courseMenu_link").attr('title');
	 if (location.href.indexOf("listContent.jsp") > 0) {
         $(".cardAnalyticsTweak").parents("li").hide(); 
	 }
	
	LOCATION = location.href.indexOf("listContent.jsp");

    // Is there a card interface on this page? If not do nothing
    var cardInterface = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).find(".item h3").filter(':contains("Card Interface")').eq(0);
 	
 	if ( cardInterface.length === 0){
 	    return false;
 	}
    /* Get the titles and descriptions of the items on the page */
	//var items = getCardItems($);
	
	/* generate the cards interface for the tiems */
	//addCardInterface(items);
	
	/** ------ cards should be created by now -- */
	// add a listener, ??? will this actually work given the stopPropagation
	//  done in the cards
    var cardContent = jQuery(".carddescription [href]");
    /*for (var i=0; i<cardContent.length; i++) {
        cardContent[i].addEventListener('click', function(e) {
            //var link = this.querySelector(".cardmainlink");
            //link.click();
            alert("Let's log this to learning analytics")
            e.stopPropagation();
        }, false);
    }*/
    
    
	/* Make all of the cards clickable by adding an event handler  */
	//var cards = document.querySelectorAll(".clickablecard");
	//var cards = document.querySelectorAll(".cardmainlink");
    //for (i=0; i<cards.length; i++) {
    jQuery(".clickablecard").each( function( ) {
        
        //cards[i].removeEventListener('click', );
        //console.log(jQuery(this));
        //var xpath = getElementXpath( cards[i]);
        
        jQuery(this).off('click');
        //console.log("turn off");
        jQuery(this).click( function(e) {
          logClick( this );
          e.stopPropagation();
        //cards[i].addEventListener('click', function(e) {
          //  logClick(e, this);
          //e='hello';
          //logClick(e,cards[i]);
        } );
        
        
    } );
    
}

function logClick(card) {
    //console.log(jQuery(card));

    // get the link for the card that was clicked on
    var link = jQuery(card).find(".cardmainlink").attr('href');
    
    // if there's no link (information card) get the heading        
    if ( !link) {
        link = jQuery(card).find(".carddescription h3").text() + " information card";
    } else {
        // try to get fully qualified link (if appropriate??)
        // TODO what happens it he link is a http?
        link = qualifyURL( link );
    }
    
    // get the timestamp
    var ts = Math.round((new Date()).getTime() / 1000);
    // get the user id
    var userId = jQuery("#guUserId").val();
    // get the flow URL
   // var flowURL = "https://prod-25.australiasoutheast.logic.azure.com:443/workflows/063b8dcbf0ff4e5a9ea00b30019f3339/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tiOXOO3jNFMvmMVhl4L4ULz82zRSNLjnyKLfxL9lpsE"; 
    var flowURL = jQuery("#guFlowURL").val();
            //alert("Let's log this cardmainlink goto user " + userId + " time " + ts);
            
    // set up the JSON string to pass
            
    var jsonString = `
{       
  "id" : "{USER_ID}", "link" : "{LINK}", "timestamp" : "{TIMESTAMP}",
  "source": "{SOURCE}"
}`;

    jsonString = jsonString.replace( "{USER_ID}", userId );
    jsonString = jsonString.replace( "{LINK}", link );
    jsonString = jsonString.replace( "{TIMESTAMP}", ts );
    jsonString = jsonString.replace( "{SOURCE}", window.location.href);
    theData = jsonString;
        
    //console.log( jsonString );
        // TODO - preventDefault prevents following the link, but it's
        // still called twice
        //e.preventDefault();
    console.log("-------------------");
        //e.stopPropagation();
        // send ajax
    jQuery.ajax({
            async: true,
            contentType: "application/json;charset=UTF-8",
            url: flowURL, // url where to submit the request
            type : "POST", // type of action POST || GET
            dataType : "json", // data type
            data : theData, // post data || get data
            success : function(result) {
                    console.log("Success " + result);
                },
            error: function(xhr, resp, text) {
                
                //console.log( xhr.responseJSON.Message);
              //  console.log("Failure resp " + xhr.responseText + " text " + //text)  ;
                console.log(xhr, resp, text);

                }
    });
    // Now click the link if there is one
    //link = jQuery(card).find(".cardmainlink");
    //console.log("link type " + typeof(link));
    console.log(link);
    //jQuery(card).off('click');
    //jQuery(card).click();
    
    if ( ! link.includes(' information card')) {
        sleep(200).then( () => {
            window.location.href = link;
        });
    }
    
}
        
function qualifyURL(url){
    var img = document.createElement('img');
    img.src = url; // set string url
    url = img.src; // get qualified url
    img.src = null; // no server request
    return url;
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
