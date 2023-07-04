import { useParams, useNavigate, redirect } from "react-router-dom"
import { useEffect, useState } from 'react'
import Form from "../../components/Form"
import api from '@/api/api'


export const EmpresaForm = () =>{ 
    const { id } = useParams()
    const [empresa, setEmpresa] = useState({
        name: '',
        cnpj: '',
        website: ''
    });

    const navigate = useNavigate();


    useEffect(()=>{
        if (!!id) {
            api.get('company/'+id).then(res=>{
                console.log('res', res)
                setEmpresa({...res.data})
            }).catch(err=>{
                console.log(err)
            })
        } 
    }, [])

    const formConfig = {
        fields: [
            {
                name: 'name',
                label: 'Name',
                type: 'text',
                placeholder: 'Digite o nome da empresa',
                required: true,
            },
            {
                name: 'cnpj',
                label: 'CNPJ',
                type: 'text',
                placeholder: 'Digite o CNPJ',
                required: true,
            },
            {
                name: 'website',
                label: 'Name',
                type: 'text',
                placeholder: 'Digite o webisite',
                required: true,
            },
        ],
        actions: [
            {
              id: 1,
              label: !!id ? 'Atualizar' : 'Cadastrar',
              type: 'submit',
              disabled: false,
              className: 'bg-blue-500 hover:bg-blue-700 ',
            }
          ]
    }

    const handleSubmit = async (event) => {
        console.log('event', event)
        if (!id) {
            try {
                const response = await api.post('create-company',{
                    ...event
                });
                if(response.status === 201) {
                  navigate('/dashboard/empresas')
                }
              } catch (error) {
                console.log('error', error)
              }
            // console.log(empresaNome)
        } else {
            try {
                const response = await api.put('edit-company/'+id,{
                   ...event
                });
                if(response.status === 200) {
                  navigate('/dashboard/empresas')
                }
              } catch (error) {
                console.log('error', error)
              }
        }
        
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-8 h-full">
            <div className="max-w-md w-full mx-auto overflow-y-auto">
                <h2 className="text-3xl font-bold mb-4">{!!id ? 'Atualizar' : 'Cadastrar'} Empresa</h2>
                <Form config={formConfig} values={empresa} onSubmit={(event) =>  handleSubmit(event)}/>
            </div>
        </div>
    )
}