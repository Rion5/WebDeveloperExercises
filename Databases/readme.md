# Databases

## Intro to Databases

* What is a database?
  * A Collection of information / data
  * Has an interface
* SQL (Relational) vs NoSQL (Non-Relational)

==========================
SQL Example
==========================

Users Table
Id | Name | Age | City
--------------------------
1  | Chai | 24  | Denver
2  | Tim  | 32  | NYC

Comments Table
Id | Text 
--------------------------
1  | "Lol"
2  | "Cool Picture!"

User / Comment Join Table
UserId | CommentId
--------------------------
1      | 1

==========================
NoSQL Example
==========================
Looks like JSON, but is BSON (Binary JSON)
{
  Name: "Kevin",
  Age: 17,
  City: Chicago,
  Comments: [
    {text: "Lol"},
    {text: "Cool Picture!"}
  ]
}
