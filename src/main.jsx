import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import WrappedApp from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <WrappedApp />
  </BrowserRouter>,
)
