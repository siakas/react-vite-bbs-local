# Simple Bulletin Board Application

This repository contains a simple bulletin board application built with modern web technologies. The frontend is developed using React, TypeScript, and Vite, while the backend is powered by JSON Server. The UI components are designed with shadcn/ui.

## Main Technologies

- React
- TypeScript
- Vite
- shadcn/ui
- JSON Server
- Axios
- Node-fetch
- js-cookie
- JWT

## Getting Started

Follow these steps to set up and run the application:

### 1. Install Dependencies

Navigate to the `frontend` and `backend` directories and run the following command to install the required packages:

```bash
pnpm install
```

### 2. Set Up Environment Variables

In the backend directory, create a .env file and add the following line:

```
ACCESS_TOKEN_SECRET=secret
```

You can replace secret with any value you prefer. The presence of this file is necessary for the application to function correctly.

### 3. Start the Backend Server

Navigate to the backend directory and run the following command:

```bash
pnpm start
```

This will start the backend server.

### 4. Start the Frontend Server

Navigate to the frontend directory and run the following command:

```
pnpm dev
```

This will start the frontend server.

### 5. Access the Application

Open your web browser and go to:

```
http://127.0.0.1:5173/
```

You should now see the bulletin board application running.

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.

```arduino
If you encounter any issues or have questions, please open an issue in this repository.
```
