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

* Review the RESTful routes
* Add description to campground model
* Use db.collection.drop()
* Add a show route/template

RESTFUL ROUTES Example

name        url                 verb        description
===========================================================================
INDEX       /campgrounds        GET         Display a list of all campgrounds
NEW         /campgrounds/new    GET         Displays form to make a new campground
CREATE      /campgrounds        POST        Add new campground to DB
SHOW        /campgrounds/:id    GET         Shows info about one campground