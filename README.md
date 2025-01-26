# React + Vite

This template provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules.

## Features

- React 18 with Vite for fast development
- ESLint setup for consistent code quality
- Axios setup for handling API requests

## Vite Plugins

Currently, two official plugins are available for React:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses [SWC](https://swc.rs/) for Fast Refresh.

## Axios API Setup

The project includes an Axios instance for interacting with APIs. Below is a summary of the API methods:

### API Instance
```javascript
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});
