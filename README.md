# **📌 Todo List API**
A **RESTful API** built with **Node.js, Express.js, and MongoDB** that allows users to **register, log in, and manage their to-do lists** securely.

## **🚀 Features**
- **User Authentication**: Register and login with JWT-based authentication.  
- **CRUD Operations**: Create, Read, Update, and Delete to-do items.  
- **Filtering**: Fetch to-do items based on their status (true for completed/false for pending).  
- **Security**: Passwords are securely hashed, and users can access only their own data.  

---

## **⚙️ Tech Stack**
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: JWT (jsonwebtoken) & bcrypt for password hashing  
- **Validation**: Zod  
- **Error Handling**: Centralized middleware  

---

## **📂 Project Structure**
```
todo-api/
│── src/
│   ├── controllers/        # Request handling logic  
│   ├── models/             # Mongoose schemas  
│   ├── routes/             # API route handlers  
│   ├── middlewares/        # Authentication & validation  
│   ├── utils/              # Utility functions  
│   ├── config/             # Database & environment config  
│   ├── app.js              # Express app setup  
│   ├── server.js           # Main entry point  
│── .env                    # Environment variables  
│── package.json  
│── README.md  
```

---

## **🛠️ Installation & Setup**
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/melaku3/todo-list-api.git
cd todo-api
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Set up environment variables**
Create a `.env` file in the root directory and configure:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **4️⃣ Start the server**
```sh
npm start
```
The API will run at **http://localhost:3000**.

---

## **📌 API Documentation**
### **🔐 User Authentication**
#### **1️⃣ Register a New User**
```http
POST /api/auth/register
```
**Request Body (JSON):**
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```
**Response:**
```json
{
    "message": "User created successfully",
    "user": {
        "_id": "651234abcd",
        "name": "John Doe",
        "email": "johndoe@example.com"
    }
}
```

#### **2️⃣ User Login**
```http
POST /api/auth/login
```
**Request Body (JSON):**
```json
{
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```
**Response:**
```json
{
    "message": "User logged in successfully"
}
```

---

### **📝 Todo List Management**
#### **3️⃣ Create a New To-Do**
```http
POST /api/todos
```
**Headers:**
```
Authorization: Bearer your_jwt_token
```
**Request Body (JSON):**
```json
{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": true
}
```
**Response:**
```json
{
    "message": "Todo created successfully"
}
```

#### **4️⃣ Get All To-Dos**
```http
GET /api/todos
```
**Headers:**
```
Authorization: Bearer your_jwt_token
```
**Response:**
```json
[
    {
        "_id": "651234abcd",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": false,
        "userId": "651234abcd"
    }
]
```

#### **5️⃣ Update a To-Do**
```http
PATCH /api/todos/:id
```
**Headers:**
```
Authorization: Bearer your_jwt_token
```
**Request Body (JSON):**
```json
{
    "status": true
}
```
**Response:**
```json
{
    "message": "Todo updated successfully"
}
```

#### **6️⃣ Delete a To-Do**
```http
DELETE /api/todos/:id
```
**Headers:**
```
Authorization: Bearer your_jwt_token
```
**Response:**
```json
{
    "message": "Todo deleted successfully"
}
```

#### **7️⃣ Filter To-Dos by Status**
```http
GET /api/todos/status/:status
```
**Headers:**
```
Authorization: Bearer your_jwt_token
```
**Response:**
```json
[
    {
        "_id": "651234abcd",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": true,
        "userId": "651234abcd"
    }
]
```

---

## **🔒 Authentication & Security**
- **JWT Authentication:** Users must include a valid JWT token in the `Authorization` header to access protected routes. The token is stored as an HTTP-only cookie, so it is automatically included in requests without manual intervention.
- **Password Hashing:** Uses **bcrypt** to securely hash passwords.  
- **Access Control:** Users can only manage **their own to-dos**.  

---

<!-- Project URL: https://roadmap.sh/projects/todo-list-api -->


## **🐛 Error Handling**
| Error Type                | Response Code | Example Message |
|---------------------------|--------------|----------------|
| Invalid Credentials       | 401          | "Invalid email or password" |
| Unauthorized Access       | 403          | "Access denied" |
| Resource Not Found        | 404          | "To-do not found" |
| Validation Error          | 400          | "Field is required" |
| Server Error              | 500          | "Internal server error" |

---

## **📞 Contact**
For any issues, feel free to reach out! 🚀  
**Email**: [emelaku63@gmail.com](mailto:emelaku63@gmail.com)
