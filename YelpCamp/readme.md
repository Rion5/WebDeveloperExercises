# YelpCamp

## 1) Initial Setup

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:

* Name
* Image

## 2) Layout and Basic Styling

* Create the header and footer partials
* Add in Bootstrap

## 3) Creating New Campgrounds

* Setup a new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## 4) Style the Campgrounds Page

* Add a be header / title
* Make campgrounds display in a grid

## 5) Style the Navbar and Form

* Add a navbar to all templates
* Style the new campground form

## 6) Add Mongoose

* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

## 7) Show Page

* Review the RESTFUL routes
* Add description to campground model
* Use db.collection.drop()
* Add a show route/template

## RESTful Routes Example

|name        |url           |verb          |description   |
|------------|:-------------|:------------:|:-------------|
|INDEX       |/campgrounds          |GET        |Display a list of all campgrounds|
|NEW         |/campgrounds/new      |GET        |Displays form to make a new campground|
|CREATE      |/campgrounds          |POST       |Add new campground to DB|
|SHOW        |/campgrounds/:id      |GET        |Shows info about one campground|
|EDIT        |/campgrounds/:id/edit |GET        |Shows edit form for one campground|
|UPDATE      |/campgrounds/:id      |PUT        |Update a particular campground, then redirect somewhere|
|DESTROY     |/campgrounds/:id      |DELETE     |Delete a particular campground, then redirect somewhere|

## 8) Refactor Mongoose Code

* Create a models directory
* Use model.exports
* Require everything correctly

## 9) Add Seeds File

* Add a seeds.js file
* Run the seeds file every time the server starts

## 10) Add the Comment model

* Fix errors
* Display comments on campground SHOW page

## 11) NEW & CREATE Comment Routes

* Use nested routes
  * ie: campgrounds/:id/comments/new
* Add the NEW and CREATE routes
* Add the new comment form

## 12) Style Show Page

* Add sidebar to show page
* Display comments nicely

## 13) Finish Styling Show Page

* Add public directory
* Add custom stylesheet

## 14) Add User Model (Auth pt. 1)

* Install all packages needed for authentication
* Define User Model

## 15) Register (Auth pt. 2)

* Configure Passport
* Add register routes
* Add register template

## 16) Login (Auth pt. 3)

* Add login routes
* Add login template

## 17) Logout/Navbar (Auth pt. 4)

* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly
  * ie - Only show logout link, if user is signed in

## 18) Show/Hide Links (Auth pt. 5)

* Show/hide authentication links in navbar

## 19) Refactor the Routes

* Use Express router to reorganize all routes

## 20) Users + Comments

* Associate users and comments
* Save author's name to a comment automatically

## 21) Users + Campgrounds

* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

## 22) Editing Campgrounds

* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem