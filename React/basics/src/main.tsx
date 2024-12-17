import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import './index.css';

const newElement = document.createElement('h1');
newElement.textContent = "Hello World";
newElement.className = "header";



// createRoot(document.getElementById('root')!).render(
//     <App />
// )

document.getElementById('root')?.appendChild(newElement);