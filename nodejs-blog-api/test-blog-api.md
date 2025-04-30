
# 🧪 Blog API - Test & Try Instructions (using Insomnia)

This guide helps you test the Blog API using [Insomnia](https://insomnia.rest/) or a similar REST client.

## 🌐 Base URL
```
http://localhost:5000
```

---

## 📌 1. Register a New User

**POST** `/api/auth/register`

### Request Body (JSON)
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

### Expected Response
```json
{
  "message": "User registered"
}
```

---

## 🔐 2. Login to Get Token

**POST** `/api/auth/login`

### Request Body (JSON)
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

### Expected Response
```json
{
  "token": "your_jwt_token_here"
}
```

Copy this token for the next steps (as `Authorization: Bearer <token>`).

---

## 📝 3. Create a Blog Post

**POST** `/api/blogs`

### Headers
```
Authorization: Bearer your_jwt_token_here
```

### Request Body (JSON)
```json
{
  "title": "My First Blog Post",
  "content": "This is my awesome blog content."
}
```

---

## 📖 4. Get All Blog Posts

**GET** `/api/blogs`

### Response
Returns an array of all blogs with author info.

---

## 🔎 5. Get a Single Blog Post

**GET** `/api/blogs/:id`

Replace `:id` with an actual blog `_id`.

---

## 🛠️ 6. Update a Blog Post

**PUT** `/api/blogs/:id`

### Headers
```
Authorization: Bearer your_jwt_token_here
```

### Request Body (JSON)
```json
{
  "title": "Updated Title",
  "content": "Updated blog content."
}
```

---

## ❌ 7. Delete a Blog Post

**DELETE** `/api/blogs/:id`

### Headers
```
Authorization: Bearer your_jwt_token_here
```

### Response
```json
{
  "message": "Deleted"
}
```

---

## ✅ Notes

- Use a fresh JWT token when expired.
- Only the blog **author** can update or delete their post.
- MongoDB must be running locally or via Atlas.

---

Happy Testing! 🚀
