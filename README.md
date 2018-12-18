# Card Interface Tweak

Interface kludge for Blackboard 9.1 that transforms a standard Blackboard content page (a collection) of items into responsive, image rich card interface (based on [this approach](https://codepen.io/njs/pen/BVdwZB)). 

### Example

For the learner, the card interface looks like the following

![Viewing card interface](https://farm5.staticflickr.com/4844/46280738772_932c7bf9f9.jpg)

For the teacher/content author, they will see both the card interface and the Blackboard content that is used to construct the card interface.

![Editing card interface](https://farm5.staticflickr.com/4822/46279789112_a65b67243c.jpg)

The teacher/content author is able to edit the Blackboard content as they would normally and by doing this the content of the cards will change.

### How it works

1. Add the card tweak Javascript to the page
> 1. Create a new Blackboard content item on the page
> 1. Using the HTML Code view to copy and paste the contents of the **tweak.js** file into the description of this new item 
1. Add the Card Interface item
> 1. Use an existing or add a new Blackboard content item on the page that is titled **Card Interface**
> 1. Leave the content empty, the tweak will populate it
1. Create and/or identify the other items on the page that should become cards
> For each of these items
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


