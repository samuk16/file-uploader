<h1 align="center">File Uploader</h1>

# Description
This project is a file management system developed as part of The Odin Project curriculum. It demonstrates secure file handling, user authentication, and temporary file sharing capabilities. Users can manage their files and folders, while also having the ability to share them with non-registered users through expiring links. This implementation showcases modern web development practices, secure storage solutions, and user permission handling.

# Features
- Secure user authentication system
- Complete folder management (Create, Read, Update, Delete)
- File upload and management system
- Folder sharing functionality with customizable expiration dates:
  - 1 day
  - 2 days
  - 5 days
- Public access to shared folders (no authentication required)
- Secure file storage using Supabase
- Server-side validation for all operations
- Responsive user interface

# Key Functionalities
- User registration and authentication
- Secure login/logout functionality
- Folder operations:
  - Create new folders
  - Rename existing folders
  - Delete folders
  - Navigate folder structure
- File management:
  - Upload files to folders
  - Download files
- Sharing system:
  - Generate shareable links
  - Set link expiration dates
  - Access shared folders without authentication
- Form validation and error handling

# Technologies Used
- Express.js (Backend framework)
- TypeScript (Type-safe programming)
- TSX (TypeScript Execute - Node.js enhancement)
- EJS (Template engine)
- Passport.js (Authentication)
- Prisma (ORM)
- Multer (File upload handling)
- Supabase Storage (File storage solution)
- express-validator (Form validation)
- CSS (Styling)

# Setup and Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Configure the following variables:
- PORT
- DATABASE_URL
- SESSION_SECRET
- SUPABASE_URL
- SUPABASE_API_KEY

4. Set up the database
```bash
pnpx prisma migrate dev
```

5. Build the project
```bash
pnpm run build
```

6. Start the server
```bash
pnpm run start
```

# Project Structure
```
File-Uploader/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── middlewares/   # Custom middleware
│   ├── routes/       # Express routes
│   ├── types/        # TypeScript definitions
│   ├── validators/   # Input validation
│   ├── views/        # EJS templates
│   └── app.ts        # Application entry point
├── public/           # Static assets
└── prisma/          # Database schema
```

# User Roles and Permissions
- **Non-registered Users**
  - Can access shared folders through links
  - Can download files from shared folders
  - Cannot create or modify folders/files
- **Registered Users**
  - Full CRUD operations on their folders
  - Can upload and manage files
  - Can create shareable links with expiration dates
  - Can manage their shared folders

# Acknowledgments
- Express.js community
- Prisma team for the excellent ORM
- Supabase team for the storage solution
- Passport.js team for authentication
- TypeScript team for the type system
- Multer team for file upload handling