# RESTful Routing

## Introduction

* Define REST and explain why it matters
* List all 7 RESTful routes
* Show example of RESTful routing in practice

REST - a mapping between HTTP routes and CRUD

A RESTful route is a route that provides mapping between HTTP verbs (get, post, put, delete, patch) to controller CRUD actions (create, read, update, delete). Instead of relying solely on the URL to indicate what site to visit, a RESTful route also depends on the HTTP verb and the URL.

## RESTful Routes Example

|name        |url           |verb          |description   |
|------------|:-------------|:------------:|:-------------|
|INDEX       |/campgrounds          |GET        |Display a list of all campgrounds|
|NEW         |/campgrounds/new      |GET        |Displays form to make a new campground|
|CREATE      |/campgrounds          |POST       |Add new campground to DB|
|SHOW        |/campgrounds/:id      |GET        |Shows info about one campground|
|EDIT        |/campgrounds/:id/edit |GET        |Shows edit form for one campground|
|UPDATE      |/campgrounds/:id       |PUT        |Update a particular campground, then redirect somewhere|
|DESTROY     |/campgrounds/:id      |DELETE     |Delete a particular campground, then redirect somewhere|  

## Basic Layout

* Add Header and Footer Partials
* Include Semantic UI
* Add Simple Nav