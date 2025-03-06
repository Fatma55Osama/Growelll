import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import App from './App.jsx'
import 'animate.css'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
    <RecoilRoot>
         <App />
    </RecoilRoot>
   

)
