/* eslint-disable no-tabs */
/**
 * guCards
 * - class that takes a Blackboard page and provides Card specific information
 * TODO
 * - move to a factory model to support other page models
 */

const HORIZONTAL = 0; // original 3 cards per row
const VERTICAL = 1; // 1 card per row
const HORIZONTAL_NOENGAGE = 2; // original, but no engage
const PEOPLE = 5;
const ASSESSMENT = 6; // horizontal but show off people (BCI) version

export default class guCards {
  constructor(pageModel) {
    // get the data
    this.pageModel = pageModel;

    this.getCardItems();
    this.getParameters();
  }

  //  extract and parse the card items from the pageModel

  getCardItems() {
    // Find all the items that containg Card Image: OR Card Image Iframe:
    // Case insensitive
    // This will include any Content Item that includes this string
    // even if it isn't meant to be a card
    const cardRE = new RegExp('(card image) ?(iframe)?:', 'i');

    // extract just the content items from bbPage that match the cardRE
    const cardBbItems = [];
    this.pageModel.contentItems.forEach((item) => {
      if (item.body.innerText.match(cardRE)) {
        cardBbItems.push(item);
      }
    });

    // parse the content items and create the card data structure
    this.extractCardsFromContent(cardBbItems);
  }

  //--------------------------------
  // extractCardsFromContent( myCard)
  // - given an array of cards (HTML) convert into a reasonabl edatastructure

  extractCardsFromContent(myCards) {
    this.cards = []; // was items
    // reset card numbering
    const CARD_LABEL_NUMBERING = {};
    console.log(myCards);

    // Loop through each card and construct the items array with card data
    myCards.forEach((cardItem) => {
      // ------- check for any review status element
      // TODO **add back** let review = getReviewStatus(this);

      // TODO remove these lines
      const description = cardItem.body.innerHTML;
      console.log('----- card ');
      console.log(description);

      // extract all the possible meta data
      this.cardMetaData = this.extractCardMetaData(cardItem);
      console.log('---------------------- card Meta Data');
      console.log(this.cardMetaData);
    });
  }
  /*
	    // now have cardMetaData with all meta data and the non meta data
	    // description. Need to make the necessary changes based on data
	    // loop through each of the elements (but not description)

	    // tmp variables used to hold results before putting into single card object
	    let bgSize = '',
	      dateLabel = 'Commencing',
	      picUrl,
	      cardBGcolour;
	    let label = DEFAULT_CARD_LABEL,
	      activePicUrl = '',
	      number = '&nbsp;',
	      iframe = '';
	    let date,
	      comingSoon,
	      comingSoonLabel = 'Available';
	    let assessmentType = '',
	      assessmentWeighting = '',
	      assessmentOutcomes = '';

	    for (let index in cardMetaData) {
	      switch (index) {
		case 'card image':
		  [picUrl, cardBGcolour] = handleCardImage(cardMetaData[index]);
		  break;
		case 'card image active':
		  [activePicUrl, cardBGcolour] = handleCardImage(cardMetaData[index]);
		  break;
		case 'card image iframe':
		  iframe = handleCardImageIframe(cardMetaData[index]);
		  break;
		case 'card image size':
		  bgSize = handleCardImageSize(cardMetaData[index]);
		  break;
		case 'card date':
		  date = handleCardDate(cardMetaData[index]);
		  break;
		case 'card date label':
		  dateLabel = cardMetaData[index];
		  break;
		case 'card coming soon':
		  comingSoon = handleCardDate(cardMetaData[index]);
		  break;
		case 'card coming soon label':
		  comingSoonLabel = cardMetaData[index];
		  break;
		case 'assessment type':
		  assessmentType = cardMetaData[index];
		  break;
		case 'assessment weighting':
		  assessmentWeighting = cardMetaData[index];
		  break;
		case 'assessment outcomes':
		  assessmentOutcomes = cardMetaData[index];
		  break;
	      }
	    }
	    // handle card label and card number together
	    [label, number] = handleCardLabelNumber(
	      cardMetaData['card label'],
	      cardMetaData['card number']
	    );

	    // description changed to remove all the meta data
	    description = cardMetaData['description'];

	    // TODO is this still used?
	    // Find any ItemDetailsHeaders that indicate the item is hidden
	    let hidden = jQuery(this)
	      .parent()
	      .find('.contextItemDetailsHeaders')
	      .filter(":contains('Item is hidden from students.')");
	    // .siblings('contextItemDetailsHeaders')

	    // Grab the link that the card is pointing to
	    // need to get back to the header which is up one div, a sibling, then span
	    var header = jQuery(this).parent().siblings('.item').find('span')[2];
	    var title = jQuery(header).html(),
	      link,
	      linkTarget = '';

	    //--------------------------------
	    // Three options for link
	    // 1. A link on the header (e.g. content folder)
	    // 2. No link (e.g. a content item)
	    // 3. A link in the attached filed (content item with attached file)
	    //    This one is kludgy. e.g. doesn't handle multiple files.
	    //    Currently sets the link to the last file
	    //    TODO figure out what do with multiple files
	    link = jQuery(header).parents('a').attr('href');
	    linkTarget = jQuery(header).parents('a').attr('target');

	    // if link is empty, must be content item
	    if (link === undefined) {
	      // check to see if there are attached fileds
	      let filesThere = jQuery(this)
		.parent()
		.find('.contextItemDetailsHeaders')
		.filter(":contains('Attached Files:')");

	      if (filesThere !== undefined) {
		// get a list of all attached files
		let lis = jQuery(this)
		  .parent()
		  .find('.contextItemDetailsHeaders')
		  .children('.detailsValue')
		  .children('ul')
		  .children('li');

		// loop through the files and get the link
		lis.each(function (idx, li) {
		  // get the link
		  link = jQuery(li).children('a').attr('href');
		});
	      }
	      // .siblings('contextItemDetailsHeaders')
	    }

	    // get the itemId to allow for "edit" link in card
	    var itemId = jQuery(this).parents('.liItem').attr('id');
	    // Hide the contentItem  TODO Only do this if display page
	    var tweak_bb_active_url_pattern = 'listContent.jsp';
	    if (location.href.indexOf(tweak_bb_active_url_pattern) > 0) {
	      // TODO un comment this Reviewed
	      jQuery(this).parent().parent().hide();
	      // console.log( "content item " + contentItem.html());
	    }
	    // save the item for later
	    var item = {
	      title: title,
	      picUrl: picUrl,
	      bgSize: bgSize,
	      cardBGcolour: cardBGcolour,
	      description: description,
	      date: date,
	      label: label,
	      link: link,
	      linkTarget: linkTarget,
	      review: review,
	      dateLabel: dateLabel,
	      id: itemId,
	      activePicUrl: activePicUrl,
	      comingSoon: comingSoon,
	      comingSoonLabel: comingSoonLabel,
	      assessmentWeighting: assessmentWeighting,
	      assessmentOutcomes: assessmentOutcomes,
	      assessmentType: assessmentType,
	    };
	    if (number !== 'x') {
	      item.moduleNum = number;
	    }
	    if (iframe !== '') {
	      item.iframe = iframe;
	    }

	    // only add the card to display if
	    // - VIEW MODE is on and it's not hidden
	    // - EDIT MODE is on
	    if (hidden.length === 0 || LOCATION < 0) {
	      // add message that item is hidden to students when EDIT mode on
	      if (hidden.length === 1) {
		item.description = item.description.concat(HIDDEN_FROM_STUDENTS);
	      }
	      items.push(item);
	    }
	  });

	  // console.log(items);
	  return items;
	} */

