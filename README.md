# vkradio

Simple project with aim to share currently playing music with friends over internet.

After some failures with implementing via real shoutcast radio, I've decided to implement it in easiest way, so here it is.

## Usage
To shout with vkradio just open [http://redetection.github.io/vkradio/](http://redetection.github.io/vkradio/), login via VK.com and put your search request in the search bar at the bottom and hit return. On the new page there will be a link (you can share it with your listeners) and search results at the bottom. First link near every row will play audiotrack only for you, second one — for you and your listeners.

If you're listener, so just open the link you have in any modern browser and enjoy.


## License

Copyright © 2013 ReDetection

Distributed under the GNU LGPL

## Contribute

If you want to contribute just fork the repository, work on the code and submit a pull request through Github. Tasks I need to do:

* playlists support!!!
* play music from point where everyone is listening now (it's important when new listener connects because new track can replace playing one right in the middle of playing)
* design
* 'back' button to the welcome page
* localization
* a better code, perhaps in OOP style
* share link to the VK.com status, twitter, other social networks?
* share currently playing track to the music status field in VK.com
* what's with last.fm? maybe player.vas3k.ru will notify last.fm if user is logged in there?
* should process errors from parse.com and vkontakte
* count listeners?
* change url in omnibox to follow page purpose
* music recomendation from listeners would be a nice feature
* fetch playlists from vk, playlist from player.vas3k.ru
* generate playlist by recomendations on last.fm from already played tracks 
* maybe somewhen in the future merge this project into player.vas3k.ru

## Thanks

Thanks to [@vas3k](https://github.com/vas3k) for his player.vas3k.ru — it's a great work. I used that player in vkradio.
You'd better check it out at yourself: [github](https://github.com/vas3k/player.vas3k.ru), [site](https://github.com/vas3k/player.vas3k.ru).
