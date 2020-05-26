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
    // OUA 2020 Study Period 1
    "2201" :  {
         "0" : { "start" : "2020-02-24", "stop":"2020-03-01" } ,
         "1" : { "start" : "2020-03-02", "stop":"2020-03-08" } ,
         "2" : { "start" : "2020-03-09", "stop":"2020-03-15" } ,
         "3" : { "start" : "2020-03-16", "stCop":"2020-03-22" } ,
         "4" : { "start" : "2020-03-23", "stop":"2020-03-29" } ,
         "5" : { "start" : "2020-03-30", "stop":"2020-04-05" } ,
         "6" : { "start" : "2020-04-06", "stop":"2020-04-12" } ,
         "7" : { "start" : "2020-04-13", "stop":"2020-04-19" } ,
         "8" : { "start" : "2020-04-20", "stop":"2020-04-26" } ,
         "9" : { "start" : "2020-04-27", "stop":"2020-05-03" } ,
         "10" : { "start" : "2020-05-04", "stop":"2020-05-10" } ,
         "11" : { "start" : "2020-05-11", "stop":"2020-05-17" } ,
         "12" : { "start" : "2020-05-18", "stop":"2020-05-24" } ,
         "13" : { "start" : "2020-05-25", "stop":"2020-05-31" },
         "14" : { "start" : "2020-06-01", "stop":"2020-06-05" },
         /* End of study period 4 */
         "exam" : { "start" : "2020-06-01", "stop":"2020-06-05" },
         // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2020 Study Period 2
    "2203" :  {
         "0" : { "start" : "2020-05-25", "stop":"2020-05-31" } ,
         "1" : { "start" : "2020-06-01", "stop":"2020-06-07" } ,
         "2" : { "start" : "2020-06-08", "stop":"2020-06-14" } ,
         "3" : { "start" : "2020-06-15", "stop":"2020-06-21" } ,
         "4" : { "start" : "2020-06-22", "stop":"2020-06-28" } ,
         "5" : { "start" : "2020-06-29", "stop":"2020-07-05" } ,
         "6" : { "start" : "2020-07-06", "stop":"2020-07-12" } ,
         "7" : { "start" : "2020-07-13", "stop":"2020-07-19" } ,
         "8" : { "start" : "2020-07-20", "stop":"2020-07-26" } ,
         "9" : { "start" : "2020-07-27", "stop":"2020-08-02" } ,
         "10" : { "start" : "2020-08-03", "stop":"2020-08-09" } ,
         "11" : { "start" : "2020-08-10", "stop":"2020-05-17" } ,
         "12" : { "start" : "2020-08-17", "stop":"2020-05-24" } ,
         "13" : { "start" : "2020-08-24", "stop":"2020-05-31" },
         "14" : { "start" : "2020-08-31", "stop":"2020-09-06" },
         /* End of study period 4 */
         "exam" : { "start" : "2020-08-31", "stop":"2020-09-04" },
         // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2020 Study Period 3
    "2205" :  {
         "0" : { "start" : "2020-08-31", "stop":"2020-09-06" } ,
         "1" : { "start" : "2020-09-07", "stop":"2020-09-13" } ,
         "2" : { "start" : "2020-09-14", "stop":"2020-09-20" } ,
         "3" : { "start" : "2020-09-21", "stop":"2020-09-27" } ,
         "4" : { "start" : "2020-09-28", "stop":"2020-10-04" } ,
         "5" : { "start" : "2020-10-05", "stop":"2020-10-11" } ,
         "6" : { "start" : "2020-10-12", "stop":"2020-10-19" } ,
         "7" : { "start" : "2020-10-19", "stop":"2020-10-25" } ,
         "8" : { "start" : "2020-10-26", "stop":"2020-11-01" } ,
         "9" : { "start" : "2020-11-02", "stop":"2020-11-08" } ,
         "10" : { "start" : "2020-11-09", "stop":"2020-11-15" } ,
         "11" : { "start" : "2020-11-16", "stop":"2020-11-22" } ,
         "12" : { "start" : "2020-11-23", "stop":"2020-11-29" } ,
         "13" : { "start" : "2020-11-30", "stop":"2020-12-06" },
         "14" : { "start" : "2020-12-07", "stop":"2020-12-13" },
         /* End of study period 4 */
         "exam" : { "start" : "2020-12-07", "stop":"2020-12-13" },
         // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2020 Study Period 4
    "2207" :  {
         "0" : { "start" : "2020-11-30", "stop":"2020-12-06" } ,
         "1" : { "start" : "2020-12-07", "stop":"2020-12-13" } ,
         "2" : { "start" : "2020-12-14", "stop":"2020-12-20" } ,
         "3" : { "start" : "2020-12-21", "stop":"2020-12-27" } ,
         "4" : { "start" : "2020-12-28", "stop":"2021-01-03" } ,
         "5" : { "start" : "2021-01-04", "stop":"2021-01-10" } ,
         "6" : { "start" : "2021-01-11", "stop":"2021-01-17" } ,
         "7" : { "start" : "2021-01-18", "stop":"2021-01-24" } ,
         "8" : { "start" : "2021-01-25", "stop":"2021-01-31" } ,
         "9" : { "start" : "2021-02-01", "stop":"2021-02-07" } ,
         "10" : { "start" : "2021-02-08", "stop":"2021-02-14" } ,
         "11" : { "start" : "2021-02-15", "stop":"2021-02-21" } ,
         "12" : { "start" : "2021-02-22", "stop":"2021-02-28" } ,
         "13" : { "start" : "2021-03-01", "stop":"2021-03-07" },
         "14" : { "start" : "2021-03-08", "stop":"2021-03-14" },
         /* End of study period 4 */
         "exam" : { "start" : "2021-03-08", "stop":"2021-03-14" },
         // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // Griffith 2020 Trimester 2
    "3205" : {
         "0" : { "start" : "2020-07-06", "stop":"2020-07-12" } ,
         "1" : { "start" : "2020-07-13", "stop":"2020-07-19" } ,
         "2" : { "start" : "2020-07-20", "stop":"2020-07-26" } ,
         "3" : { "start" : "2020-07-27", "stop":"2020-08-02" } ,
         "4" : { "start" : "2020-08-03", "stop":"2020-08-09" } ,
         "5" : { "start" : "2020-08-10", "stop":"2020-08-16" } ,
         "6" : { "start" : "2020-08-17", "stop":"2020-08-23" } ,
         "7" : { "start" : "2020-08-24", "stop":"2020-08-30" } ,
         "8" : { "start" : "2020-08-31", "stop":"2020-09-06" } ,
         "9" : { "start" : "2020-09-07", "stop":"2020-09-13" } ,
         "10" : { "start" : "2020-09-14", "stop":"2020-09-20" } ,
         "11" : { "start" : "2020-09-21", "stop":"2020-09-27" } ,
         "12" : { "start" : "2020-09-28", "stop":"2020-10-04" } ,
         "13" : { "start" : "2020-10-05", "stop":"2020-10-11" } ,
         "exam" : { "start": "2020-10-12", "stop": "2020-10-18" }
    },
    // Griffith 2020 Trimester 1
    "3201" : {
         "0" : { "start" : "2020-02-17", "stop":"2020-02-23" } ,
         "1" : { "start" : "2020-02-24", "stop":"2020-03-01" } ,
         "2" : { "start" : "2020-03-02", "stop":"2020-03-08" } ,
         "3" : { "start" : "2020-03-09", "stop":"2020-03-15" } ,
         "4" : { "start" : "2020-03-16", "stop":"2020-03-22" } ,
         "5" : { "start" : "2020-03-23", "stop":"2020-03-29" } ,
         "6" : { "start" : "2020-03-30", "stop":"2020-04-05" } ,
         "7" : { "start" : "2020-04-13", "stop":"2020-04-19" } ,
         "8" : { "start" : "2020-04-20", "stop":"2020-04-26" } ,
         "9" : { "start" : "2020-04-27", "stop":"2020-05-03" } ,
         "10" : { "start" : "2020-05-04", "stop":"2020-05-10" } ,
         "11" : { "start" : "2020-05-11", "stop":"2020-05-17" } ,
         "12" : { "start" : "2020-05-18", "stop":"2020-05-24" } ,
         "13" : { "start" : "2020-05-25", "stop":"2020-05-31" } ,
         "exam" : { "start": "2020-06-01", "stop": "2020-06-07" }
    },
    // Griffith 2019 Trimester 3
    "3198" : {
         "0" : { "start" : "2019-10-21", "stop":"2019-10-27" } ,
         "1" : { "start" : "2019-10-28", "stop":"2019-11-03" } ,
         "2" : { "start" : "2019-11-04", "stop":"2019-11-10" } ,
         "3" : { "start" : "2019-11-11", "stop":"2019-11-17" } ,
         "4" : { "start" : "2019-11-18", "stop":"2019-11-24" } ,
         "5" : { "start" : "2019-11-25", "stop":"2019-12-1" } ,
         "6" : { "start" : "2019-12-02", "stop":"2019-12-08" } ,
         "7" : { "start" : "2019-12-09", "stop":"2019-12-15" } ,
         "8" : { "start" : "2019-12-16", "stop":"2019-12-22" } ,
         "9" : { "start" : "2020-01-06", "stop":"2020-01-12" } ,
         "10" : { "start" : "2020-01-13", "stop":"2020-01-19" } ,
         "11" : { "start" : "2020-01-20", "stop":"2020-01-26" } ,
         "12" : { "start" : "2020-01-27", "stop":"2020-02-02" },
         "13" : { "start" : "2020-02-03", "stop":"2020-02-09" } ,
         "exam" : { "start": "2020-02-06", "stop": "2020-02-15" }
         // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA Study Period 4 2019
    "2197" : {
         "0" : { "start" : "2019-11-18", "stop":"2019-11-24" } ,
         "1" : { "start" : "2019-11-25", "stop":"2019-12-01" } ,
         "2" : { "start" : "2019-12-02", "stop":"2019-12-08" } ,
         "3" : { "start" : "2019-12-09", "stop":"2019-12-15" } ,
         "4" : { "start" : "2019-12-16", "stop":"2019-12-22" } ,
         "5" : { "start" : "2019-12-23", "stop":"2019-09-29" } ,
         "6" : { "start" : "2019-12-30", "stop":"2020-01-05" } ,
         "7" : { "start" : "2020-01-06", "stop":"2020-01-12" } ,
         "8" : { "start" : "2020-01-13", "stop":"2020-01-19" } ,
         "9" : { "start" : "2020-01-20", "stop":"2020-01-26" } ,
         "10" : { "start" : "2020-01-27", "stop":"2020-02-02" } ,
         "11" : { "start" : "2020-02-03", "stop":"2020-02-09" } ,
         "12" : { "start" : "2020-02-10", "stop":"2020-02-16" },
         "13" : { "start" : "2019-02-17", "stop":"2020-02-23" } ,
         /* End of study period 4 */
         "14" : { "start" : "2020-02-24", "stop":"2020-03-01" },
         "15" : { "start" : "2020-03-02", "stop":"2020-03-08" },
         // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA Study Period 3 2019
    "2195" : {
         "0" : { "start" : "2019-08-19", "stop":"2019-09-25" } ,
         "1" : { "start" : "2019-08-26", "stop":"2019-09-01" } ,
         "2" : { "start" : "2019-09-02", "stop":"2019-09-18" } ,
         "3" : { "start" : "2019-09-09", "stop":"2019-09-15" } ,
         "4" : { "start" : "2019-09-16", "stop":"2019-09-22" } ,
         "5" : { "start" : "2019-09-23", "stop":"2019-09-29" } ,
         "6" : { "start" : "2019-09-30", "stop":"2019-10-06" } ,
         "7" : { "start" : "2019-10-07", "stop":"2019-10-13" } ,
         "8" : { "start" : "2019-10-14", "stop":"2019-08-20" } ,
         "9" : { "start" : "2019-10-21", "stop":"2019-10-27" } ,
         "10" : { "start" : "2019-10-28", "stop":"2019-11-03" } ,
         "11" : { "start" : "2019-11-04", "stop":"2019-11-10" } ,
         "12" : { "start" : "2019-11-11", "stop":"2019-11-17" },
         "13" : { "start" : "2019-11-18", "stop":"2019-11-24" } ,
         /* End of study period 3 */
         "14" : { "start" : "2019-11-25", "stop":"2019-12-01" },
         "15" : { "start" : "2019-10-07", "stop":"2019-10-13" },
         // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // Griffith 2019 Trimester 2
    "3195" : {
         "0" : { "start" : "2019-07-01", "stop":"2019-07-07" } ,
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
         "12" : { "start" : "2019-09-30", "stop":"2019-10-06" },
         "13" : { "start" : "2019-10-07", "stop":"2019-10-13" },
         "14" : { "start" : "2019-10-14", "stop":"2019-10-20" },
         "15" : { "start" : "2019-10-21", "stop":"2019-10-27" },
         "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    "3191" : {
         "0" : { "start" : "2019-02-18", "stop":"2019-02-24" },
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
         "12" : { "start" : "2019-05-20", "stop":"2019-05-26" },
         "13" : { "start" : "2019-05-27", "stop":"2019-06-02" },
         "14" : { "start" : "2019-06-03", "stop":"2019-06-09" },
         "15" : { "start" : "2019-06-10", "stop":"2019-06-17" },
         "exam": { "start" : "2019-05-30", "stop": "2019-06-08" }
         }
    
    };
var TERM="3191",YEAR=2019, SET_DATE="";
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// Interface design from https://codepen.io/njs/pen/BVdwZB


// TEMPLATES - by 6

// define the template types
const NUM_TEMPLATES=6, HORIZONTAL=0, // original 3 cards per row
      VERTICAL=1, // 1 card per row 
      HORIZONTAL_NOENGAGE=2, // original, but no engage
      PEOPLE = 5,
      ASSESSMENT = 6; // horizontal but show off people (BCI) version

// Whether or not xAPI logging is turned on
// - turned on by adding "logging" to Card Interface
var LOGGING=false;

// Define the wrapper around the card interface

var interfaceHtmlTemplate = Array(NUM_TEMPLATES);

// Kludge - hard code CSS path to enable shifting from
//          dev to live
//var CARDS_CSS="https://djon.es/gu/cards.css";
var CARDS_CSS="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css";



interfaceHtmlTemplate[HORIZONTAL] = `
<link rel="stylesheet" href="{CARDS_CSS}" />


<div id="guCardInterface" class="flex flex-wrap -m-3">
 {CARDS}
</div>
`;
interfaceHtmlTemplate[HORIZONTAL] = interfaceHtmlTemplate[HORIZONTAL].replace('{CARDS_CSS}',CARDS_CSS);

interfaceHtmlTemplate[VERTICAL] = `
<link rel="stylesheet" href="{CARDS_CSS}" />
 {CARDS}
</div>
`;
interfaceHtmlTemplate[VERTICAL] = interfaceHtmlTemplate[VERTICAL].replace('{CARDS_CSS}',CARDS_CSS);

interfaceHtmlTemplate[HORIZONTAL_NOENGAGE]=interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[PEOPLE]= interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[ASSESSMENT]= interfaceHtmlTemplate[HORIZONTAL];

// template for each individual card

var cardHtmlTemplate = Array(NUM_TEMPLATES);

cardHtmlTemplate[HORIZONTAL]=`
  <div class="clickablecard w-full sm:w-1/2 {WIDTH} flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}" class="cardmainlink"></a>
      <div class="bg-cover h-48" style="background-image: url('{PIC_URL}'); background-color: rgb(255,255,204)">{IFRAME}
      </div>
      <div class="carddescription p-4 flex-1 flex flex-col">
        {LABEL} {MODULE_NUM}
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

cardHtmlTemplate[VERTICAL]=`
<a href="{LINK}">
<div class="lg:flex xl:flex md:flex mb-4 rounded-lg shadow-lg hover:shadow-outline">
  <div class="lg:w-1/4 md:w-1/4 sm:w-full h-auto lg:flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('{PIC_URL}')">
        <img src="{PIC_URL}" style="opacity:0;width:50%" />
        {IFRAME}
  </div>
    <div class="p-2 m-2 lg:flex md:w-1/5 lg:w-1/5 sm:w-full">
        <h3>{TITLE}</h3>
    </div>
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


cardHtmlTemplate[HORIZONTAL_NOENGAGE]=`
  <div class="w-full sm:w-1/2 {WIDTH} flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}"><div class="bg-cover bg-yellow-lightest h-48" style="background-image: url('{PIC_URL}');">{IFRAME}</div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="carddescription mb-4 flex-1">
          {DESCRIPTION}
        </div>
        </a>
         {DATE} 
         {LINK_ITEM}
         {REVIEW_ITEM}
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
  
  
  <div class="clickablecard w-full sm:w-1/2 md:w-1/2 flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}" class="cardmainlink"></a>
      <div class="w-full"><iframe src='https://player.vimeo.com/video/226525600?&title=0&byline=0'></iframe></div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
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

cardHtmlTemplate[ASSESSMENT]=`
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

linkItemHtmlTemplate[VERTICAL] ='';
linkItemHtmlTemplate[HORIZONTAL_NOENGAGE] = '';
linkItemHtmlTemplate[PEOPLE] = '';
linkItemHtmlTemplate[ASSESSMENT] = '';

// TODO: need to decide how and what this will look like
//linkItemHtmlTemplate[1] = '<p><strong>Engage</strong></p>';
linkItemHtmlTemplate[VERTICAL] = '';
/*`
<div class="relative pin-r pin-b m-18"> <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded"> Engage </button> 
        </div>`;*/
        
//*****************************************************************
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

markReviewLinkHtmlTemplate[VERTICAL] ='';
markUnReviewedLinkHtmlTemplate[VERTICAL] ='';
markReviewLinkHtmlTemplate[HORIZONTAL_NOENGAGE] = markReviewLinkHtmlTemplate[HORIZONTAL];
markUnReviewedLinkHtmlTemplate[HORIZONTAL_NOENGAGE] =markUnReviewedLinkHtmlTemplate[HORIZONTAL];
markReviewLinkHtmlTemplate[PEOPLE] = '';
markUnReviewedLinkHtmlTemplate[PEOPLE] ='';
markReviewLinkHtmlTemplate[ASSESSMENT] = '';
markUnReviewedLinkHtmlTemplate[ASSESSMENT] ='';
        
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

weekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1">
      Week {WEEK}
    </div>
    `;
    
dualWeekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1 border-l border-r border-black">
      Week {WEEK_START} to {WEEK_STOP}
    </div>
    `;    
    
examPeriodTemplate =`
<div class="bg-yellow-lighter text-black py-1 border-l border-r border-black">
      Exam Period
    </div>
`;

dateHtmlTemplate[VERTICAL] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[HORIZONTAL_NOENGAGE] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[PEOPLE] = '';
//dateHtmlTemplate[ASSESSMENT] = dateHtmlTemplate[HORIZONTAL];

dualDateHtmlTemplate[VERTICAL] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[HORIZONTAL_NOENGAGE] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[PEOPLE] = '';
//dualDateHtmlTemplate[ASSESSMENT] = dualDateHtmlTemplate[HORIZONTAL];

// Template to allow editors to view the original Bb content item
// Same for all templates
var editLinkTemplate = `
	        <div class="text-xs grey-light">
	           [<a href="#{ID}">View origin</a>]
	        </div>`;

// Message to display on a card if EDIT mode on and the item is hidden
HIDDEN_FROM_STUDENTS = `<div class="inline-block bg-yellow text-black text-xs rounded-t rounded-b">This item is <strong>hidden from students</strong></div>`;

// LOCATION > 0 means view mode. < 0 means EDIT mode
var LOCATION = 1;

INTRO_HTML=`
<p><strong>Important:</strong> </p>
<ol>
  <li> <strong>No changes</strong> - do not edit or remove content from this item. It implements the Card interface. Changes may break that interface.</li>
  <li> <strong>Don't hide it from students</strong> - the tweak will hide itself, students won't see it. If you use Blackboard to hide this tweak from students, it will NOT work.</li>
  </ol>
`;


DOCUMENTATION_HTML = `
<h3>How do I...</h3>

<p>Table below provides links to help with various tasks. Helps is provided in two formats:</p>
<ol>
  <li> Word document; and,
       <p>Accessible to any Griffith staff member, but not providing the full interactive, web interface. </p> </li>
  <li> in Learning@Griffith (L@G).
       <p>Accessible once you "enrol" in an Blackboard site and provides the full interactive, web interface. </p> </li>
</ol>

<table style="width:100%;padding:2px">
  <tr>
    <td class="bg-grey"> Get started </td>
    <td class="bg-grey-light"> Change a card </td>
    <td class="bg-grey-lighter"> Change the appearance of all cards </td>
  </tr>
  <tr>
    <td class="bg-grey">
<ul style="padding-left:1.2em">
  <li> Card Interface - What and why? [ 
       <a href="https://griffitheduau-my.sharepoint.com/:w:/g/personal/d_jones6_griffith_edu_au/EbEoe9wj0YZJlqReCZ1zIgYBqec-roMdEc6O8g0HO3WYJA?e=euNDVZ">Word</a> | 
       <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110115_1&course_id=_82534_1&mode=quick">L@G</a> ] </li>
  <li> How to create a Card Interface [
           <a href="https://griffitheduau-my.sharepoint.com/:w:/g/personal/d_jones6_griffith_edu_au/EQjDbsce2UlPjNKpRkcrx4ABnpv5XexhJUtqPW4wucmFnQ?e=j3aZJB">Word</a> |
           <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110120_1&course_id=_82534_1&content_id=_5110129_1">L@G</a> ]
</ul>
    </td>
    <td class="bg-grey-light">
      <p>By customising a single card [
        <a href="https://griffitheduau-my.sharepoint.com/:w:/g/personal/d_jones6_griffith_edu_au/ETbYt2lHdNVApcQsbJsXp4YBHgCLTKE-clIRw38qpiKfiw?e=8kEDCC">Word</a> |
        <a href="">L@G</a> ] by</p>
          <ul>
            <li> Setting a card image. </li>
            <li> Setting the date. </li>
            <li> Changing a label. </li>
         </ul>
    </td>
    <td class="bg-grey-lighter">
        <p>using attributes & templates [ 
        <a href="https://griffitheduau-my.sharepoint.com/:w:/g/personal/d_jones6_griffith_edu_au/EWwyyTG6BBNBirb1G9rnnP8BEuniqGyVmwBcTpzG9pLB9Q?e=5kdY0c">Word</a> |
        <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110122_1&course_id=_82534_1&content_id=_5110408_1">L&G</a>], by</p>
    <ul style="padding-left:1.2em">
        <li> <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110122_1&course_id=_82534_1&content_id=_5110408_1#2">understanding templates and attributes</a> </li>
        <li> <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110122_1&course_id=_82534_1&content_id=_5110408_1#3">arranging cards vertically</a> </li>
        <li> <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110122_1&course_id=_82534_1&content_id=_5110408_1#4">changing the number of cards per row</a> </li>
        <li> <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110122_1&course_id=_82534_1&content_id=_5110408_1#5">using an assessment template</a> </li>
        <li> <a href="https://bblearn.griffith.edu.au/webapps/blackboard/content/listContent.jsp?content_id=_5110122_1&course_id=_82534_1&content_id=_5110408_1#6">Changing or removing the engage button</a> </li>
    </ul>
    </td>
    </table>
  

`;

NEW_DOCUMENTATION_HTML = `
<h3>How do I...</h3>

<table style="width:100%;padding:2px">
  <tr>
    <td class="bg-grey"> Get started </td>
    <td class="bg-grey-light"> Change a card </td>
    <td class="bg-grey-lighter"> Change the appearance of all cards </td>
  </tr>
  <tr>
    <td class="bg-grey">
<ul style="padding-left:1.2em">
  <li> <a href="https://griffitheduau-my.sharepoint.com/:w:/g/personal/d_jones6_griffith_edu_au/ETGyerxSf5pMuHFxsn1nA14BHDJlNgGezO_gW2p5uQm_IQ?e=VjWJ60" target="_blank">learn the basics about the Card Interface</a> </li>
  <li> <a href="">Add a card</a> </li>
  <li> <a href="">set up a new Card Interface (elsewhere)</a> </li>
</ul>
    </td>
    <td class="bg-grey-light">
        <ul style="padding-left:1.2em">
        <li> <a href="">adding/changing an image</a> </li>
        <li> <a href="">adding a card colour</a> </li>
        <li> <a href="">adding a card video</a> (or a Padlet or other embeddable content) </li>
        <li> <a href="">change the date or date label</a> </li>        
        <li> <a href="">change the card label (e.g. Module) or number</a> </li>        
    </ul>
    </td>
    <td class="bg-grey-lighter">
  
    <ul style="padding-left:1.2em">
        <li> <a href="">changing the number of cards per row</a> </li>
        <li> <a href="">using different card templates</a> </li>
    </ul>
    </td>
    </table>
  

`;

// Big kludge for HDR

function hideJourney($) {
    console.log("---------- RUNNING THE tmp script");
  
  var tweak_bb_active_url_pattern = "listContent.jsp";
	window.tweak_bb = { display_view: (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ), 
          page_id: "#content_listContainer",
	      row_element: "li" };

  var journeyTitle = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).find(".item h3").filter(':contains("Your HDR Journey")').eq(0);		  
  //console.log(journeyTitle);
  var journey = jQuery(journeyTitle).parent().next('div.details').children('.vtbegenerated');
  //console.log(journey);
  var child = jQuery(journey).children(".yourJourney");
  //console.log(child);
  jQuery(child).unwrap();
}
/****
 * TODO
 * - Add a "right now" important way to highlight a card
 * - Configure the number of cards and width of cards (e.g. 2 for assessment)
 * - Fix issues with formatting within the card
 * - Explore the use of opacity to highlight the whole card?
 *     i.e. an overview that goes over the top? or perhaps just shade bottom same blue as the border with white text
 */
 
function cardsInterface($){
    
    console.log("Number 2.5");
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

    // 
    jQuery('#gu_card_docs').html(DOCUMENTATION_HTML);
	jQuery('#gu_card_intro').html(INTRO_HTML);
		
	// Calculate the actual TERM for this course based on the 
	// courseId. If it doesn't parse, just leave it as the default
	// initialised term

	// get the course id which will be in brackets
	//idRe = new RegExp('\((.*)\)');
	m = courseTitle.match( /^.*\((.+)\)/ );
	// we found a course Id, get the STRM value
	//console.log("got title " + courseTitle );
	if (m){
	    id = m[1];
	    // break the course Id up into its components
	    // This is the RE for COMM10 - OUA course?
	    breakIdRe = new RegExp('^([A-Z]+[0-9]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$');
	    m = id.match(breakIdRe) ;

        
        // found an actual course site (rather than org site)	    
	    if (m) { 
	        TERM=m[2];
	    
            // set the year
            mm = TERM.match(/^[0-9]([0-9][0-9])[0-9]$/);
            if (mm) {
                YEAR = 20 + mm[1];
            } else {
                YEAR = 2019;
            }
        } else {
            // check for a normal GU course
            breakIdRe = new RegExp('^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$');
            // Following is broken
            
	        m = id.match(breakIdRe) ;

            // found an actual course site (rather than org site)	    
	        if (m) { 
	            TERM=m[2];
	            
                // set the year
                mm = TERM.match(/^[0-9]([0-9][0-9])[0-9]$/);
                if (mm) {
                    YEAR = 20 + mm[1];
                } else {
                    YEAR = 2019;
                }
            } else {
                breakIdRe = new RegExp('^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])$');
                
                m = id.match(breakIdRe) ;

                // found an actual course site (rather than org site)	    
	            if (m) { 
	                TERM=m[2];
                    // set the year
                    mm = TERM.match(/^[0-9]([0-9][0-9])[0-9]$/);
                    if (mm) {
                        YEAR = 20 + mm[1];
                    } else {
                        YEAR = 2019;
                    }
	            }
            }
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
	
	// remove click event handler from engage buttons
	
	// Add event handler for the engage links
    /*jQuery(".gu-engage").click( function(e) {
            
            e.stopPropagation();
    });*/
	
	/** ------ cards should be created by now -- */
	/* But make all the links in carddescription stop propagation */
    var cardContent = jQuery(".carddescription [href]").not(".gu-engage");

    for (var i=0; i<cardContent.length; i++) {
        cardContent[i].addEventListener('click', function(e) {
            // aim here is to allow internal links to override the 
            // cardmainlink
            e.stopPropagation();
        }, false);
    }
    
	/* Make all of the cards clickable by adding an event handler  */
	// Does this unwrap actually do anything???
	//jQuery( ".cardmainlink[href='undefined'" ).contents().unwrap();
	//return true;
	var cards = document.querySelectorAll(".clickablecard");
	//var cards = document.querySelectorAll(".cardmainlink");
    for (i=0; i<cards.length; i++) {
    cards[i].addEventListener('click', function() {
            var link = this.querySelector(".cardmainlink");
            
            if ( link!==null ) {
                // prevent clicking on a undefined blackboard link
                if ( link.match(/blackboard\/content\/undefined$/)) {
                    console.log("Undefined");
                } else {
                    link.click();
                }
            }
        }, false);
    }
    
    
    
    // if we want the images to be hidden, hide them at the end
    if ( HIDE_IMAGES ) {
        jQuery( ".bg-cover").hide();
    }
}

/***
 * Extract an array of items from the page that have been specified as part 
 * of the card interface
 */

function getCardItems($) {
	// Find all the items that containg Card Image: OR Card Image Iframe:
	
	var bbItems = jQuery(tweak_bb.page_id + " > " +tweak_bb.row_element).children(".details").children('.vtbegenerated').filter(
	       function( index ) {
	            if ( $(this).filter(":contains('Card Image:')").length==1 ) {
	                return true;
	            }    
	            if ( $(this).filter(":contains('Card Image Iframe:')").length==1 ) {
	                return true;
	            }    
	           return false;
	       } );
	       
	var cards = extractCardsFromContent( bbItems);
	
	return cards;
}



function extractCardsFromContent( myCards) {
    
    var items = [];
    var picUrl,cardBGcolour;
    
    // Loop through each card and construct the items array with card data
	myCards.each( function(idx){
	    // jQuery(this) - is the vtbgenerated div for a BbItem
	    
	    //------- check for any review status element
	    review = getReviewStatus( this );
	    
        // Parse the description and remove the Card Image data	    
	    var description = jQuery(this).html(),picUrl;
	    
		// - get rid of any &nbsp; inserted by Bb
	    description = description.replace(/&nbsp;/gi, ' ');
	    
	    var re = new RegExp("card image\s*:\s*([^<]*)", "i");
	    //m = description.match(/[Cc]ard [Ii]mage\s*: *([^\s<]*)/ );
	    m = description.match( re );
	    if (m) {
	        // TODO need to parse the m[1] to see if it's a URL
	        // OR a colour to be set
	        
	        // Return a three element list of rgb colours
	        // if the Card Image: value is a valid colour
	        // Otherwise undefined
	        
	        cardBGcolour = identifyCardBackgroundColour( m[1]);
	        picUrl = identifyPicUrl( m[1]);
	        
    	    //picUrl=m[1];
    	    description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    // Find any ItemDetailsHeaders that indicate the item is hidden
	    hidden = jQuery(this).parent().find('.contextItemDetailsHeaders').filter(":contains('Item is hidden from students.')");
	    //.siblings('contextItemDetailsHeaders')
	
	    // Check to see if an image with title "Card Image" has been inserted
	    var inlineImage = jQuery(this).find('img').attr('title', 'Card Image');
	    if (inlineImage.length) {
	        picUrl=inlineImage[0].src;
	        //console.log("item html" + inlineImage[0].outerHTML);
	        description = description.replace(inlineImage[0].outerHTML,"");
	        // Bb also adds stuff when images inserted, remove it from 
	        // description to be placed into card
	        var bb = jQuery.parseHTML(description);
	        // This will find the class
	        stringToRemove = jQuery(description).find('.contextMenuContainer').parent().clone().html();
	        description = description.replace( stringToRemove, '');
	    }
	    
	    // Parse the date for commencing
	    // date will be in object with start and end members
	    var date = handleDate( description );
	    // kludge to modify the local description based on changes
	    // done in handleDate
	    description = date.descrip;
	    
	    // See if there's a different label for date
	    m = description.match(/card date label *: ([^<]*)/i);
	    var dateLabel='Commencing';
	    if (m) {
	        dateLabel=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    
	    // See if the Course Label should be changed
	    var label="Module";
	    
	    m = description.match(/card label *: *([^<]*)/i );
	    if (m) {
	        label=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    // get active image
	    var activePicUrl = '';
	    var regex = new RegExp("card image active\s*:\s*([^<]*)", "i");
	    m = description.match( regex );
	    if (m) {
	        activePicUrl=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    // Get course number
	    var number='x';
	    m = description.match(/card number *: *([^<]*)/i );
	    if (m) {
	        number=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	        if (number.match(/none/i)) {
	            number='&nbsp;'
	        }
	    }
	    // Get Image IFrame
	    var iframe='';
	    m = description.match(/card image iframe *: *(<iframe.*<\/iframe>)/i );
	    if (m) {
	        iframe=m[1];
	        // replace the width and height
	        x = iframe.match(/width="[^"]+"/i);
	        if (x) {
	            iframe = iframe.replace(x[0], 'width="100%"');
	        }
	        x = iframe.match(/height="[^"]+"/i);
	        if (x){
	            iframe=iframe.replace(x[0], 'height="auto"');
	        }
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    
	    // Get assessment related information
	    var assessmentType="",assessmentWeighting="",assessmentOutcomes="";
	    
	    m = description.match(/assessment type *: *([^<]*)/i );
	    if (m) {
	        assessmentType=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    m = description.match(/assessment weighting *: *([^<]*)/i );
	    if (m) {
	        assessmentWeighting=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    m = description.match(/assessment outcomes *: *([^<]*)/i );
	    if (m) {
	        assessmentOutcomes=m[1];
	        description = description.replace( "<p>"+m[0]+"</p>","");
	        description = description.replace( m[0], "");
	    }
	    
	    // need to get back to the header which is up one div, a sibling, then span
	    var header = jQuery(this).parent().siblings(".item").find("span")[2];
	    var title = jQuery(header).html(),link,linkTarget='';
	    
	    //--------------------------------
	    // Three options for link
	    // 1. A link on the header (e.g. content folder)
	    // 2. No link (e.g. a content item)
	    // 3. A link in the attached filed (content item with attached file)
	    //    This one is kludgy. e.g. doesn't handle multiple files. 
	    //    Currently sets the link to the last file
	    //    TODO figure out what do with multiple files
	    link = jQuery(header).parents('a').attr('href');
	    linkTarget = jQuery(header).parents("a").attr("target");
	    
	    // if link is empty, must be content item
	    if ( link === undefined ) {
	        // check to see if there are attached fileds
	        filesThere = jQuery(this).parent().find('.contextItemDetailsHeaders').filter(":contains('Attached Files:')");
	        
	        if ( filesThere !== undefined) {
	            // get a list of all attached files
	            lis = jQuery(this).parent().find('.contextItemDetailsHeaders').children('.detailsValue').children("ul").children("li"); 
	            
	            // loop through the files and get the link
	            lis.each( function(idx, li){
	                // get the link
	                link = jQuery(li).children("a").attr("href");
	            });
	        }
	        //.siblings('contextItemDetailsHeaders')
	    }
	    
	    
	    // get the itemId to allow for "edit" link in card
	    var itemId = jQuery(this).parents('.liItem').attr('id');
	    //console.log("Item id " + itemId + " for link " + link );
	    // Hide the contentItem  TODO Only do this if display page
	    var tweak_bb_active_url_pattern = "listContent.jsp";
	    if (location.href.indexOf(tweak_bb_active_url_pattern) > 0 ) { 
	        // TODO un comment this Reviewed
	        jQuery(this).parent().parent().hide();
	        //console.log( "content item " + contentItem.html());
	    }
	    // save the item for later
	    var item = {title:title, picUrl:picUrl, cardBGcolour:cardBGcolour,
	        description:description, date:date, label:label,
	        link:link, linkTarget:linkTarget,
	        review:review,
	        dateLabel:dateLabel,id:itemId,activePicUrl:activePicUrl,
	        assessmentWeighting:assessmentWeighting,
	        assessmentOutcomes:assessmentOutcomes,
	        assessmentType:assessmentType
	    };
	    if (number!=='x' ) {
	        item.moduleNum=number;
	    }
	    if (iframe!=='') {
	        item.iframe=iframe;
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
	
	//console.log(items);
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
 	
 	// Define the text for Review Status
 	var MARK_REVIEWED = "Mark Reviewed"
 	var REVIEWED = "Reviewed";
 	
 	// get the content item with h3 heading containing Card Interface
 	var cardInterface = jQuery(tweak_bb.page_id +" > "+tweak_bb.row_element).find(".item h3").filter(':contains("Card Interface")').eq(0);
 	

 	if ( cardInterface.length === 0){
        console.log("Card: Can't find item with heading 'Card Interface' in which to insert card interface");
        return false;
    } else {
        // get the title - text only, stripped of whitespace before/after
        var cardInterfaceTitle= jQuery.trim(cardInterface.text());
        
        
        //Extract parameters
        var m = cardInterfaceTitle.match(/Card Interface *([^<]*)/i );
        WIDTH='md:w-1/3';
        HIDE_IMAGES=false;
	    if (m) {
	        newParams = parse_parameters( m[1]);
	        
	        if ( newParams ) {
	            newParams.forEach( function(element) {
	                m = element.match(/template=["']vertical['"]/i );
	                m1 = element.match(/template=vertical/i );
	                if (m || m1) {
	                    template = VERTICAL;
	                } else if (element.match(/template=['"]horizontal['"]/i )) {
	                    template = HORIZONTAL;
	                } else if ( element.match(/noimages/)) {
	                    HIDE_IMAGES = true;
	                } else if ( x = element.match(/template=by([2-6])/i ) ) {
	                    WIDTH = "md:w-1/" + x[1];
	                } else if (x = element.match(/by([2-6])/i ) ) {
	                    WIDTH = "md:w-1/" + x[1];
	                } else if ( x = element.match(/[Bb][yY]1/ )) {     
	                    WIDTH = "md:w-full";
	                } else if ( element.match(/people/i)) {
	                    template = PEOPLE;
	                } else if (element.match(/noengage/i )) {
	                    template = HORIZONTAL_NOENGAGE;
	                } else if ( element.match(/logging/i)) {
	                    LOGGING = true;
	                } else if ( m = element.match(/engage=([^']*)/)) {
	                    engageVerb = m[1];
	                } else if (m=element.match(/template=assessment/i)){
	                    template = ASSESSMENT;
	                } else if ( m=element.match(/set[Dd]ate=([^\s]*)/ )){
	                    SET_DATE = m[1];
	                } else if ( m=element.match(/^reviewed=([^']*)/ui)) {
	                    REVIEWED = m[1];
	                } else if ( m=element.match(/^markReviewed=(.+)/i)) {
	                    MARK_REVIEWED = m[1];
	                }
	            });
	        }
	    } // if no match, stay with default
    }
    
  //  console.log("LOGGING IS " + LOGGING);
    // make the h3 for the Card Interface item disappear
    // (Can't hide the parent as then you can't edit via Bb)
    // Need to have the span in order to be able to reorder
    cardInterface.html('<span class="reorder editmode"></span>');
 	// Get the content area in which to insert the HTML
 	var firstItem = cardInterface.parent().siblings(".details");
    
 	// Use the card HTML template and the data in items to generate
 	// HTML for each card
    var cards = "" ;
    var moduleNum = 1;
    items.forEach( function(idx) {
	    var cardHtml=cardHtmlTemplate[template];
	    cardHtml = cardHtml.replace( '{WIDTH}', WIDTH);
	    // replace the default background colour if a different one
	    // is specific
	    if ( idx.cardBGcolour ) {
	        cardHtml = cardHtml.replace(/background-color:\s*rgb\(255,255,204\)/i, 'background-color: '+idx.cardBGcolour );
	    }
	    
	    //<div class="bg-cover h-48" style="background-image: url('{PIC_URL}'); //background-color: rgb(255,255,204)">{IFRAME}
	    // replace the Engage verb
	    
	    //---------------------------------------------
	    // Add in the mark review/reviewed options
	    var reviewTemplate = '';
	    if ( idx.review !== undefined) {
	        // only do it if there is a review option found
	        // check whether its a mark review or review
	        // - if link contains markUnreviewed then it has been
	        //   reviewed
	        if ( idx.review.match(/markUnreviewed/)) {
	            reviewTemplate = markUnReviewedLinkHtmlTemplate[template];
	            reviewTemplate = reviewTemplate.replace('{REVIEWED}', REVIEWED)
	        } else {
	            // it's the other one which indicates it has not been reviewed
	            reviewTemplate = markReviewLinkHtmlTemplate[template];
	            
	            reviewTemplate = reviewTemplate.replace('{MARK_REVIEWED}', MARK_REVIEWED)
	        }
	        // set the right link
	        reviewTemplate = reviewTemplate.replace('{LINK}',idx.review);
	    }
	    cardHtml = cardHtml.replace('{REVIEW_ITEM}',reviewTemplate);
	    //console.log("template is " + template);
	    // Only show module number if there's a label
	    if ( idx.label!=='') {
	        var checkForNum = idx.moduleNum;
	        if (idx.moduleNum) {
	            // if there's a hard coded moduleNum use that
	            cardHtml = cardHtml.replace('{MODULE_NUM}',idx.moduleNum);
	        } else {
	            // use the one we're calculating
	            //cardHtml = cardHtml.replace('{MODULE_NUM}',moduleNum);
	            cardHtml = cardHtml.replace(/\{MODULE_NUM\}/g,moduleNum);
	            checkForNum = moduleNum;
	 	    }
	 	    
	 	    // Update the title, check to see if it starts with label and 
	        // moduleNum.  If it does, remove them from the title
	        // So that the card doesn't duplicate it, but the information is 
	        // still there in Blackboard
	        var regex = new RegExp( '^' + idx.label + '\\s*' + checkForNum +
	                             '\\s*[-:]*\\s*(.*)')
	        var m = idx.title.match(regex );
	        if (m) {
	            idx.title = m[1];
	        }
	    } else { 
	       cardHtml = cardHtml.replace('{MODULE_NUM}','');
	    }
	    cardHtml = cardHtml.replace('{LABEL}',idx.label);
	    
	    var picUrl = setImage( idx);
	    
	    // replace the {IMAGE_URL} variable if none set
	    if ( ! idx.hasOwnProperty('iframe')) {
	        cardHtml = cardHtml.replace(/{IFRAME}/g, '');
	    } else {
	        cardHtml = cardHtml.replace(/{IFRAME}/g, idx.iframe);
	        // set pic URl to empty so non is provided
	        picUrl = ''
	    }
	    cardHtml = cardHtml.replace(/{PIC_URL}/g, picUrl);
	    cardHtml = cardHtml.replace('{TITLE}', idx.title);
	    cardHtml = cardHtml.replace( /\{ASSESSMENT[_ ]TYPE\}/g, idx.assessmentType);
	    cardHtml = cardHtml.replace( /\{WEIGHTING\}/g, idx.assessmentWeighting);
	    cardHtml = cardHtml.replace( /\{LEARNING_OUTCOMES\}/g, idx.assessmentOutcomes);
	    
	    // Get rid of some crud Bb inserts into the HTML
	    description = idx.description.replace(/<p/g, '<p class="pb-2"');
	    description = description.replace(/<a/g, '<a class="underline"');
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
	    
	    // If there is a linkTarget in Blackboard
	    if ( typeof idx.linkTarget!=='undefined' ) {
	        // replace "{LINK}" with "{LINK}" target="linkTarget"
	        cardHtml = cardHtml.replace( /"{LINK}"/g, '"{LINK}" target="' +
	                    idx.linkTarget + '"');
	    }
	    
	    if ( typeof idx.link!=='undefined') {
	        cardHtml = cardHtml.replace(/{LINK}/g, idx.link);
	    } else {
	        cardHtml = cardHtml.replace(/<a href="{LINK}" class="cardmainlink">/g, '');
	        cardHtml = cardHtml.replace(/class="clickablecard /, 'class="');
	    }
	    
	    // Should we add a link to edit/view the original content
	    if (location.href.indexOf("listContentEditable.jsp") > 0) {
	        editLink = editLinkTemplate.replace('{ID}', idx.id);
	        cardHtml = cardHtml.replace(/{EDIT_ITEM}/, editLink );
	    } else {
	        //cardHtml = cardHtml.replace(/{EDIT_ITEM}/,'');
	        
	        //editLink = editLinkTemplate.replace('{ID}', idx.id);
	        editLink = '<div><a href="#hello">&nbsp;</a></div>';
	        cardHtml = cardHtml.replace(/{EDIT_ITEM}/, editLink );
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
	 //           console.log(idx.date);
	            if ( ! idx.date.start.hasOwnProperty('week')) {
	                cardHtml = cardHtml.replace('{WEEK}','');
	            } else {
	                // if exam, use that template
	                // other wise construct dual week
	                var weekHtml = examPeriodTemplate;
	                if (idx.date.start.week!=='exam') {
	                    weekHtml = dualWeekHtmlTemplate.replace('{WEEK_START}', 
	                            idx.date.start.week);
	                    weekHtml = weekHtml.replace('{WEEK_STOP}',
	                        idx.date.stop.week);
	                }
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

function getTermDate( week, startWeek=true ) {
    //console.log("TERM is " + TERM + " week is " + week);
    var date = { date: "", month: "", week: week };
    if (( week<0) || (week>15) ) {
        if (week!=='exam') {
            return date;
        }
    }
    var start;
    if ( startWeek===true ) {
        // setting start week
        start = TERM_DATES[TERM][week].start;//[week].start;
    } else {
        start = TERM_DATES[TERM][week].stop;
    }
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
	
    m = description.match(/card date *: *week ([0-9]*)/i);
	if (m) {
	    // check to see if a range was specified
	    x = description.match(/card date *: *week ([0-9]*)-([0-9]*)/i);
	    if (x) {
	//        console.log('ZZZZZZZZZZZZZZZZZZZZZZ handling a range');
	        week = x[1];
	        endWeek = x[2];
	        date.stop = getTermDate( endWeek, false);
	        //console.log(date.stop);
	            
	        description = description.replace( "<p>"+x[0]+"</p>","");
            description = description.replace(x[0],"");
        } else {
      //      console.log('ZZZZ week date, but not a range');
            week = m[1];
	           
            description = description.replace( "<p>"+m[0]+"</p>","");
            description = description.replace(m[0],"");
        }
        
        date.start = getTermDate( week )
        //console.log( date);
	        
	         
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
	    } else {
	        // Fall back to check for exam period
	        m = description.match(/card date *: *exam *(period)*/i );
	        if (m) {
	            //console.log("match exam period");
	            date.start = getTermDate( 'exam');
	            date.stop = getTermDate('exam', false);
	            description = description.replace( "<p>"+m[0]+"</p>","");
    	        description = description.replace(m[0],"");
	            //console.log('Exam date is ' );
	            //console.log(date.start);
	            //console.log(date.stop);
	        }
	    }
	}
	date.descrip = description;
	return date;
} 

//*************************************************************
// picUrl = setImage( card )
// - given card object containing information about a card
// - return picUrl if no active card image
// - return picUrl if there is an active card image, but it's
//   not the date
// - return activePicUrl if there is one and it's not the date
function setImage( card) {
    // only use activePicURL if it is set and there are dates on
    // the card
    if ( card.activePicUrl!=='' &&
             card.date.start.date!=="" ){
        // there is an activePicUrl, check if it should be active
        
        // active means that the current date falls within the start/stop
        // dates for the card
        var start,stop, now;
        if ( SET_DATE==="") {
            now = new Date();
        } else {
            now = new Date( SET_DATE);
        }
        
        //console.log(card.date);
        if ( card.date.start.hasOwnProperty( 'month') &&
               card.date.start.month!==""){
        
            start = new Date( parseInt(YEAR), MONTHS.indexOf(card.date.start.month), parseInt(card.date.start.date));
        } 
        if ( card.date.stop.hasOwnProperty('month') &&
                  card.date.stop.month!=='') {
            stop = new Date( YEAR, MONTHS.indexOf(card.date.stop.month), card.date.stop.date);
            stop.setHours(23,59,0);
        } else if ( card.date.start.hasOwnProperty('week')){
            // there's no end date, but there is a start week
            // so set stop to end of that week
            stop = new Date( TERM_DATES[TERM][card.date.start.week].stop);  
            stop.setHours(23,59,0);
        } else { // no week for stop, meaning it's just on the day
            stop = new Date(start.getTime());
            stop.setHours(23,59,0);
        }
        
        if ( now>=start && now<=stop) {
            return card.activePicUrl;
        }
    }
    return card.picUrl;
}    

//**************************************************************
// cardBGcolour = identifyCardBackgroundColour( value );
// return undefined if value is not a valid CSS colour
// Otherwise return rgb(X,Y,Z)

function identifyCardBackgroundColour( input ) {
    
    // don't both if it's an empty string or a URL
    url = input.match(/^\s*http/i);
    if ( input === "" || url ) {
        return undefined;
    }
    var div = document.createElement('div'), m;
    div.style.color = input;
    // add to DOMTree to work
    document.body.appendChild( div );
    
    // extract the rgb numbers
    m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if( m) {
        return "rgb("+m[1]+","+m[2]+","+m[3]+")";
    } 
    return undefined;
}
    


//**************************************************************
// picUrl = identifyPicUrl( value )
// TODO - return "" if value is not a valid URI
//   Otherwise return the value
	        
function identifyPicUrl( value ) {
    
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

function getReviewStatus( vtbgen ) {
    // get parent    
    var parent = jQuery(vtbgen).parent();
    
    // check to see if it has the anchor with class button-5
    review = jQuery(parent).find("a.button-5");
    
    if ( review.length === 0) {
        return undefined
    } else {
        return jQuery(review).attr("href");
    }
}

//---------------------------------------------------------------------
// Given a string of parameters use some Stack Overflow provided
// regular expression magic to split it up into its component parts

function parse_parameters(cmdline) {
//    var re_next_arg = /^\s*((?:(?:"(?:\\.|[^"])*")|(?:'[^']*')|\\.|\S)+)\s*(.*)$/;
    var re_next_arg = /^\s*((?:(?:"(?:\\.|[^"])*")|(?:'[^']*')|\\.|\S)+)\s*(.*)$/;
    var next_arg = ['', '', cmdline];
    var args = [];
    while (next_arg = re_next_arg.exec(next_arg[2])) {
        var quoted_arg = next_arg[1];
        var unquoted_arg = "";
        while (quoted_arg.length > 0) {
            if (/^"/.test(quoted_arg)) {
                var quoted_part = /^"((?:\\.|[^"])*)"(.*)$/.exec(quoted_arg);
                unquoted_arg += quoted_part[1].replace(/\\(.)/g, "$1");
                quoted_arg = quoted_part[2];
            } else if (/^'/.test(quoted_arg)) {
                var quoted_part = /^'([^']*)'(.*)$/.exec(quoted_arg);
                unquoted_arg += quoted_part[1];
                quoted_arg = quoted_part[2];
            } else if (/^\\/.test(quoted_arg)) {
                unquoted_arg += quoted_arg[1];
                quoted_arg = quoted_arg.substring(2);
            } else {
                unquoted_arg += quoted_arg[0];
                quoted_arg = quoted_arg.substring(1);
            }
        }
        args[args.length] = unquoted_arg;
    }
    return args;
}