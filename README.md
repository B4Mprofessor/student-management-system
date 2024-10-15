# Student Management System

A **Student Management System** built using **React** and **Vite**. This system allows for adding, updating, deleting, searching, and filtering student records. It also includes sorting features, and local storage integration to persist data across sessions. The project follows a mobile-first approach and prioritizes a clean and intuitive UI design.

## Features

- Add, edit, and delete student records
- Search and filter students based on name, grade, and status
- Sort student records by various criteria
- Persistent data using browser local storage
- Responsive design (mobile-first approach)
- ESLint integrated for code consistency
- Optional: TypeScript and form validation

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Previewing the Production Build](#previewing-the-production-build)
- [Linting](#linting)
- [Project Structure](#project-structure)
- [License](#license)

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)

## Installation

1. Clone the repository:
   `git clone https://github.com/your-username/student-management-system.git`
   
2. Navigate to the project directory:
   `cd student-management-system`

3. Install dependencies:
   `npm install`

## Running the Application

Start the development server:
`npm run dev`

Then open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Building for Production

To create an optimized production build:
`npm run build`

## Previewing the Production Build

To locally preview the production build:
`npm run preview`

## Linting

Ensure code quality and consistency by running:
`npm run lint`

## Project Structure

```plaintext
student-management-system/
├── .gitignore
├── package.json
├── vite.config.js
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── assets/
│   ├── components/
│   │   ├── FilterDropdown.jsx
│   │   ├── StudentForm.jsx
│   │   ├── StudentTable.jsx
│   │   └── SearchBar.jsx
│   ├── styles/
│   └── utils/
│       └── helper.js
```

## Folder Structure

- **public/**: Static assets like icons, images.
- **src/**: Contains the core application code including components, styles, and utility functions.
- **components/**: Includes `FilterDropdown`, `StudentForm`, `StudentTable`, and `SearchBar` for searching and filtering student data.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to fork the repository and submit a pull request if you'd like to contribute to the project.


