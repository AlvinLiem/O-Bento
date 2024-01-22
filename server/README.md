[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13042958&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

Link Deployment: https://p2-gc1-restaurant.avprojects.online/

> Tuliskan API Docs kamu di sini

## RESTful endpoints

### POST /add-user

#### Request Body

```json
{
    "email": <String>,
    "password": <String>,
    "phoneNumber": <String>,
    "address": <String>,
    "username": <String>
}
```

#### Response (201)

```json
{
  "id": 3,
  "username": "test Staff 3"
}
```

#### Response (400 - Bad Request - Password length < 5 )

```json
{
  "message": "Minimum Password length is 5 characters"
}
```

#### Response (400 - Bad Request - Password null or empty)

```json
{
  "message": "Password is required"
}
```

#### Response (400 - Bad Request - Email is already registered)

```json
{
  "message": "Email is already registered"
}
```

#### Response (400 - Bad Request - Email is not in email format)

```json
{
  "message": "Must use Email format"
}
```

#### Response (400 - Bad Request - Email is null or empty)

```json
{
  "message": "Email is required"
}
```

### POST /login

#### Request Body

```json
{
    "email": <String>,
    "password": <String>,
}
```

#### OR

```json
{
    "username": <String>,
    "password": <String>
}
```

#### Response (200)

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAxMTA3OTQ1fQ.oQDKqrF8aU0T_Gj5EeiCLRUfivD3Pomg1AynKP7wdPI"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Username or Email is Required"
}
```

#### OR

#### Response (400 - Bad Request)

```json
{
  "message": "Password is Required"
}
```

### GET /pub/cuisines

#### Response (200)

```json
[
  {
    "id": 1,
    "name": "Easy 1",
    "description": "Rice, 1 Money Bag, 3 Tamatori Roll, Pickle, Hot/Cold Ocha",
    "price": 22000,
    "imgUrl": "https://i.imgur.com/T3aGgJc.png",
    "categoryId": 1,
    "authorId": 2,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  {
    "id": 3,
    "name": "Test Menu 1",
    "description": "Ini adalah deskripsi test untuk menu 1",
    "price": 21000,
    "imgUrl": "https://i.imgur.com/myQNe9m.png",
    "categoryId": 3,
    "authorId": 1,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  ...
]
```

#### Response (200 - Filtered by Category 3)

```json
[
  {
    "id": 3,
    "name": "Test Menu 1",
    "description": "Ini adalah deskripsi test untuk menu 1",
    "price": 21000,
    "imgUrl": "https://i.imgur.com/myQNe9m.png",
    "categoryId": 3,
    "authorId": 1,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  {
    "id": 4,
    "name": "Test Menu 2",
    "description": "Ini adalah deskripsi test untuk menu 2",
    "price": 22000,
    "imgUrl": "https://i.imgur.com/myQNe9m.png",
    "categoryId": 3,
    "authorId": 1,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  ...
]
```

#### Response (200 - Searched by name "1")

```json
[
  {
    "id": 1,
    "name": "Easy 1",
    "description": "Rice, 1 Money Bag, 3 Tamatori Roll, Pickle, Hot/Cold Ocha",
    "price": 22000,
    "imgUrl": "https://i.imgur.com/T3aGgJc.png",
    "categoryId": 1,
    "authorId": 2,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  {
    "id": 3,
    "name": "Test Menu 1",
    "description": "Ini adalah deskripsi test untuk menu 1",
    "price": 21000,
    "imgUrl": "https://i.imgur.com/myQNe9m.png",
    "categoryId": 3,
    "authorId": 1,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  ...
]
```

#### Response (200 - Sort by createdAt asc)

```json
[
  {
    "id": 3,
    "name": "Test Menu 1",
    "description": "Ini adalah deskripsi test untuk menu 1",
    "price": 21000,
    "imgUrl": "https://i.imgur.com/myQNe9m.png",
    "categoryId": 3,
    "authorId": 1,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  {
    "id": 4,
    "name": "Test Menu 2",
    "description": "Ini adalah deskripsi test untuk menu 2",
    "price": 22000,
    "imgUrl": "https://i.imgur.com/myQNe9m.png",
    "categoryId": 3,
    "authorId": 1,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z"
  },
  ...
]
```

### GET /pub/cuisines/:id

#### Request Params

```json
{ "id": 2 }
```

#### Response (200)

```json
{
  "id": 2,
  "name": "Easy 2",
  "description": "Rice, 2 Tori Ball, 2 Tamatori Roll, Pickle",
  "price": 18000,
  "imgUrl": "https://i.imgur.com/myQNe9m.png",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2023-11-29T14:31:34.213Z",
  "updatedAt": "2023-11-29T14:31:34.213Z"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

### POST /cuisines

#### Request Body

```json
{
    "name": <String>,
    "description": <String>,
    "price": <Integer>,
    "imgUrl": <String>,
    "categoryId": <Integer>
}
```

#### Response (201)

```json
{
  "id": 4,
  "name": "Easy 3",
  "description": "Rice, 2 Tamatori Roll, 2 Ebi Roll, Pickle",
  "price": 18000,
  "imgUrl": "https://i.imgur.com/jbPclOU.png",
  "categoryId": 1,
  "authorId": 1,
  "updatedAt": "2023-11-27T18:36:38.132Z",
  "createdAt": "2023-11-27T18:36:38.132Z"
}
```

#### Resopnse (400 - Bad Request - Name is null or empty)

```json
{
  "message": "Name is required"
}
```

#### Resopnse (400 - Bad Request - Description is null or empty)

```json
{
  "message": "Description is required"
}
```

#### Resopnse (400 - Bad Request - Price is null or empty)

```json
{
  "message": "Price is required"
}
```

#### Resopnse (400 - Bad Request - Price is bellow 10000)

```json
{
  "message": "Price is minimum Rp 10.000"
}
```

#### Resopnse (400 - Bad Request - imgUrl is null or empty)

```json
{
  "message": "imgUrl is required"
}
```

#### Resopnse (400 - Bad Request - categoryId is null or empty)

```json
{
  "message": "categoryId is required"
}
```

### GET /cuisines

#### Response (200)

```json
[
  {
    "id": 1,
    "name": "Easy 1",
    "description": "Rice, 1 Money Bag, 3 Tamatori Roll, Pickle, Hot/Cold Ocha",
    "price": 22000,
    "imgUrl": "https://i.imgur.com/T3aGgJc.png",
    "categoryId": 1,
    "authorId": 2,
    "createdAt": "2023-11-29T14:31:34.213Z",
    "updatedAt": "2023-11-29T14:31:34.213Z",
    "User": {
      "id": 2,
      "username": "test Admin 2",
      "email": "testAdmin1@mail.com",
      "role": "Admin",
      "phoneNumber": "082222222222",
      "address": "Jl. Tidak Buntu No.2",
      "createdAt": "2023-11-29T14:31:34.199Z",
      "updatedAt": "2023-11-29T14:31:34.199Z"
    }
  },
  ...
]
```

### GET /cuisines/:id

#### Request Params

```json
{ "id": 1 }
```

#### Response (200)

```json
{
  "id": 1,
  "name": "Easy 1",
  "description": "Rice, 1 Money Bag, 3 Tamatori Roll, Pickle, Hot/Cold Ocha",
  "price": 22000,
  "imgUrl": "https://i.imgur.com/T3aGgJc.png",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2023-11-27T13:14:25.177Z",
  "updatedAt": "2023-11-27T13:14:25.177Z"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

### PATCH /cuisines/:id/image

#### Request Params

```json
{ "id": 1 }
```

#### Request File

```json
{
  "fieldname": "imageUrl",
  "originalname": "Pecel Lele.webp",
  "encoding": "7bit",
  "mimetype": "image/webp",
  "buffer": "<Buffer 52 49 46 46 20 83 03 00 57 45 42 50 56 50 38 20 14 83 03 00 50 b9 0a 9d 01 2a b0 04 84 03 3e 6d 2c 91 46 24 22 a1 a4 ad f7 dc 48 90 0d 89 66 6c 66 bc ... 230134 more bytes>",
  "size": 230184
}
```

#### Response (200)

```json
{
  "message": "Image test 1 success to update"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Image is required"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

### PUT /cuisines/:id

#### Request Params

```json
{ "id": 1 }
```

#### Request Body

```json
{
  "name": "Easy 3",
  "description": "Rice, 2 Tamatori Roll, 2 Ebi Roll, Pickle",
  "price": 18500,
  "imgUrl": "https://i.imgur.com/jbPclOU.png",
  "categoryId": 1
}
```

#### Response (200)

```json
{
  "id": 1,
  "name": "Easy 1",
  "description": "Rice, 1 Money Bag, 3 Tamatori Roll, Pickle, Hot/Cold Ocha",
  "price": 22000,
  "imgUrl": "https://i.imgur.com/T3aGgJc.png",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2023-11-27T13:14:25.177Z",
  "updatedAt": "2023-11-27T13:14:25.177Z"
}
```

#### Response (400 - Bad Request - Price bellow 10000)

```json
{
  "message": "Price is minimum Rp 10.000"
}
```

#### Response (400 - Bad Request - Name is empty)

```json
{
  "message": "Name is required"
}
```

#### Response (400 - Bad Request - Description is empty)

```json
{
  "message": "Description is required"
}
```

#### Response (400 - Bad Request - imgUrl is empty)

```json
{
  "message": "imgUrl is required"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

### DELETE /cuisines/:id

#### Request Params

```json
{ "id": 1 }
```

#### Response (200)

```json
{
  "id": 1,
  "name": "Easy 1",
  "description": "Rice, 1 Money Bag, 3 Tamatori Roll, Pickle, Hot/Cold Ocha",
  "price": 22000,
  "imgUrl": "https://i.imgur.com/T3aGgJc.png",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2023-11-27T13:14:25.177Z",
  "updatedAt": "2023-11-27T13:14:25.177Z"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

### POST /categories

#### Request Body

```json
{
  "name": <String>
}
```

#### Response (201)

```json
{
  "id": 3,
  "name": "Beverages",
  "updatedAt": "2023-11-27T15:43:20.982Z",
  "createdAt": "2023-11-27T15:43:20.982Z"
}
```

#### Response (400 - Bad Reques - Name is null or empty)

```json
{
  "message": "Name is required"
}
```

### GET /categories

#### Response (200)

```json
[
  {
    "id": 1,
    "name": "Set Menu",
    "createdAt": "2023-11-27T13:14:25.172Z",
    "updatedAt": "2023-11-27T13:14:25.172Z"
  },
  {
    "id": 2,
    "name": "Desserts",
    "createdAt": "2023-11-27T13:14:25.172Z",
    "updatedAt": "2023-11-27T13:14:25.172Z"
  },
  ...
]

```

### PUT/categories/:id

#### Request Params

```json
{ "id": 1 }
```

#### Request Body

```json
{"name": <String>}
```

#### Response (200)

```json
{
  "id": 3,
  "name": "Beverages",
  "createdAt": "2023-11-27T15:43:20.982Z",
  "updatedAt": "2023-11-27T15:43:20.982Z"
}
```

#### Response (400 - Bad Request)

```json
{
  "message": "Name is required"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

### DELETE /categories/:id

#### Request Params

```json
{ "id": 1 }
```

#### Response (200)

```json
{
  "id": 3,
  "name": "Beverages",
  "createdAt": "2023-11-27T15:43:20.982Z",
  "updatedAt": "2023-11-27T15:43:20.982Z"
}
```

#### Response (404 - Not Found)

```json
{
  "message": "Data Not Found"
}
```

### Global Error

#### Response (500 - Internal Server Error)

```json
{ "message": "Internal Server Error" }
```

#### Response (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (403 - Forbidden)

```json
{
  "message": "Forbidden Access"
}
```
