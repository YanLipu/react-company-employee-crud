import Login from '@/pages/Login';
import {LayoutDefault} from '@/layouts/Default';
import {ListaEmpresa} from '@/pages/ListaEmpresas';
import {ListaFuncionario} from '@/pages/ListaFuncionarios';
import {EmpresaForm} from '@/pages/Empresa/CreateOrUpdate';
import {FuncionarioForm} from '@/pages/Funcionario/CreateOrUpdate';

const routes = [
    {
        path:'/',
        element: <Login/>,
    },
    {
        path:'/dashboard',
        element: <LayoutDefault/>,
        children: [
            {
                path: 'empresas',
                element: <ListaEmpresa/>
            },
            {
                path: 'funcionarios',
                element: <ListaFuncionario/>
            },
            {
                path: 'cadastro-empresa',
                element: <EmpresaForm/>
            },
            {
                path: 'cadastro-empresa/:id',
                element: <EmpresaForm/>
            },
            {
                path: 'cadastro-funcionario',
                element: <FuncionarioForm/>
            },
            {
                path: 'cadastro-funcionario/:id',
                element: <FuncionarioForm/>
            },
        ]
    },
];

export default routes;