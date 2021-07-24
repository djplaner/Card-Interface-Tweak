# Card Interface Tweak

Insert a [bit of HTML/CSS/Javascript](https://raw.githubusercontent.com/djplaner/Card-Interface-Tweak/master/tweak.js) into a [Blackboard Learn](https://en.wikipedia.org/wiki/Blackboard_Learn) content area and transform it into a responsive, image rich [card interface](https://www.smashingmagazine.com/2016/10/designing-card-based-user-interfaces/). 

| **Before** | **After**| 
| --- | ---- |
| ![Normal Bb Learn content area](https://github.com/djplaner/Card-Interface-Tweak/raw/master/docs/images/before.png) | ![Transformed into Card Interface](https://github.com/djplaner/Card-Interface-Tweak/raw/master/docs/images/after.png) |

## Documentation

See [the Card Interface documentation site](https://djplaner.github.io/Card-Interface-Tweak/) for more detail on what this is, why you'd want to use it, and how.

When the tweak is added to your Blackboard site, it will include links to the documentation explaining how to perform most common tasks.

## Origins and rationale

The [following conference paper](https://djon.es/blog/2019/08/08/exploring-knowledge-reuse-in-design-for-digital-learning-tweaks-h5p-constructive-templates-and-casa/) and [associated presetation](https://djon.es/blog/2019/11/28/how-to-share-design-knowledge-in-design-for-digital-learning/) contain more background and theory about this approach
> Jones, D. (2019). Exploring knowledge reuse in design for digital learning: Tweaks, H5P, CASA and constructive templates. In Y. W. Chew, K. M. Chan, & A. Alphonso (Eds.), Personalised Learning. Diverse Goals. One Heart. ASCILITE 2019 (pp. 139–148).

### Inspiration

This Tweak is inspiried by [the Blackboard Tweaks building block](http://tweaks.github.io/Tweaks/).

## Status

Slowly converting to new method.  Up to the stage of correctly extract cardMetaData from one card
- guCards.js

To do
- finish the getParameters in guCards - TEST
- finish the extractCardMeta data harness functions in guCards
	- working on handleCardImage
- start view render