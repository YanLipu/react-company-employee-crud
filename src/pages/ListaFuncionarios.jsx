import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Modal from '../components/Timeline';
import api from '@/api/api'


export const ListaFuncionario = () => {
    const { user } = useContext(AuthContext);
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionario, setFuncionario] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const tableColumns = [
        {
            id: 1,
            name: 'name',
            label: 'Nome'
        },
        {
            id: 2,
            name: 'email',
            label: 'Email'
        },
        {
            id: 3,
            name: 'cpf',
            label: 'CPF'
        },
        {
            id: 4,
            name: 'sex',
            label: 'Sexo'
        },
        {
            id: 5,
            name: 'phone',
            label: 'Telefone'
        },
        {
            id: 6,
            name: 'company_name',
            label: 'Empresa'
        },
    ]

    const actions = [
        {
            icon: 'fas fa-pencil-alt',
            action: (row) => {
                console.log('editei', row)
                navigate(`/dashboard/cadastro-funcionario/${row.id}`)
            }
        },
        {
            icon: 'fas fa-user-alt',
            action: (row)=>{
                console.log('exluir', row)
                setFuncionario({...row})
                handleButtonClick()
            }
        },
        {
            icon: 'fas fa-trash-alt',
            action: (row)=>{
                api.delete('delete-employe/'+row.id).then(res=>{
                    getFuncionarios()
                }).catch(err=>{
                    console.log('err',err)
                })
                console.log('exluir', row)
            }
        },
    ]

    const getFuncionarios = ()=>{
        api.get('list-employes')
        .then((response) => {
            setFuncionarios(response.data);
        })
        .catch((error) => {
            console.error('Error fetching funcionarios:', error);
        });
    }

    const handleButtonClick = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    

    useEffect(()=>{
        getFuncionarios()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-8 h-full">
            <div className="max-w-5xl w-full mx-auto">
                <h2 className="text-3xl font-bold mb-4">Visão Geral</h2>
                <Table data={funcionarios} items={tableColumns} actions={user.is_superuser && actions}>
                </Table>
            </div>
            {showModal && (
                <Modal data={funcionario} onClose={handleCloseModal} />
            )}
        </div>
    )
}