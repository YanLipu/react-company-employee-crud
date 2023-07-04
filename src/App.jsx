import routes from '@/routes';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';

function App() {
  const content = useRoutes(routes);

  return content;
}

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;

// export default App