  /**
   * @function extractCardMetaData
   * @param {Array} cardBbItems array of elements containing Bb content items that are cards
   *
   * Parse the cardBbItems and create
   */

  extractCardMetaData(cardBbItem) {
    this.done = 1; // KLUDGE TODO remove prevent lots of warnings
    // define hash to put values into it
    const metaDataValues = {};
    let description = cardBbItem.body.innerHTML;
    // let description = jQuery(descriptionObject).html();
    const CARD_METADATA_FIELDS = [
      'card label',
      'card number',
      'card date',
      'card date label',
      'card coming soon',
      'card coming soon label',
      'assessment type',
      'assessment weighting',
      'assessment outcomes',
      'card image',
      'card image iframe',
      'card image size',
      'card image active',
    ];

    // break up description into collection of ps and focus
    // use outerHTML to get the surrounding <p> etc so that it can be removed from
    // the description
    // TODO: Does this change screw up the complex shit that other people can
    //  do when they use line breaks, include HTML etc
    const elementHtmlObjects = cardBbItem.body.querySelectorAll('p');

    const elementContent = [];
    elementHtmlObjects.forEach((object) => {
      elementContent.push(object.innerHTML.trim());
    });
    console.log('extractCardMetaData: ----- found elementContent');
    console.log(elementContent);

    const tmpMetaData = [];

    // console.log("----------------------- extractCardMetaData");
    // check and break up the ps into individual bits of meta data
    const maxLength = elementContent.length;
    for (let i = 0; i < maxLength; i++) {
      //       console.log(`    _____________ working on para ${i} == ${elementContent[i]}`);
      // work on a temp copy of description
      // let partialDescription = elementContent[i].innerHTML;
      let partialDescription = elementContent[i];
      // get rid of newlines (definitely needed)
      // shouldn't be needed now
      //	  partialDescription = partialDescription.replace(/(?:\r\n|\r|\n)/g, " ");

      // eslint-disable-next-line no-loop-func
      CARD_METADATA_FIELDS.forEach((element) => {
        // search for the element, but initially assume that there is another
        // metadata variable within the current item (i.e. <p> </p>)
        // This happens when a <br> is used, rather than <p> between metadata
        // look for element, followed by a card metadata
        let re = new RegExp(
          `(${element}\\s*:\\s*.*)cards+(?:label|number|date|date label|image size|image active)[^:]*:`,
          'mi'
        );
        /*	      "(" +
						element +
						"\\s*:\\s*.*)cards+(?:label|number|date|date label|image size|image active)[^:]*:",
					      "mi"
					    ); */
        let m = partialDescription.match(re);
        // if not, check for assessment
        if (!m) {
          re = new RegExp(
            `(${element}\\s*:\\s*.*)assessments+(?:type|weighting|outcomes)[^:]*:`,
            'mi'
          );
          /*		"(" +
							  element +
							  "\\s*:\\s*.*)assessments+(?:type|weighting|outcomes)[^:]*:",
							"mi"
						      ); */
          m = partialDescription.match(re);
        }

        // if found, then we need extract just the matched element, leaving
        // the rest for a later iteration
        if (m) {
          //              console.log(`     -- found partial Descripiton match ${m[1]}`);
          // remove match from partialDescription, leaving any other potential
          // card stuff there for later (hence why m[1], not m[0])
          partialDescription = partialDescription.replace(m[1], '');
          // remove the match from the broader description
          // description = description.replace(m[1],'');
          // TODO does raise the question of why m[0] okay here
          description = description.replace(m[1], '');
          // added element for later processing - but remove the &nbsp;
          tmpMetaData.push(m[1].replace(/&nbsp;/gi, ' '));
        } else {
          // the <p> contains just the one metadata, replace the whole para
          // bad at RE, so check if it's the last one
          //             console.log("     -- bad RE???");
          re = new RegExp(`(${element}\\s*:\\s*.*)`, 'mi');
          //                re = new RegExp( "<p.*(" + element + "\\s*:\\s*.*)</p>$", "mi" );
          m = partialDescription.match(re);
          if (m) {
            // remove it from partial description
            // partialDescription = partialDescription.replace(re,'');
            partialDescription = partialDescription.replace(m[1], '');
            // remove the match from the broader description
            // TODO doesn't remove the surrounding <p> </p>
            //                    description = description.replace(m[1],'');
            description = description.replace(m[1], '');
            // added element for later processing - but remove any &nbsp;
            tmpMetaData.push(m[1].replace(/&nbsp;/gi, ' '));
          } else {
            // console.log(`      Search for ${element} no match`);
          }
        }
      });
    }

    //    console.log("---------------------- Finished parsing Ps");
    //   console.log(tmpMetaData);
    // At this stage tmpMetaData contains "html" for each card meta data
    // format should be "card label: value"
    // Loop thru each tmpMetaData element and extract value appropriately
    //  place in an object label -> value
    for (let i = 0; i < tmpMetaData.length; i++) {
      // extract the metaData label m[1] and value m[2]
      let re = new RegExp('\\s*(card\\s*[^:]*)\\s*:\\s*(.*)', 'im');
      let m = tmpMetaData[i].match(re, 'im');

      // didn't find a card value, try one of the assessment ones
      if (!m) {
        re = new RegExp('\\s*(assessment\\s*[^:]*)\\s*:\\s*(.*)', 'im');
        m = tmpMetaData[i].match(re, 'im');
      }

      if (m) {
        // extract label and value
        // ensure label matches METADATA name archetypes
        const label = m[1].trim().replace(/\\s*/, ' ').toLowerCase();
        const value = m[2];
        // make sure the HTML in value is valid
        const div = document.createElement('div');
        div.innerHTML = value;
        const newValue = div.innerHTML;

        metaDataValues[label] = newValue;
      } else {
      }
    }

    // used to edit the description element and ensure that it is correct HTML
    const div = document.createElement('div');
    div.innerHTML = description;
    // not used in inlineImage (yet)

    // handle the inline image
    // find any image in cardBbItem.body with title matching card image
    // if found set metaDataValue and remove the img
    //	let inlineImage = [];

    cardBbItem.body.querySelectorAll('img').forEach((img) => {
      if (img.getAttribute('title').match(/card image/i)) {
        // inlineImage.push(img);
        metaDataValues['card image'] = img.getAttribute('src');
        img.remove();
      }
    });

    // Make sure that the description is valid HTML (mostly closing tags)
    // jQuery handles this by default
    description = div.innerHTML;
    // remove any empty <p> tags from desciption
    description = description.replace(/<p>\s*<\/p>/g, '');
    // add the description minus metadata to metaDataValues, for later use
    metaDataValues.description = description;

    return metaDataValues;
  }

