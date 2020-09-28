# Costify

Using ```Node.js```, ```express```,``` web scraping```, and free API's, Cositfy notifies users when their favorite products become on sale and processes them on a ```cron schedule```. Frontend made in ```React```, ```Next.js```, and ```chakra ui```.

![GitHub](https://img.shields.io/github/license/nishgowda/costify)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/nishgowda/costify)
![ScreenShot](misc/screen.png)

### Development
- Start up a postgres server and create a database. Feel free to use the example migrations included in this repo as mock data
- cd into **web** and **server** directories and run ```yarn install``` respectively to install all dependencies.

- run ```yarn dev``` in web directory to start local frontend and ```yarn start``` in server to start local server.

***Note***: in order for the email service to work, you would need a valid sendgrid api key

