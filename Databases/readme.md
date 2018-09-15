# Databases

## Intro to Databases

* What is a database?
  * A Collection of information / data
  * Has an interface
* SQL (Relational) vs NoSQL (Non-Relational)

---

## SQL Example

## Users Table

|Id           |Name           |Age            |City           |
|-------------|:--------------|:-------------:|:--------------|
|1            |John           |24             |Denver         |
|2            |Tim            |32             |NYC            |

## Comments Table

|Id           |Text           |
|-------------|:--------------|
|1            |"Lol"          |
|2            |"Cool Picture!"|

## User / Comment Join Table

|UserId       |CommentId      |
|-------------|:--------------|
|1            |1              |

---

# NoSQL Example

Looks like JSON, but is BSON (Binary JSON)
```
{
  Name: "Kevin",
  Age: 17,
  City: Chicago,
  Comments: [
    {text: "Lol"},
    {text: "Cool Picture!"}
  ]
}
```

# Important Mongo Commands

* mongod
* mongo
* help
* show dbs
* use
* insert
  * Example: db.dogs.insert({name: "Tux", breed: "Yorkie-Poodle"})
* find
  * Example: db.dogs.find()
    * db.dogs.find({name: "Tux"})
* update
  * Example: db.dogs.update({name:"Tux"}, {breed: "Poodle"})
    * The line above will find a dog named Tux, and update his information so that it only contains breed = Poodle. If we wanted to update Tux so that we just update his breed, use the code found below.
  * Example: db.dogs.update({name: "Tux"}, {$set: {breed: "Poodle"}})
    * This will preserve Tux's name, and update just the breed.
* remove
  * Example: db.dogs.remove({breed: "Poodle"})
    * Remove everything that matches

# Mongoose

* What is Mongoose?
* Why are we using it?
* Interact with Mongo Database using Mongoose
