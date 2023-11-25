# How to run the project locally.

Open a teminal, run this command

```commad
cd youDirectory
```

Clone full code from the GitHub in your machine.

```command
npm clone https://github.com/MohammadIqbalHossain/MNTS-Assignment-02.git
```

Install all depdencies for the project.

```command
npm i
```

You'll find a script in `package.json` file that runs the project while in development phase before compiling the files in JavaScript. It's Using ts-node-dev package to run the project in development phase.

```js
npm run star:dev
```

You'll find another script to compile your codes.

```js
npm run build
```

Here I've create some API for CRUD operations.

when you're runing your code locally you can acces these APIs via

POST: `http://localhost:4000/api/users` for creating an user.

You data should stricly follow this model except orders array of objects, it's optional.

```json
//These are fake data.
{
  "userId": 20000,
  "userName": "Mark Rafello",
  "password": "markRafelloo@gmail.com",
  "fullName": {
    "firstName": "Tom",
    "lastName": "Hardy"
  },
  "age": 25,
  "email": "rafello@example.com",
  "isActive": true,
  "hobbies": ["Acting", "Reading"],
  "address": {
    "street": "456 Oak St",
    "city": "NYC",
    "country": "USA"
  }
}
```

GET: `http://localhost:4000/api/users` to retreive all user data. a user document only contains `username, fullName, age, email, address`

okay, Now retreive a specific user document by `userId` .

`http://localhost:4000/api/users/20000` You'll get all data for this specifed `userId`: `20000`,

You should get this document:

```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "userId": 20000,
    "userName": "Mark Rafello",
    "fullName": {
      "firstName": "Mark",
      "lastName": "Rafello",
      "_id": "65621718c3cb9a5486756ea3"
    },
    "age": 23,
    "email": "thehulkrafello@xample.com",
    "isActive": false,
    "hobbies": ["Writing", "Coding", "Acting", "Cooking"],
    "address": {
      "street": "Elpehant street Boston",
      "city": "NYC",
      "country": "USA",
      "_id": "65621718c3cb9a5486756ea4"
    },
    "__v": 0
  }
}
```

I've made a mistake while adding the document, Now, I've to update the document.

To update you have to give the updated data in the body of API.

let's assume this is the updated data. I've changed password and email,

PUT: `http://localhost:4000/api/users/20000` to udate.

```json
{
  "userId": 20000,
  "userName": "Mark Rafello",
  "password": "rafellomark123",
  "fullName": {
    "firstName": "Mark",
    "lastName": "Rafello"
  },
  "age": 25,
  "email": "rafellomark@xample.com",
  "isActive": true,
  "hobbies": ["Writing", "Coding", "Gosiping", "Cricket"],
  "address": {
    "street": "Elephatn st 203",
    "city": "Texas",
    "country": "USA"
  }
}
```

You can also delete the user from database.

DELETE: `http://localhost:4000/api/users/20000` To delete a user

You should get this sucess message:

```json
{
  "sucess": true,
  "message": "User deleted successfully!",
  "data": null
}
```

Adding orders to a user, If users orders array is in document it'll add a product`object`to it. If it's not in there it'll add the array along with the product.

PUT: `http://localhost:4000/api/users/20000/orders` To add order.

Orders API body should include this type of data.

```json
{
  "product": "Monitor",
  "price": 20000,
  "quantity": 1
}
```

Response would look like this:

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": null
}
```

When you've to get all orders from a single user.

GET: `http://localhost:4000/api/users/20000/orders` to get all orders for a user.

Response should look likte this:

```json
{
  "success": true,
  "message": "Orders fetched successfully!",
  "data": [
    {
      "orders": [
        {
          "product": "Laptop",
          "price": 10000,
          "quantity": 1,
          "_id": "65610d1c3426a618d4cdd0ea"
        },
        {
          "product": "IPhone",
          "price": 10000,
          "quantity": 1,
          "_id": "65610d2b3426a618d4cdd0ed"
        },
        {
          "product": "IPad",
          "price": 10000,
          "quantity": 1,
          "_id": "65611e3bb7552faa73bca4ad"
        },
        {
          "product": "Monitor",
          "price": 20000,
          "quantity": 1,
          "_id": "656126cd741203ef7b08ceb5"
        }
      ]
    }
  ]
}
```

When you've to get sum for a user total cost, means all orders total price

GET: `http://localhost:4000/api/users/20000/orders/total-price` To get sum of all orders price.

Response should look like this:

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": [
    {
      "totalPrice": 50000
    }
  ]
}
```

Thank you!
