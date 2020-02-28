# Luuna's test

This is a REST Api for the Luuna's test. For this test I used Nestjs and MySql.

# Running the app

First of all you will need the **.env** file, that contains an api key in order to send notification emails.
Once you have the .env file, you have to clone this repository, then open a terminal, cd to the directory of the project, and paste the .env file right there, then just type the command

    npm install

and all the dependencies will be installed.

You have to create a database in mysql as well, and change the database name, the username and password at the **ormconfig.json** file

Finally, to run the app, you need to type the next command

    npm run start

## Entities

There are two entities, users and products.

### Users

- id (uuid)
- created (Date)
- email _(unique)_(string)
- firstname (string)
- lastname (string)
- password (string)
- active (boolean)

### Products

- id (uuid)
- created (Date)
- name (string)
- price (number)
- brand (string)
- stock (number)
- code _(unique)_(char 6)
- active (boolean)

## Endpoints

Once the app is running, you can start to make requests, the endpoints I used:

### Users

- **/auth/register** | POST |Receive email, firstname, lastname and password | Return the new user
- **/auth/login** | POST | Receive email and password | Return a jwt
- **/auth/whoami** | GET | This endpoint needs an authentication at the header of the request (jwt) | Return the user
- **/users** | GET |Return all the users
- **/users/:id** | GET |Return the user requested by the id
- **/users/** | PUT | Receive email, firstname, lastname or password | Return the modified user | It needs JWT
- **/users/** | DELETE | Return a message if the user has been deleted | It needs JWT

### Products

- **/products** | GET | Return all the products
- **/products/:code** | GET | Return the selected product by code
- **/products** | POST | Receive name, price, brand, stock and code | Return the new product | It needs JWT
- **/products/:code** | PUT | Receive name, price, brand, stock or code | Return the modified product | It needs JWT, only the user that created the product can change it
- **/products/:code** | DELETE | Receive name, price, brand, stock or code | Return a message if the product has been deleted | It needs JWT, only the user that created the product can erase it
