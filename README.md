
# Mass Keno Tracker

This is a single page real time data visualization web app for the [Massachusett's Lottery's Keno game](http://www.masslottery.com/games/keno.html) built in javascript using Backbone and Require. It uses data from [the Massachusett's Lottery's daily Keno data object](http://www.masslottery.com/data/json/search/dailygames/todays/keno.json) which I'm serving as JSONp data from an S3 bucket to prevent undue load to the lottery's website.

## Getting Started

By default the app shows data from all of the day's Keno games. However, using the text box in the heading area you can adjust it to poll a subset of games. As new games are drawn the updated data is loaded into the browser.

"Hot" and "cold" numbers are calculated based on the number of games being polled and indicated with blue and red borders. 

Draw frequency is also inidicated with opacity. The darker the background of a number the more often it has been drawn. If polling a small number of games (<10) you may see some numbers completely disappear if they haven't been drawn yet at all, as new games are drawn and more data is available their opacity will be updated.

Bets can be saved by clicking on a series of numbers on the board and then clicking the "save bet" button that appears. The app will report the overall status of the bet over the course of the number of games being displayed on the board using the current Keno payout structure. This calculation assumes the standard $1 bet for each draw. **It should go without saying this is not a real Keno wager.** Even when a number is "invisible" (as noted above) it can still be clicked on and included in a bet.

To remove a saved bet just click on it in the bets list. There is no limit to how many bets can be saved. Numbers can be reused across bets (for example: you can track betting 05,06,07 and 05,06,09).

Hovering over any individual number shows how many times it has been drawn in a tool tip (another mobile UI nightmare, help!).

## The Front End

This project is a pretty straightforward Backbone and Require single page web app. Basically a bunch of Backbone views tied together via a single "app" view that manages the eventing. Collections and models all provide a hefty dose of helper functions to make working through the data as clean as possible.
 
Optimized files are generated via grunt. To build new optimized files for this project simply clone it, run `npm install` to setup grunt, and issue the `grunt` command. The default task lints the code and builds with the r.js optimizer.

If you'd like to hack around on this code, it would probably be easier to do so without having to optimize everytime you make a change. Just comment out the optimize block and uncomment the require block in `index.html`.

### ToDo

Front end chores in no particular order:

 - Fix UI
 - Allow lookup of a specific keno draw by game number
 - Maybe support keno bonus calculations if a good UI can be worked out
 - While this works on mobile, the ratio is all off for most screen sizes...

## The Server Side

There is a very simple backend responsible for writing JSONp data to S3 so the app can get realtime game data. The code for this backend exists in the server directory. 

The app is configured to read from my S3 bucket by default, so using the app does not require you to set up your own server. If, however, you find yourself interested in giving it a shot, here's what's going on.

### How It Works

I have a m1.small server booted in EC2 configured to run the `realtimeKenoService` via cron every minute.

**Crontab:**

```
* * * * * /usr/bin/php5 /mnt/www/keno/realtimeKenoService.php
``` 

This queries The Massachusett's Lottery servers for a [JSON object containing the day's Keno draw data](http://www.masslottery.com/data/json/search/dailygames/todays/keno.json). This object gets wrapped in a callback function and written to S3 where the front end can read it, preventing both my little m1.small and the state's servers from being bombarded by realtime requests from anyone that's experimenting or using this app.

It's a bit ham-handed in that it queries and writes every minute, regardless of whether it needs to or not, but that's fine for now.


### Dependencies

The server directory contains everything necessary to get the backend setup. The _assumed_ dependencies are pretty minimal:

 - php5
 - php5-cli
 - php5-curl
 - Composer
 
 ```
 sudo apt-get install php5
 sudo apt-get install php5-cli
 sudo apt-get install php5-curl
 curl -sS https://getcomposer.org/installer | php
 ```
 
 The project's dependencies can be satisfied via composer:
 
 ```
 php composer.phar install
 ```
 
 This will install the AWS PHP SDK and Guzzle as per the `composer.json` file.
 
  
### IAM Policy

The server authenticates to AWS using the `KenoBucketService` class and inherits the following IAM policy that I've setup:

```
{
  "Statement": [
        {
            "Effect": "Allow",
            "Action": [ "s3:PutObject", "s3:PutObjectAcl"],
            "Resource": [ "arn:aws:s3:::keno-tracker-ma/*"]
        }
  ]
}
```
### ToDo

Server side chores to accomplish at some point: 

 - Support archival data instead of just the current day 

