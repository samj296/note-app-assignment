#  TwoNote - A Simple, Fast, Personal Note -Taking App

TwoNote started as a much bigger idea.
Originally, I planned to build a full library system with staff, admin roles, and complex permissions, But halfway through, I realized something important:
**This app doesn't need staff or admin.**

Every user can simply create an account and manage their own books and notes. That shift made the app cleaner, faster, and much more focused on what matters.

# How to run this App
1) Clone or download the repository
```shell
	cd <folder>  # navigate to the folder where you want the app
	git clone https://github.com/samj296/note-app-assignment.git
```

2) Install dependencies

```shell
	npm install
```

3) Create a `.env` file <br>
inside the project root: <br>
for WSL/bash
```shell
touch .env
```
for PowerShell/command
```shell
New-Item .env
```
inside  `.env`


`MONGODB_URI=mongodb://localhost:27017/note` <br>
`PORT=3000`<br>
`Session_Secret=""`

replace the MONGODB_URI with your mongodb connection string

4) Start the server

```shell
npm start
```

5) Open the browser and enter the address


`http://localhost:3000/users/login`

* from here
	* Sign up as the first user
	* Log in
	* Start creating books and notes

# App Behavior ( How TwoNote Works)
TwoNote is intentionally simple and focused. Here's how the core features behave:

## Books
* A user can create multiple books
* Each book contain Note/Notes
* A user can have unlimited books
* Deleting a book is work in progress

## Notes
* A book can contain multiple notes
* A note must have a title
* A note can have an empty body
* Notes are auto-saved after 5 seconds of inactivity
* Editing happens live - no save button needed

## Deleting Notes
TwoNotes uses a clean, intuitive delete flow:
* To delete an existing note, simply clear the title
* A 5 secound countdown begins
* if the title stay empty, the note is deleted
* If the user types again before the countdown ends, deletion is canceled
* If the title is different from the original title after 5 secounds of inactivity title will be updated

# Special features - Event Delegation
this project uses event delegation heavily - especially in `homepageScript.js`
* Only one event listener is needed for all book buttons
* Works even if you add 1 book or 10,000 books
* No performance issues
* Cleaner code
This was my first time using event delegation properly, and it simplified the entire frontend.


# API End point:

## Users:
1) *Get* /users -list of all user (deprecated - listing all users is not needed)
2) *Get* /users/:id -get single user by ID
3) *Put* /users/:id -edit user
4) *Post* /users/signup - Create user
5) *Delete* /users/:id - work in progress




## Book

1) *Get* /books/ -list all books
2) *Get* /books/:id -get book by id
3) *Post* /books/ -createbook
4) *Put* /books/:id -update book
5) *Delete* /books/:id -delete book

## Note:
1) *Get*  /notes -list of all the notes
	```json
	{
		"notes":
		[
			{
				"id": 1,
				"title": "Shopping List",
				"body": ["Milk qty-2", "Yogurt qty -3"]
			},
			{
				"id": 2,
				"title": "to-do-list",
				"body": ["Call Shalom - (P)", "work on my assignment - (C)" ]
			}
		]
	}
	```
2) *Get* /note/:id get-note by id
	```json
		{
			"id": 1,
			"title": "Shopping List",
			"body": ["Milk qty-2", "Yogurt qty -3"]
		}
	```
3) *Put* /note/:id -edit note
4) *Post* /note -add note
5) *Delete* /note/:id -delete note





