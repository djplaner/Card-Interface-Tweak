# Card Interface Tweak documentation

The Card Interface Tweak is a bit of Javascript/CSS that will transform a standard [Blackboard Learn](https://en.wikipedia.org/wiki/Blackboard_Learn) content area into a responsive, image rich [card interface](https://www.smashingmagazine.com/2016/10/designing-card-based-user-interfaces/).

| **Before** | **After**| 
| --- | ---- |
| ![Normal Bb Learn content area](images/before.png) | ![Transformed into Card Interface](images/after.png) |


<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css">
<div id="guCardInterface" class="flex flex-wrap">
 
  <div class="clickablecard w-full sm:w-1/2 md:w-1/2 flex flex-col p-1">
    <!--<div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> Relative could go -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="whatWhy/">
      <div class="bg-cover h-48 hover:outline-none hover:shadow-outline bg-white rounded-t-lg shadow-lg overflow-hidden flex-1 flex flex-col relative" style="background-image: url(' https://live.staticflickr.com/7158/6751047205_2df88f2ddc_c_d.jpg'); background-color: rgb(255,255,255)">
      </div>
      </a>
      <div class="carddescription p-2 flex-1 flex flex-col pt-0">
        <h3 class="mb-1 text-2xl"><a href="whatWhy/" class="text-black no-underline hover:underline">What and why?</a></h3>
        <div class="mb-1 flex-1">
           <p class="pb-1">What does it do? Why is this an educationally good idea?</p> 
        </div>
        <p>&nbsp;<br> </p>
        <div class="p-2 absolute pin-r pin-b">
           <a href="whatWhy/" class="gu-engage"><div class="hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            Engage
        </div>
        </div>
      </div>
    </div>
  </div>

  <div class="clickablecard w-full sm:w-1/2 md:w-1/2 flex flex-col p-1">
    <!--<div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> Relative could go -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="createCards/">
      <div class="bg-cover h-48 hover:outline-none hover:shadow-outline bg-white rounded-t-lg shadow-lg overflow-hidden flex-1 flex flex-col relative" style="background-image: url('https://live.staticflickr.com/5604/15323880649_b9332d888c_c_d.jpg'); background-color: rgb(255,255,255)">
      </div>
      </a>
      <div class="carddescription p-2 flex-1 flex flex-col pt-0">
        <h3 class="mb-1 text-2xl"><a href="createCards/" class="text-black no-underline hover:underline">Create Cards</a></h3>
        <div class="mb-1 flex-1">
           <p class="pb-1">How do you add cards to your Blackboard Learn content area?</p> 
        </div>
        <p>&nbsp;<br> </p>
        <div class="p-2 absolute pin-r pin-b">
           <a href="createCards/" class="gu-engage"><div class="hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            Engage
        </div>
        </div>
      </div>
    </div>
  </div>

  <div class="clickablecard w-full sm:w-1/2 md:w-1/2 flex flex-col p-1">
    <!--<div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> Relative could go -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="customiseACard/">
      <div class="bg-cover h-48 hover:outline-none hover:shadow-outline bg-white rounded-t-lg shadow-lg overflow-hidden flex-1 flex flex-col relative" style="background-image: url('https://live.staticflickr.com/5533/9720306280_5710d5c4cd_c_d.jpg'); background-color: rgb(255,255,255)">
      </div>
      </a>
      <div class="carddescription p-2 flex-1 flex flex-col pt-0">
        <h3 class="mb-1 text-2xl"><a href="customiseACard/" class="text-black no-underline hover:underline">Customise a Card</a></h3>
        <div class="mb-1 flex-1">
           <p class="pb-1">How do you:</p>
           <ul>
             <li> Add an image? </li>
             <li> Use a background colour?</li>
             <li> Add a date or date range?</li>
             <li> Change/remove the label? </li>
           </ul>
        </div>
        <p>&nbsp;<br> </p>
        <div class="p-2 absolute pin-r pin-b">
           <a href="customiseACard/" class="gu-engage"><div class="hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            Engage
        </div>
        </div>
      </div>
    </div>
  </div>

  <div class="clickablecard w-full sm:w-1/2 md:w-1/2 flex flex-col p-1">
    <!--<div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> Relative could go -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="customiseAllCards/">
      <div class="bg-cover h-48 hover:outline-none hover:shadow-outline bg-white rounded-t-lg shadow-lg overflow-hidden flex-1 flex flex-col relative" style="background-image: url('https://live.staticflickr.com/65535/49629884077_b519916d0d_c_d.jpg'); background-color: rgb(255,255,255)">
      </div>
      </a>
      <div class="carddescription p-2 flex-1 flex flex-col pt-0">
        <h3 class="mb-1 text-2xl"><a href="customiseAllCards/" class="text-black no-underline hover:underline">Customise all cards</a></h3>
        <div class="mb-1 flex-1">
           <p class="pb-1">How do you:</p>
           <ul>
             <li> Select a different card template? </li>
             <li> Change the number of cards per row?</li>
             <li> Change/remove "Engage"? </li>
             <li> Change the order of cards?</li>
           </ul>
        </div>
        <p>&nbsp;<br> </p>
        <div class="p-2 absolute pin-r pin-b">
           <a href="customiseAllCards/" class="gu-engage"><div class="hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
               Engage
        </div></a>
        </div>
      </div>
    </div>
  </div>

</div>


### Image Attribution

["Question mark, Ipswich, 21 January 2010"](https://www.flickr.com/photos/omcoc/6751047205) by [ed_needs_a_bicycle](https://www.flickr.com/photos/omcoc/6751047205) is licensed under [CC BY-NC-SA 2.0](http://creativecommons.org/licenses/by-nc-sa/2.

["Creation"](https://www.flickr.com/photos/92559558@N04/15323880649/) by [Ha Jeong Jeong](https://www.flickr.com/photos/92559558@N04/) is licensed under [CC BY-SA 2.0](http://creativecommons.org/licenses/by-sa/2.

["Custom"](https://www.flickr.com/photos/86755183@N04/9720306280/) by [Fred More](https://www.flickr.com/photos/86755183@N04/) is licensed under [CC BY-NC 2.0](http://creativecommons.org/licenses/by-nc/2.

["Nakuru, The Lake of 1,000,000 Flamingos"](https://www.flickr.com/photos/rayinmanila/49629884077/) by [Ray in Manilla](ihttps://www.flickr.com/photos/rayinmanila/) is licensed under [CC BY 2.0](http://creativecommons.org/licenses/by/2.