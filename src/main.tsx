import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';
import ProgressProvider from "./components/ProgressProvider";

createRoot(document.getElementById('root')!).render(
    <div>

    <App />
    <ProgressProvider />
    </div>

)
