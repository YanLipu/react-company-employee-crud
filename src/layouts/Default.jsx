import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../pages/AuthContext';
import { Link, useNavigate, Navigate, Outlet } from 'react-router-dom';
import Table from '../components/Table'
import api from '@/api/api'

export const LayoutDefault = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const locationName = location.pathname === '/dashboard'
    const [empresas, setEmpresas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        // Fetch empresas
        api.get('list-companies')
        .then((response) => {
            setEmpresas(response.data);
            console.log('empresas', empresas)
        })
        .catch((error) => {
            console.error('Error fetching empresas:', error);
        });

        // Fetch funcionarios
        api.get('list-employes')
        .then((response) => {
            setFuncionarios(response.data);
        })
        .catch((error) => {
            console.error('Error fetching funcionarios:', error);
        });
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
      };

    const logoutUser = async () => {
        await api.post('logout')
        logout()
        handleNavigation('/')
    }
    console.log('user do contexto', user)
    
    if(!user) {
        return <Navigate to="/" />;
    }

    const tableColumns= [
        {
            id: 1,
            name: 'categoria',
            label: 'Categoria'
        },
        {
            id: 2,
            name: 'total',
            label: 'Total'
        },
    ]

    const dashboardData = [
        {
            categoria: 'Empresas',
            total: empresas.length
        },
        {
            categoria: 'Funcionários',
            total: funcionarios.length
        },
    ]

    
    return (
        <div className="flex flex-col h-screen">
            <nav className="flex items-center justify-between bg-white shadow-md py-4 px-8 h-1/6">
                    {user && user.is_superuser ? (
                        <>
                        <Link to="empresas" className="text-blue-500 hover:text-blue-700 font-bold mx-2">
                            Todas as Empresas
                        </Link>
                        <Link to="funcionarios" className="text-blue-500 hover:text-blue-700 font-bold mx-2">
                            Todos os Funcionários
                        </Link>
                        <Link to="cadastro-empresa" className="text-blue-500 hover:text-blue-700 font-bold mx-2">
                            Cadastro Empresa
                        </Link>
                        <Link to="cadastro-funcionario" className="text-blue-500 hover:text-blue-700 font-bold mx-2">
                            Cadastro Funcionário
                        </Link>
                        </>
                    ) : (
                        <>
                        <Link to="empresas" className="text-blue-500 hover:text-blue-700 font-bold mx-2">
                            Todas as Empresas
                        </Link>
                        <Link to="funcionarios" className="text-blue-500 hover:text-blue-700 font-bold mx-2">
                            Todos os Funcionários
                        </Link>
                        </>
                    )}
                <button
                    onClick={() => logoutUser()}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Logout
                </button>
            </nav>
            {locationName && 
                <div className="flex flex-col items-center justify-center bg-gray-100 py-8 h-full">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Visão Geral</h2>
                        <Table data={dashboardData} items={tableColumns}/>
                    </div>
                </div>}
            <Outlet/>            
        </div>
  )};