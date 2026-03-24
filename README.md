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
* A user can delete the book and the all the notes inside that book will be deleted

## Notes
* A book can contain multiple notes
* A note must have a title
* A note can have an empty body
* Notes are auto-saved after 3 seconds of inactivity
* Editing happens live - no save button needed

## Deleting Notes
TwoNotes uses a clean, intuitive delete flow:
* To delete an existing note, simply clear the title
* A 3 secound countdown begins
* if the title stay empty, the note is deleted
* If the user types again before the countdown ends, deletion is canceled
* If the title is different from the original title after 3 secounds of inactivity title will be updated

# Special features - Event Delegation
this project uses event delegation heavily - especially in `homepageScript.js`
* Only one event listener is needed for all book buttons
* Works even if you add 1 book or 10,000 books
* No performance issues
* Cleaner code
This was my first time using event delegation properly, and it simplified the entire frontend.


# User Routes (`/users`)

## Public Routes
<table>
	<tr>
		<th> Method </th>
		<th> Endpoints </th>
		<th> Description </th>
	</tr>
	<tr>
		<td> GET </td>
		<td> /users/signup </td>
		<td> Renders signup page </td>
	</tr>
	<tr>
		<td> POST </td>
		<td> /users/signup </td>
		<td> Create a new user </td>
	</tr>
	<tr>
		<td> GET </td>
		<td> /users/login </td>
		<td> Render login page </td>
	</tr>
	<tr>
		<td> POST </td>
		<td> /users/login </td>
		<td> Authenticate user and redirect to homepage </td>
	</tr>	
</table>

## Protected Routes
<table>
	<tr>
		<th> Method </th>
		<th> Endpoints </th>
		<th> Description </th>
	</tr>
	<tr>
		<td> GET </td>
		<td> /users/homepage </td>
		<td> Render logged-in user's homepage </td>
	</tr>
	<tr>
		<td> GET </td>
		<td> /users/:id </td>
		<td> Get a single user by ID (Work in progress) </td>
	</tr>
	<tr>
		<td> PUT </td>
		<td> /users/:id </td>
		<td> Update user by ID (Work in progress) </td>
	</tr>
	<tr>
		<td> Delete </td>
		<td> /users/ </td>
		<td> Delete the currently logged-in user (Work in progress) </td>
	</tr>	
</table>

# Book Routes(`/books`)

<table>
	<tr>
		<th> Method </th>
		<th> Endpoints </th>
		<th> Description </th>
	</tr>
	<tr>
		<td> GET </td>
		<td> /books/ </td>
		<td> Get all books </td>
	</tr>
	<tr>
		<td> GET </td>
		<td> /books/:id </td>
		<td> Get a single book by ID </td>
	</tr>
	<tr>
		<td> POST </td>
		<td> /books/ </td>
		<td> Create a new book </td>
	</tr>
	<tr>
		<td> PUT </td>
		<td> /books/:id </td>
		<td> Update a book by ID </td>
	</tr>
	<tr>
		<td> DELETE </td>
		<td> /books/:id </td>
		<td> Delete a book and all notes inside it </td>
	</tr>		
</table>

# Note Routes (`/note`)

## Notes by Book

<table>
	<tr>
		<th> Method </th>
		<th> Endpoints </th>
		<th> Description </th>
	</tr>
	<tr>
		<td> GET </td>
		<td> /notes/book/:bookid </td>
		<td> Get all notes inside a specific book </td>
	</tr>
	
</table>

## Single Note

<table>
	<tr>
		<th> Method </th>
		<th> Endpoints </th>
		<th> Description </th>
	</tr>
	<tr>
		<td> GET </td>
		<td> /notes/note/:id </td>
		<td> Get a single note by ID </td>
	</tr>
	<tr>
		<td> POST </td>
		<td> /notes/note </td>
		<td> Create a new note </td>
	</tr>
	<tr>
		<td> PUT </td>
		<td> /notes/note/:id </td>
		<td> Update a note by ID </td>
	</tr>
	<tr>
		<td> DELETE </td>
		<td> /notes/note/:id </td>
		<td> Delete a note by ID </td>
	</tr>		
</table>

