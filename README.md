Overview:

This project is a full-stack clone of Instagram, built using React.js for the frontend and Node.js/Express for the backend. It allows users to upload, like, and comment on photos, providing a real-time interactive experience. The app includes user authentication, secure login sessions, and efficient data management using MongoDB and Redux for state management. The application is deployed with scalable cloud storage on AWS S3.

Key Features
1. Frontend with React.js
User Interface: Built using React.js, the frontend offers an interactive, responsive UI similar to Instagram, featuring a feed of images, user profile pages, and an easy-to-use photo upload system.
State Management: Redux is used to handle global state and manage user data across different components, ensuring seamless interactions like likes, comments, and photo uploads.
Real-Time Updates: The frontend is designed to update in real-time, showing new photos, likes, and comments without requiring a page refresh.

2. Backend with Node.js & Express
API Development: The backend is built with Node.js and Express, offering RESTful APIs to handle user authentication, photo uploads, and interactions like liking and commenting on posts.
Real-Time Interaction: The server communicates with the frontend in real time, ensuring that users’ actions (e.g., likes, comments) are reflected instantly across all active sessions.
JWT Authentication: JSON Web Tokens (JWT) are used to securely authenticate users and manage sessions, ensuring that only authorized users can upload photos or comment on posts.

3. Database with MongoDB and Mongoose
MongoDB Database: MongoDB is used to store user data and interactions, offering flexibility in handling large volumes of unstructured data.
Mongoose Schema: Mongoose is used to define the schema for users, posts, likes, and comments, allowing for efficient data querying and management. The schema includes:
Users: stores account information like username, password, and profile details.
Posts: stores image URLs, captions, and metadata for each photo uploaded.
Likes & Comments: stores user interactions with posts.

4. Cloud Storage with AWS S3
Scalable Storage: AWS S3 is used to store images uploaded by users, allowing for scalable and cost-effective cloud storage. Each image is uploaded and retrieved from S3 via a secure URL.
Efficient Uploads: The application ensures that image uploads are fast and efficient, using AWS S3 to handle large files and reduce the load on the backend server.

5. JWT Authentication for Secure User Logins
User Authentication: JWT (JSON Web Tokens) is implemented for secure user authentication and session management. On successful login, the user receives a token that must be included in the header for accessing protected routes (e.g., uploading photos, posting comments).
Session Management: The JWT token ensures secure, stateless sessions, improving security while maintaining a seamless user experience.

Features Walkthrough
Home Feed: Users can view posts from other users, like photos, and leave comments in real time.
User Profile: Each user has a profile page where they can view their posts and interact with other users.
Photo Uploads: Users can upload new photos, which are stored in AWS S3 and displayed on the home feed.
Likes & Comments: Users can like and comment on posts, with updates reflecting instantly for all active users.
Authentication: Users can sign up, log in, and stay authenticated with JWT, ensuring secure access to all features.

Setup and Installation
Requirements
Node.js (v16.x or above)
npm (Node Package Manager)
MongoDB (Local or Cloud instance)
