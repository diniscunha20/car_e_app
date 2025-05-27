import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';
<link rel="manifest" href="/manifest.json" />



createRoot(document.getElementById('root')!).render(
    <App />

)
