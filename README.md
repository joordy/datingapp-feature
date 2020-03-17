# Datingapp Feature

![Home](https://user-images.githubusercontent.com/48051912/76908303-a299bc00-68a8-11ea-9632-99f15fedd6c0.png)
![Match](https://user-images.githubusercontent.com/48051912/76908438-f4dadd00-68a8-11ea-9bc7-b875a14c1b38.png)



Hello there! 

My datingapp feature made for a school project. With this feature it will be possible to like people, and when you have a match, you can find them again in an overview. Later in the project I will collaborate with other students to make the dating app up and running. To read the process of creating the like feature, and about the whole dating app, you can have a look in [my Wiki](https://github.com/joordy/datingapp-feature/wiki).

## Table of Content

* Feature
* Getting started
* Use my app
* Database logic
* Used resources


## Feature

When the user is looking for a date, he wants to find one with mutial connections, so he can like them, and when the interest is mutual, they will be connected

## Getting started

When you already have a connection with [Git](https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html), and installed [NodeJs](https://www.webucator.com/how-to/how-install-nodejs-on-mac.cfm) on your computer you can easilly download my project. If you haven't already installed these programs, I recommend to do that first.

### Clone repository

You can clone my repository by typing the following command in your command-line:

`git clone https://github.com/joordy/datingapp-feature.git`

## Use My App


### 1. Install Node modules

Now you can navigate to your app, with `cd datingapp-feature`. The package.json file contains all the required modules. You can install all the necessary modules (stored in the dependencies) with the following command:

`npm install`


### 2. Run! 

You can start the node-server when you have reached the correct destination with commands like 'cd folderName'. Now with the command:

`node index.js`

You can visit [localhost:4000](http://localhost:4000/) to view the application. 

### 4. Database connection

If you can't connect with the database cause a `MongoObjectError` or something like this, feel free to contact me to ask for the `DB_URL` link to make a connection to the database. 


## Database logic

To understand what type of application I made, it's useful to know how the database of the application is structured. There is one big collection where all the users are placed in, included myself. The collection is called "allUsers" 

![Database Users](https://user-images.githubusercontent.com/48051912/76903339-27330d00-689e-11ea-916a-4cd15117f9bf.png)

On the left you see the selected database **users** In the database is one collection. The collection is called **allUsers**.


![Collection-allUsers](https://user-images.githubusercontent.com/48051912/76903342-29956700-689e-11ea-890d-aac84a976ff9.png)

The collection allUsers contains all the users that are registered to the dating application. Each user has his own Object. 

![Individual user](https://user-images.githubusercontent.com/48051912/76903341-29956700-689e-11ea-8c23-c918bc55291f.png)

At the individual object, that references a user in the application, you ca nsee which ID, name, age, work etc. they have. 


## Used resources

* NodeJS. (n.d.). — Download. Retrieved 2020, February 1, from https://nodejs.org/en/download/

* Express (n.d.). — Express Routing. Retrieved  2020, February 8, from https://expressjs.com/en/guide/routing.html

* The Net Ninja. (2016, May 25). — NodeJS Tutorial for Beginners. Retrieved 2020, February 12. [Video file] From https://www.youtube.com/watch?v=w-7RQ46RgxU&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp

* Top Templating engines for Javascript. (2019, 13 June). — Alex Ivanovs. Retrieved 2020, February 19, from https://colorlib.com/wp/top-templating-engines-for-javascript/

* EJS -- Embedded JavaScript templating. (n.d.). Retrieved 2020, February 20, from https://ejs.co/

* PUG. (n.d.). — Getting Started – Pug. Retrieved 2020, February 21, from https://pugjs.org/api/getting-started.html

* Traversy Media (2016, 26 May). — NodeJS & Express from Scratch [Video file]. Retrieved 2020, 22 February, from https://www.youtube.com/watch?v=Ad2ngx6CT0M

* MongoDB (n.d.). - Get Started with Atlas - MongoDB Atlas. Retrieved 2020, March 10, from https://docs.atlas.mongodb.com/getting-started/

* MongoDb (n.d.). — Compass - MongoDB Compass. Retrieved 2020, March 11, from https://www.mongodb.com/products/compass

* MongoDB. (n.d.). — Find — MongoDB Manual. Retrieved 2020, March 16, from https://docs.mongodb.com/manual/reference/command/find/

* MongoDB. (n.d.). — Db.collection.updateOne() — MongoDB Manual. Retrieved 2020, 17 March, from https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/

* MongoDB. (2018, November 24). — How to use MongoDB with NodeJS - Flaviocopes. Retrieved 2020, 16 March, from https://flaviocopes.com/node-mongodb/

* MongoDB. (n.d.). — A Basic introduction to Mongo DB — MongoDB Node.JS Driver 1.4.9 documentation. Retrieved 2020, March 15, from https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html

* NPM. (n.d.). - MongoDB npm | npm Documentation. Retrieved 2020, March 12, from https://www.npmjs.com/package/mongodb

* NPM. (n.d.). — Npm-install | npm Documentation. Retrieved 2020, February 6, from https://docs.npmjs.com/cli/install

## License

[MIT License &copy;](https://github.com/joordy/complete-datingapp/blob/master/LICENSE)