# Blog Viewer Project

Welcome to the Blog Viewer Project! This README will guide you through the structure, setup, and usage of the project. The project consists of two main parts: the client side, built with Next.js, and the server side, built with Node.js, Express, MongoDB, and GraphQL.

### Client (Next.js)

The client folder contains the front-end code, which is built with Next.js. The structure includes:

- `src/`: Contains all the pages of the application.
- `components/`: Reusable React components used across different pages.
- `next.config.js`: Next.js configuration file.
- `tailwind.config.js`: Tailwind configuration file.
- `package.json`: Dependencies and scripts for the client side.

### Server (Node.js, Express, MongoDB, GraphQL)

The server folder contains the back-end code, which is built with Node.js, Express, MongoDB, and GraphQL. The structure includes:

- `MongoDB/models/`: MongoDB models.
- `GraphQL/resolvers/`: GraphQL resolvers.
- `GraphQL/schemas/`: GraphQL schemas.
- `server.js`: Entry point for the server application.
- `package.json`: Dependencies and scripts for the server side.

## Screenshots
![Home](/screenshots/home.png)
![Login](/screenshots/login.png)

## Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/blog-viewer.git
   cd blog-viewer
   ```

2. **Install dependencies for both client and server:**

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` folder with the following content:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=4000
```

### Running the Application

1. **Start the server:**

   ```bash
   cd server
   npm run dev
   ```

   The server will start on the port specified in the `.env` file (default is 4000).

2. **Start the client:**

   ```bash
   cd ./client
   npm run dev
   ```

   The client will start on `http://localhost:3000`.

## Usage

- Open your browser and navigate to `http://localhost:3000` to view the blog viewer.
- The client application will fetch data from the GraphQL API provided by the server.

## GraphQL API

The server exposes a GraphQL API with the following operations:

- **Query:**

  - `blogs`: Fetch a list of blogs.
  - `blog(id: ID!)`: Fetch a single blog by its ID.
  - `login(email: String!, password: String!)`: Login user and return the user's token.
  - `UserBlogs(userId: ID!)`: Fetch a logged in user's blogs by its ID.

- **Mutation:**
  - `createBlog(title: String!, content: String!)`: Create a new blog.
  - `updateBlog(id: ID!, title: String, content: String)`: Update an existing blog.
  - `deleteBlog(id: ID!)`: Delete a blog by its ID.
  - `createUser(email: String!, password: String!)`: Create a new user.

---

Thank you for checking out the Blog Viewer Project! If you have any questions or need further assistance, feel free to reach out.
