# End point:

## Users:
1) *Get* /users -list of all user
2) *Get* /user/:id -get single user by ID
3) *Put* /user/:id -edit user
4) *Post* /user -add user
5) *Delete* /user/:id

## Book

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


**I realized that I don't need staff or admin for this app every user can create an account and can delete there own account**



