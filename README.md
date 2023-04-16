# About
The project is an API built using Node.js, Express, and MongoDB. It allows users to create an account, login, update their password, and request a new password if they forget it. Users can access all tours, filter and sort them, view tours, and their reviews. They can also create new reviews, and access top cheap tours and monthly tours plan. Admins can create new tours and view statistics.

For **sorting** and **filtering** tours, the API allows users to **project** and **select which fields they want to return**. Users can **filter** tours using gte,lte operations in MongoDB, and **sort** tours with multiple columns in **ascending** or **descending** ways for each column.


this was my first express application 😁


# API Documentation :

https://documenter.getpostman.com/view/5594301/UzJQoZS7


# What i Learned ?

- How Node really works behind the scenes: event loop, blocking vs non-blocking code, streams, modules, etc.

- CRUD operations with MongoDB and Mongoose

- Build a fast and feature-rich RESTful API (includes filters, sorts, pagination,etc ...)

- Advanced authentication and authorization (including password reset)

- Security: encryption, sanitization, rate limiting, etc.

- Deep dive into mongoose (Embedding , referencing , virtual populate, etc... )

- Error handling with Express

# Import Data

```
node import-dev-data --import
```

📌 please turn off encrypt password middleware in userModel before import users data , (passwords are already encrypted)

# Dependencies

- [express](https://www.npmjs.com/package/express) : Fast, unopinionated, minimalist web framework for node.

- [dotenv](https://www.npmjs.com/package/dotenv) : loads environment variables from a .env file into process.env

- [mongoose](https://www.npmjs.com/package/mongoose) : Object modeling tool for MongoDB

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) : For authentication

- [bcrypt](https://www.npmjs.com/package/bcrypt) : A library to hash passwords.

- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) : Basic IP rate-limiting middleware for Express

- [nodemailer](https://www.npmjs.com/package/nodemailer) : For sending e-mails

- [slugify](https://www.npmjs.com/package/slugify) : To Slugify tour names

- [validator](https://www.npmjs.com/package/validator) : A library of string validators and sanitizers.

- [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) : prevent MongoDB operator injection

- [helmet](https://www.npmjs.com/package/helmet) : secure Express apps with various HTTP headers

- [hpp](https://www.npmjs.com/package/hpp) : Express middleware to protect against HTTP Parameter Pollution attacks

- [xss-clean](https://www.npmjs.com/package/xss-clean) : Middleware to sanitize user input

- [morgan](https://www.npmjs.com/package/morgan) : HTTP request logger middleware for node.js
