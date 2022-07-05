## CREATE USER :

POST : http://127.0.0.1:3000/api/v1/users

BODY :

{"name" : "haythem","age" : 23,"country" : "tunisia","gender" : "male"}

## GET USERS :

GET : http://127.0.0.1:3000/api/v1/users

## GET USER :

GET : http://127.0.0.1:3000/api/v1/users/:id

example : http://127.0.0.1:3000/api/v1/users/62c46a29b2ee57a3498854d95

## UPDATE USER :

PATCH : http://127.0.0.1:3000/api/v1/users/:id

body : {"name" : "haythem dridi"}

example : http://127.0.0.1:3000/api/v1/users/62c46a29b2ee57a3498854d9

body : {"name" : "haythem dridi"}

## DELETE USER :

DELETE : http://127.0.0.1:3000/api/v1/users/:id

example : http://127.0.0.1:3000/api/v1/users/62c46a29b2ee57a3498854d9