  /**
   * @function getParemeters
   * @description find the Card Interface element and process parameters
   */

  getParameters() {
    // TODO handle multiple Card Interface items
    let cardInterface = this.pageModel.cardInterfaces[0];
    let cardInterfaceTitle =
      cardInterface.querySelector('div.item > h3').innerText;

    // Extract parameters
    let m = cardInterfaceTitle.match(/Card Interface *([^<]*)/i);
    // TODO is this needed
    // let WIDTH = 'md:w-1/3';

	this.parameters = {
		WIDTH: 'md:w-1/3'
	};

    if (m) {
      let newParams = this.parse_parameters(m[1]);
      let x = '';

      if (newParams) {
        newParams.forEach(function (element) {
          m = element.match(/template=["']vertical['"]/i);
          const m1 = element.match(/template=vertical/i);
          if (m || m1) {
            this.parameters.template = VERTICAL;
          }
		  if (element.match(/template=['"]horizontal['"]/i)) {
            this.parameters.template = HORIZONTAL;
          }
		  if (element.match(/nocardnumber/i)) {
            this.parameters.NO_CARD_NUMBER = true;
          }
		  if (element.match(/nocomingsoon/i)) {
            this.parameters.NO_COMING_SOON = true;
          }
		  if (element.match(/noimages/i)) {
            this.parameters.HIDE_IMAGES = true;
          } 
		  let x = element.match(/template=by([2-6])/i)
		  if (x) {
            this.parameters.WIDTH = 'md:w-1/' + x[1];
          } 
		  x = element.match(/by([2-6])/i)
		  if (x) {
            this.parameters.WIDTH = 'md:w-1/' + x[1];
          } else {
			  x = element.match(/[Bb][yY]1/)
			  if (x){
            	this.parameters.WIDTH = 'md:w-full';
			  }
          } 
		  if (element.match(/people/i)) {
            this.parameters.template = PEOPLE;
          } 
		  if (element.match(/noengage/i)) {
            this.parameters.linkTemplate = HORIZONTAL_NOENGAGE;
          } 
		  if (element.match(/logging/i)) {
            this.parameters.LOGGING = true;
          }
		  m = element.match(/engage=([^']*)/)
		  if (m) {
            this.parameters.engageVerb = m[1];
          }
		  m = element.match(/template=assessment/i)
		  if (m) {
            this.parameters.template = ASSESSMENT;
          }
		  m = element.match(/set[Dd]ate=([^\s]*)/)
		  if (m) {
            this.parameters.SET_DATE = m[1];
          }
		  m = element.match(/^reviewed=([^']*)/iu)
		  if (m) {
            this.parameters.REVIEWED = m[1];
          }
		  m = element.match(/^markReviewed=(.+)/i)
		  if (m) {
            this.parameters.MARK_REVIEWED = m[1];
          }
        }, this);
      }
    } // if no match, stay with default */
  }

  //---------------------------------------------------------------------
  // Given a string of parameters use some Stack Overflow provided
  // regular expression magic to split it up into its component parts

  parse_parameters(cmdline) {
	let re_next_arg = /^\s*((?:(?:"(?:\\.|[^"])*")|(?:'[^']*')|\\.|\S)+)\s*(.*)$/;
	let next_arg = ['', '', cmdline];
	let args = [];
	while ((next_arg = re_next_arg.exec(next_arg[2]))) {
		let quoted_arg = next_arg[1];
		let unquoted_arg = '';
		while (quoted_arg.length > 0) {
			if (/^"/.test(quoted_arg)) {
				let quoted_part = /^"((?:\\.|[^"])*)"(.*)$/.exec(quoted_arg);
				unquoted_arg += quoted_part[1].replace(/\\(.)/g, '$1');
				quoted_arg = quoted_part[2];
			} else if (/^'/.test(quoted_arg)) {
				let quoted_part = /^'([^']*)'(.*)$/.exec(quoted_arg);
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
}
