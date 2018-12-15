# Card Interface Tweak

Interface kludge for Blackboard 9.1 

1. Given a Blackboard content page with a list of items. 
1. Find all the items using a defined format.
1. Produce a card like interface based on [Tailwindcss responsive css](https://codepen.io/njs/pen/BVdwZB), with each item becoming a card
1. Each of the Blackboard representations of the items is hidden
 
## How it works

1. Add an item to the page and copy and paste the contents of the **tweak.js** file into the description. Choose any title.
1. For every item you wish to have as a card, specify an image for the card using the data format below.

### Data format
 
An item to be turned into a card The description/body of the item should contain
> Card Image: __Image URL__

### Card format

1. Title of the Blackboard item becomes title of card
1. Card title is preceeded by **Module X**, where X is a number indicating the item's place in the sequence of cards
1. The card image is the __Card Image:__ image
1. Card description is the Blackboard item's description (minus the __Card Image:__ content)
1. If the Blackboard item is a folder or learning module (i.e. it links to another sub-item) the card will link to that item


