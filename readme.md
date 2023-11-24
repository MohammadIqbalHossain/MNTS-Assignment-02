# How to run the project locally.

Step-01:

open a teminal, run this command

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

You'll find a script in `package.json` file that runs the project while development phase before compiling the files in JavaScript. Using ts-node-dev package to run the project in development phase.

```js
npm run star:dev
```

You'll find another script to compile your codes.

```js
npm run build
```

Here I've create some API for CRUD operations.

when you're runing your code locally you can acces these APIs

`http://localhost:4000/api/users` for creating an user.

You data should stricly follow this model except orders array of objects, it's optional.

```json
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

`http://localhost:4000/api/users` to retreive all user data. a user document only contains `username, fullName, age, email, address`

okay, Now get added user from the database.

`http://localhost:4000/api/users/20000` You'll get all data this the specifed `userId` `20000`,

You should get this document:

```json
{
  "success": true,
  "message": "User fetched successfully!",
  "data": {
    "_id": "6561090b3426a618d4cdd0d0",
    "userId": 20000,
    "userName": "Mark Rafello",
    "fullName": {
      "firstName": "Mark",
      "lastName": "Rafello",
      "_id": "65610b073426a618d4cdd0dc"
    },
    "age": 25,
    "email": "rafello@xample.com",
    "isActive": true,
    "hobbies": ["Writing", "Coding", "Gosiping", "Cricket"],
    "address": {
      "street": "Elephatn st 203",
      "city": "Texas",
      "country": "USA",
      "_id": "65610b073426a618d4cdd0dd"
    },
    "__v": 0
  }
}
```

I've made a mistake while adding the document, Now, I've to update the document.

To update you have to give the updated data in the body of API.

let's assume this is the updated data. I've changed password and email,

`http://localhost:4000/api/users/20000` to udate.

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
