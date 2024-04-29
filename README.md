MyFlix Movie App :

Welcome to MyFlix, an exciting web application that allows users to explore a diverse collection of movies, manage their favorite films, and update their user profiles effortlessly.

Overview :

MyFlix is a comprehensive full-stack application crafted with React, Node.js, Express, and MongoDB. It empowers users with features like secure authentication, profile management, and seamless browsing and interaction with a rich catalog of movies.

Features :

User Authentication: Secure sign up, login, and logout functionalities.
User Profile: Easy viewing and updating of user profile details such as username, password, email, and date of birth.
Favorite Movies: Users can add or remove movies from their list of favorites.
Movie Catalog: Browse through a vast collection of movies, explore detailed movie information, and search based on genre and director.

Technologies Used :

Frontend:

-React
-React Router
-Bootstrap

Backend:

-Node.js
-Express
-MongoDB

Authentication:

-JWT (JSON Web Tokens)

Database:

-MongoDB Atlas

Setup Instructions :
1.Clone the repository:

git clone https://github.com/alinatelychko/myflix-client.git
cd myflix-app

Install dependencies:

npm install

Start the development server:

npm start

Open the app in your browser: http://localhost:1234

API Endpoints :
User Endpoints:

-GET /users: Get a list of all users (requires authentication)
-GET /users/:Username: Get user information by username (requires authentication)
-PUT /users/:Username: Update user information (requires authentication)
-DELETE /users/:Username: Delete a user account (requires authentication)

Movie Endpoints:

-GET /movies: Get a list of all movies (requires authentication)
-GET /movies/:Title: Get movie details by title (requires authentication)
-GET /movies/genres/:genreName: Get movies by genre (requires authentication)
-GET /movies/directors/:directorName: Get movies by director (requires authentication)

Favorite Movies Endpoints:

-POST /users/:Username/movies/:MovieID: Add a movie to a user's list of favorites (requires authentication)
-DELETE /users/:Username/movies/:MovieID: Remove a movie from a user's list of favorites (requires authentication)

Documentation :
The JSDoc documentation for this project is available in the docs folder. You can view it by opening the index.html file in your browser.

Contributing :
If you would like to contribute to the project, follow these steps:

1.Fork the repository.
2.Create a new branch: git checkout -b feature/your-feature.
3.Make your changes and commit them: git commit -m 'Add new feature'.
4.Push to the branch: git push origin feature/your-feature.
5.Submit a pull request.