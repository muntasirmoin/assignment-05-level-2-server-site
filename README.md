<div align="center">
  <h1>Wheels Wash</h1>
</div>

## Live URL

1. `[text](URL)Live Deployment Link (Client):`
2. Live Deployment Link (Server):
3. GitHub Repository Client :
4. GitHub Repository Server :
5. Project Overview Video :

## User Login

- email: user@gmail.com
- password: user

## Admin Login

- email: admin@gmail.com
- password: admin

## Introduction

Welcome to Wheels Wash! We are your trusted partner for comprehensive vehicle service and wash solutions. At Wheels Wash, we understand the importance of maintaining your vehicle's cleanliness and performance. Our goal is to provide top-quality services that keep your vehicle in pristine condition.

Our team of experienced professionals is dedicated to delivering exceptional service. Whether you're looking for a quick wash or a complete service package, we offer a range of options to meet your needs. We use the latest technology and eco-friendly products to ensure your vehicle gets the care it deserves.

At Wheels Wash, we pride ourselves on our commitment to customer satisfaction. We go the extra mile to make sure our customers leave with a smile, knowing their vehicle has been expertly serviced and cleaned.

## Project Description

Our mission at Wheels Wash is to provide reliable and high-quality vehicle service and wash solutions that enhance the longevity and appearance of your vehicle. We are dedicated to delivering services that exceed customer expectations, making us the preferred choice for vehicle owners.

We envision Wheels Wash as a leader in the vehicle service and wash industry, recognized for our innovation, customer-centric approach, and commitment to excellence. Our goal is to set the standard for quality in vehicle care, helping our customers maintain their vehicles in top condition.

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
