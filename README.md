# Card Interface Tweak

A bit of digital renovation for Blackboard 9.1 in the form of some Javascript and CSS that can be used to transform a standard Blackboard content page (a collection) of items into responsive, image rich card interface. A transformation that can be accomplished with minimal technical knowledge.

### Before - standard Blackboard 9.1 content page

By default, Blackboard 9.1 provides a vertical list of content items.

![Normal Bb 9.1 content page](https://farm5.staticflickr.com/4822/46279789112_f6fde6f4f6.jpg)

(See [larger image](https://www.flickr.com/photos/david_jones/46279789112/))

### After - responsive, image rich card interface

With a few extra elements added (e.g. an image, a related date etc) the tweak transforms the default Blackboard appearance into a fully responsive and visual card interface.

![After the tweak](https://farm5.staticflickr.com/4844/46280738772_4f7a9ee623.jpg)

## Origins and inspiration

This Tweak is inspiried by and built somewhat upon [the Blackboard Tweaks building block](http://tweaks.github.io/Tweaks/).

## How to use the tweak

Assumptions is that you are starting with a Blackboard 9.1 site and that you have a Blackboard content page (see the before above)

#### 1. Add the Tweak Javascript

For the card transformation to happen on a Blackboard content page, some Javascript code needs to be inserted into the content page.

1. Create a new Blackboard content item on your Blackboard content page.
1. When editing this new content item, use [the HTML Code View Button](https://www.cpcc.edu/onlinelearning/resources/blackboard/BbAddEmbedCode.pdf) to open a pop-up window
1. Copy and paste the content of the [tweak.js file](https://raw.githubusercontent.com/djplaner/Card-Interface-Tweak/master/tweak.js) into this pop-up window
1. Save and submit your changes

#### 2. Create a space for the cards to appear

The card interface produced by the Tweak needs to appear in an existing content item on the same content page. 

1. Create a new Blackboard content item that is titled **Card Interface**
> Current advice is to leave this content item empty. The tweak will add content to it.

#### 3. Specify the content item(s) you want to appear as a card

1. Add the phrase **Card Image:** (including the colon) to the content item
> The simplest example content item and what it is transformed into is illustrated in the following images.

![Basic content item](https://farm5.staticflickr.com/4804/32690548888_1e3ed76595_n.jpg)

![Transformed card interface](https://farm8.staticflickr.com/7836/45650083695_f8c6ce290f_n.jpg)

Note: that the card above does not have an image, rather the top of the card is a blank yellow space.

#### 4. Specify the image you want to appear on the card

There are two methods that can be used:

1. Paste/type the URL for an image after **Card Image:**
>  **Card Image: http://djon.es/images/GrandCanyon.jpg**
1. [Insert the image](https://suffolk.screenstepslive.com/s/1050/m/bb9/l/11549-how-do-i-embed-a-picture-or-image-as-part-of-an-item) into the Blackboard content item and ensure that the _Image Description_ for the image is **Card Image**

![Content item with image specified](https://farm5.staticflickr.com/4885/32690681948_06d899958d_n.jpg)

![Corresponding card interface](https://farm5.staticflickr.com/4853/32690681868_68d40300cf_n.jpg)

#### 4. Add a date


#### 5. Add a date name

#### 6. Change the module name

to specify the image that shold be displayed
> 1. Ensure they have a line containing **Card Image:** to indicate it should become a card.
> 1. Specify an image to use on the card
> 1. Specify a card date with a line containing **Card Date: Mar 8** (Replace __Mar 8__ with your date, but in the same format)
> 1. Specify a label for the card (by default __Module__)


### Data format
 
An item to be turned into a card The description/body of the item should contain
> Card Image: __Image URL__

### Card format

The Blackboard item becomes a card by

1. Title of the Blackboard item becomes title of card
1. Card title is preceeded by **Module X**, where X is a number indicating the item's place in the sequence of cards
1. The card image is the __Card Image:__ image
1. Card description is the Blackboard item's description (minus the __Card Image:__ content)
1. If the Blackboard item is a folder or learning module (i.e. it links to another sub-item) the card will link to that item


