# Card Interface Tweak

Interface kludge for Blackboard 9.1 

1. Given a Blackboard content page with a list of items. 
1. Find all the items using a defined format.
1. Produce a card like interface based on [Tailwindcss responsive css](https://codepen.io/njs/pen/BVdwZB), with each item becoming a card
1. Each of the Blackboard representations of the items is hidden

### Example

Editing a Blackboard content page with the card tweak looks like the following. Note the "normal" Blackboard content items after the cards. They are visible when editing.

![Editing card interface](https://farm5.staticflickr.com/4822/46279789112_a65b67243c.jpg)

When editing is turned off - the student view - the normal content items are hidden to give the following.

![Viewing card interface](https://farm5.staticflickr.com/4844/46280738772_932c7bf9f9.jpg)
 
### How it works

1. Add an item to the page and copy and paste the contents of the **tweak.js** file into the description. Choose any title.
1. For every item you wish to have as a card, specify an image for the card using the data format below.

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


