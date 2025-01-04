# React Native Todo App 📝

<div align="center">
  <img src="https://www.amitree.com/wp-content/uploads/2021/08/the-pros-and-cons-of-paper-to-do-lists.jpeg" alt="Todo App Screenshot" />

  ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
</div>

## Overview

A clean and intuitive todo list application built with React Native and Expo. This project demonstrates fundamental React Native concepts including component structure, state management, and user interactions.

## Features

- ✨ Add new tasks
- ✅ Mark tasks as complete
- 🗑️ Delete tasks
- 🌓 Dark mode support
- 📱 Responsive design

## Setup Instructions

1. **Prerequisites**
   ```bash
   # Install Expo CLI globally
   npm install -g expo-cli
   ```

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   cd todo-app
   npm install
   ```

3. **Running the App**
   ```bash
   # Start the development server
   npx expo start
   ```

## Third-Party Libraries

- **@expo/vector-icons**: Used for task and UI icons
- **expo-router**: Handles navigation setup
- **expo-status-bar**: Manages status bar appearance

## App Structure

```
todo-app/
├── app/
│   ├── _layout.tsx    # Navigation and theme setup
│   └── index.tsx      # Main todo list screen
└── package.json
```

## Usage

- Tap the input field to add a new task
- Tap a task to mark it as complete
- Tap the trash icon to delete a task
- App automatically adapts to system dark/light mode

---

<div align="center">
  Built with ❤️ using React Native
</div>