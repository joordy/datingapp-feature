# Datingapp Feature

Hello there! 

My datingapp feature made for a school project. With this feature it will be possible to like people, and when you have a match, you can find them again in an overview. Later in the project I will collaborate with other students to make the dating app up and running. 

To read the process of creating the like feature, and about the whole dating app, you can have a look in [my Wiki](https://github.com/joordy/datingapp-feature/wiki).


## Getting started

When you already have a connection with [Git](https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html), and installed [NodeJs](https://www.webucator.com/how-to/how-install-nodejs-on-mac.cfm) on your computer you can easilly download my project. If you haven't already installed these programs, I recommend to do that first.

### 1. Clone repository

You can clone my repository by typing the following command in your command-line:

`git clone https://github.com/joordy/datingapp-feature.git`


### 2. Install Node modules

Now you can navigate to your app, with `cd datingapp-feature`. The package.json file contains all the required modules. You can install all the necessary modules (dependencies) with the following command:

`npm install`


### 3. Run! 

You can start the node-server when you have reached the correct destination with commands like 'cd folderName'. Now with the command:

`node index.js`

You can visit [localhost:4000](http://localhost:4000/) to view the application. 

### 4. Database connection

If you can't connect with the database cause a MongoObjectError, take free to contact me to ask for the `DB_URL` to make a connection to the database. 


## Database logic

To understand what type of application I made, it's useful to know how the database of the application is structured. There is one big collection where all the users are placed in, included myself. The collection is called "allUsers" 

![Database Users](https://user-images.githubusercontent.com/48051912/76903339-27330d00-689e-11ea-916a-4cd15117f9bf.png)

On the left you see the selected database **users** In the database is one collection. The collection is called **allUsers**.


![Collection-allUsers](https://user-images.githubusercontent.com/48051912/76903342-29956700-689e-11ea-890d-aac84a976ff9.png)

The collection allUsers contains all the users that are registered to the dating application. Each user has his own Object. 

![Individual user](https://user-images.githubusercontent.com/48051912/76903341-29956700-689e-11ea-8c23-c918bc55291f.png)

At the individual object, that references a user in the application, you ca nsee which ID, name, age, work etc. they have. 


## Used resources

lorem