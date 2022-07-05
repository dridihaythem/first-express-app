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

## SORT USERS :

GET : http://127.0.0.1:3000/api/v1/users?sort=field1,fields2...

example : http://127.0.0.1:3000/api/v1/users?sort=age

# PAGINATION

GET : http://127.0.0.1:3000/api/v1/users?page=x&limit=x

example : http://127.0.0.1:3000/api/v1/users?page=1&limit=10

## PROJECTION

GET : http://127.0.0.1:3000/api/v1/users?fields=fields1,fields2...

example : http://127.0.0.1:3000/api/v1/users?fields=name,age

## FILTER

example : http://127.0.0.1:3000/api/v1/users?age=18

example : 127.0.0.1:3000/api/v1/users?age[gte]=18

example : 127.0.0.1:3000/api/v1/users?age[lte]=18
