import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Table from '../components/Table';
import api from '@/api/api'

export const ListaEmpresa = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [empresas, setEmpresas] = useState([]);

    const tableColumns = [
        {
            id: 1,
            name: 'name',
            label: 'Nome',
        },
        {
            id: 2,
            name: 'cnpj',
            label: 'CNPJ',
        },
        {
            id: 3,
            name: 'website',
            label: 'Website',
        },
    ]

    const actions = [
        {
            icon: 'fas fa-pencil-alt',
            action: (row) => {
                console.log('editei', row)
                navigate(`/dashboard/cadastro-empresa/${row.id}`)
            }
        },
        {
            icon: 'fas fa-trash-alt',
            action: (row)=>{
                api.delete('delete-company/'+row.id).then(res=>{
                    getEmpresas()
                }).catch(err=>console.log('err', err))
                console.log('exluir', row)
            }
        },
    ]

    const getEmpresas = ()=>{
        api.get('list-companies')
        .then((response) => {
            setEmpresas(response.data);
            console.log('empresas', empresas)
        })
        .catch((error) => {
            console.error('Error fetching empresas:', error);
        });
    }

    useEffect(()=>{
        getEmpresas()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-8 h-full">
            <div className="max-w-3xl w-full mx-auto">
                <h2 className="text-3xl font-bold mb-4">Visão Geral</h2>
                <Table data={empresas} items={tableColumns} actions={user.is_superuser && actions}>
                </Table>
            </div>
        </div>
    )
}