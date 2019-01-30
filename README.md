# Card Interface Tweak

A bit of digital renovation for Blackboard 9.1 in the form of some Javascript and CSS that can be used to transform a standard Blackboard content page (a collection) of items into responsive, image rich card interface. A transformation that can be accomplished with minimal technical knowledge.

### Before - standard Blackboard 9.1 content page

By default, Blackboard 9.1 provides a vertical list of content items.

![Normal Bb 9.1 content page](https://farm5.staticflickr.com/4822/46279789112_f6fde6f4f6.jpg)

(See [larger image](https://www.flickr.com/photos/david_jones/46279789112/))

### After - responsive, image rich card interface

With a few extra elements added (e.g. an image, a related date etc) the tweak transforms the default Blackboard appearance into a fully responsive and visual card interface. 

**New!!** Now with two different card interfaces:

1. a horizontal interface (shown in image below), cards displayed in rows of up to 3 (depending on browser window size) cards horizontally, and
1. a vertical interface where the cards are displayed vertically with one card to a row. 

![After the tweak](https://farm5.staticflickr.com/4844/46280738772_4f7a9ee623.jpg)

## Origins and inspiration

This Tweak is inspiried by and built somewhat upon [the Blackboard Tweaks building block](http://tweaks.github.io/Tweaks/).

## How to use the tweak

Assumptions is that you are starting with a Blackboard 9.1 site and that you have a Blackboard content page (see the before above)

#### 1. Add the Tweak Javascript

For the card transformation to happen on a Blackboard content page, some Javascript code needs to be inserted into the content page.

1. Create a new Blackboard content item on your Blackboard content page.
2. When editing this new content item, use [the HTML Code View Button](https://www.cpcc.edu/onlinelearning/resources/blackboard/BbAddEmbedCode.pdf) to open a pop-up window
3. Copy and paste the content of the [tweak.js file](https://raw.githubusercontent.com/djplaner/Card-Interface-Tweak/master/tweak.js) into this pop-up window
4. Save and submit your changes

#### 2. Create a space for the cards to appear

The card interface produced by the Tweak needs to appear in an existing content item on the same content page. 

1. Create a new Blackboard content item that is titled **Card Interface**
> Current advice is to leave this content item empty. The tweak will add content to it.
1. Choose the type of card interface you wish by adding one of the following words after **Card Interface**

  * **vertical** for one card per row with elements of a single card displayed horizontally
  * **by5** to have 5 cards per row
  * **noengage** if you'd prefer not to have the "Engage" button appear for content folders

#### 3. Specify the content item/folder you want to appear as a card

1. Add the phrase **Card Image:** (including the colon) to the content item/folder
> It's assumed that only content items or content folders are turned into cards. Each works a little differently. A content item will become an "info card". i.e. providing only information. A content folder will also be clickable. Clicking on a content folder will take the user into the folder.

The following is almost the simplest content item/folder for a card.

![Basic content item](https://farm5.staticflickr.com/4804/32690548888_1e3ed76595_n.jpg)

It will produce the following card.

![Transformed card interface](https://farm8.staticflickr.com/7836/45650083695_f8c6ce290f_n.jpg)

The title of the content item has become the title of the card, and the content of the content item becomes the card content. **Card Image:** and other "card commands" are removed from the content.

Note: that the card above does not have an image, rather the top of the card is a blank yellow space. 

#### 4. Specify the image you want to appear on the card

There are two methods that can be used:

1. Paste/type the URL for an image after **Card Image:**
>  **Card Image: http://djon.es/images/GrandCanyon.jpg**
1. [Insert the image](https://suffolk.screenstepslive.com/s/1050/m/bb9/l/11549-how-do-i-embed-a-picture-or-image-as-part-of-an-item) into the Blackboard content item and ensure that the _Image Description_ for the image is **Card Image**

For example, a content item like the following.

![Content item with image specified](https://farm5.staticflickr.com/4885/32690681948_06d899958d_n.jpg)

Will produce a card like this.

![Corresponding card interface](https://farm5.staticflickr.com/4853/32690681868_68d40300cf_n.jpg)

#### 4. Add a date

Each card can have a date associated with it.

1. Add **Card Date:** as a single line to the content item followed by the relevant date using the MMM DD format

For example, if **Card Date: Mar 4** is added to the content item from the previous steps the card will have a calendar graphic added to the top right of the card.

![Card with a date](https://farm5.staticflickr.com/4847/45650359185_305a721313_n.jpg)

#### 5. Change the date name

By default, a card date will be preceeded by **Commencing**. You can change this.

1. Add **Card Date Label: _Due_** Where you replace _Due_ with whatever word you wish to use.

For example, the following content item

![Content item with new date label](https://farm8.staticflickr.com/7810/46564373241_5387dd591c_n.jpg)

will produce the following card

![Card with new date label](https://farm5.staticflickr.com/4864/45650359455_4aa522a829_n.jpg)

#### 6. Change the card label

If the content item you are adding is either a _Content Folder_ or _Module Page_ (i.e. it links to another Blackboard content page) then card will be labelled (by default) as **Module _X_**. Where **_X_** is replaced a number representing the number of the card. 

For example, the card above has the card label **Module 5**. Meaning it was the 5th card content item on this page. **Module** may not be the label you wish to use.

1. Add a line with **Card Label: _new name_** to the content item
> Replace **_new name_** with the label you wish to use.

For example, the following content item specifies the use of _Learning path_ as the new card label.

![Content item specifying new card label](https://farm5.staticflickr.com/4855/31623611047_3c8941a9a6_n.jpg)

Producing this card.

![Card with new label](https://farm5.staticflickr.com/4901/46564616831_81df4d7077_n.jpg)



