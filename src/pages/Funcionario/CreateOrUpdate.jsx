import { useParams, useNavigate, redirect } from "react-router-dom"
import { useEffect, useState } from 'react'
import Form from "../../components/Form"
import api from '@/api/api'

export const FuncionarioForm = () => {
    const { id } = useParams()
    const [funcionario, setFuncionario] = useState({
      name: '',
      birth_date: '',
      start_date: '',
      end_date: '',
      start_vacation_date: '',
      end_vacation_date: '',
      sex: '',
      cpf: '',
      email: '',
      phone: '',
      company: '',
      company_name: '',
    });
    const [empresas, setEmpresas] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
      if (!!id) {
          api.get('employee/'+id).then(res=>{
              console.log('res', res)
              setFuncionario({
                ...res.data
              })
          }).catch(err=>{
              console.log(err)
          })
      }
      api.get('list-companies').then(res=>{
        setEmpresas(res.data)
      }).catch(err=>console.log('err', err))
    }, [])
    const formConfig = {
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Digite seu nome',
            required: true,
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Digite seu email',
            required: true,
          },
          {
            name: 'birth_date',
            label: 'Data de nascimento',
            type: 'date',
            placeholder: 'Digite sua data de nascimento',
            required: true,
          },
          {
            name: 'start_date',
            label: 'Data de Contratação',
            type: 'date',
            placeholder: 'Digite a data de contratação',
            required: true,
          },
          {
            name: 'end_date',
            label: 'Data de Saída',
            type: 'date',
            placeholder: 'Digite a data de saída',
            required: true,
          },
          {
            name: 'start_vacation_date',
            label: 'Início das férias',
            type: 'date',
            placeholder: 'Digite a data de início das férias',
            required: true,
          },
          {
            name: 'end_vacation_date',
            label: 'Fim das férias',
            type: 'date',
            placeholder: 'Digite a data de fim das férias',
            required: true,
          },
          {
            name: 'cpf',
            label: 'CPF',
            type: 'text',
            placeholder: 'Digite o CPF',
            required: true,
          },
          {
            name: 'phone',
            label: 'Telefone',
            type: 'text',
            placeholder: 'Digite o telefone',
            required: true,
          },
          {
            name: 'sex',
            label: 'Sexo',
            type: 'select',
            options: [
              { label: 'Homem', value: 'M' },
              { label: 'Mulher', value: 'F' },
            ],
            required: true,
          },
          {
            name: 'company',
            label: 'Empresa',
            type: 'select',
            options: empresas.map(empresa=>{return {label: empresa.name, value: empresa.id}}),
            required: true,
          },
          // Add more fields as needed
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
      };
    
    const handleSubmit = async (event) => {
      if (!!id) {
        api.put('edit-employe/'+id, {
          ...event
        }).then(res=>{
          navigate('/dashboard/funcionarios')
        }).catch(err=>console.log('err', err))
      } else {
        api.post('create-employe', {
          ...event
        }).then(res=>{
          navigate('/dashboard/funcionarios')
        }).catch(err=>console.log('err', err))
      }
    }
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 py-8 h-full">
            <div className="max-w-md w-full mx-auto overflow-y-auto">
                <h2 className="text-3xl font-bold mb-4">{!!id ? 'Atualizar' : 'Cadastrar'} Funcionário</h2>
                <Form config={formConfig} values={funcionario} onSubmit={(event) =>  handleSubmit(event)}/>
            </div>
        </div>
        
    )
}