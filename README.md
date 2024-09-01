# Car Wash Booking System

## Live URL

1. Live Deployment Link (Server): assignment-3-plum-five.vercel.app
2. GitHub Repository : https://github.com/muntasirmoin/assignment-3-level2-
3. Project Overview Video : https://drive.google.com/file/d/133oM2_A5XCttBhXD5bUhiw2G5iLWNai1/view?usp=sharing

## User Login

- email: sakif@gmail.com
- password: admin

## Admin Login

- email: muntasir@gmail.com
- password: admin

## Features:

1. User Registration(signUp):

- Route: /api/auth/signup (POST)

2. User login:

- Route: /api/auth/login(POST)

3. Create car wash services:

- Route: /api/services(POST)

4. Get Single Service:

- Route: /api/services/:id(GET)

5. Get All Services:

- Route: /api/services(GET)

6. Update services:

- Route: /api/services/:id(PUT)

7. Delete A Service:

- Route: /api/services/:id(DELETE) [SOFT DELETE ]

8. Create Slots:

- Route: /api/services/slots(POST)

9. Get available slot:

- Route: /api/slots/availability(GET)

10. Book a service:

- Route: /api/bookings(POST)

11. Get all booking:

- Route: /api/bookings(GET)

12. Get Users Booking:

- Route: /api/my-bookings(GET)

## How to set up and use the application locally.

### - Clone the github repository

### - Install dependency

- bcrypt
- cookie-parser
- cors
- dotenv
- express
- http-status
- jsonwebtoken
- mongodb
- mongoose
- ts-node-dev
- validator
- zod

### - Install devDependencies (if required)

### SetUp database / Live Deployment Link (Server).

- You can use https://www.postman.com/ to run server.

### - Start server with command

1.  npm run start:dev
2.  Check package.json--> "scripts" for more required command

### - server's root path: http://localhost:5000/
