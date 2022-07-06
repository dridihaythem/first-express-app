## ABOUT

in part 1, i learned how to create a simple API

in part 2, i learned how to implement sorting , pagination , projecting and filtering

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

## FILTERING

example : http://127.0.0.1:3000/api/v1/users?age=18

example : http://127.0.0.1:3000/api/v1/users?age[gte]=18

example : http://127.0.0.1:3000/api/v1/users?age[lte]=18

## STATISTICS BY AGE

http://127.0.0.1:3000/api/v1/users/stats/age

{"status":"success","stats":[{"age":15,"users":5},{"age":16,"users":8},{"age":17,"users":10}....}

## STATISTICS BY GENDER

http://127.0.0.1:3000/api/v1/users/stats/gender

{"status":"success","stats":[{"gender":"MALE","users":50,"avgAge":49.38,"minAge":2,"maxAge":100},{"gender":"FEMALE","users":45,"avgAge":50.644444444444446,"minAge":1,"maxAge":95}]}

## STATISTICS BY COUNTRY

http://127.0.0.1:3000/api/v1/users/stats/country

{"status":"success","stats":[{"country":"BRAZIL","users":4},{"country":"ARGENTINA","users":1},{"country":"GERMANY","users":1} ...]}
