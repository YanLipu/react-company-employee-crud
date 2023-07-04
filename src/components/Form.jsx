import { useEffect, useState } from "react";

const Form = ({config, values, onSubmit}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        onSubmit(reactiveValues)
      };
    const [reactiveValues, setReactiveValues] = useState(values)

    useEffect(()=>{
        setReactiveValues(values)
    }, [values])

    const handleChange = (value, name) => {
        const v = {
            ...reactiveValues
        }
        v[name] = value
        setReactiveValues(v)
    };
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="max-w-md w-full mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    {config.fields.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">{field.label}</label>
                        {field.type === 'select' ? (
                            <select
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={reactiveValues[field.name]}
                            onChange={(e)=>handleChange(e.target.value, field.name)}
                          > { field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            )) }
                        </select>) : (<input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={reactiveValues[field.name]}
                        onChange={(e)=>handleChange(e.target.value, field.name)}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />)}
                    </div>
                    ))}
                    {config.actions.map((action)=>{
                        return (
                            <button key={action.id}
                                type={action.type}
                                className={action.className + " text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" }
                                disabled={action.disabled}
                                onClick={action.type !== 'submit' ? action.action : null}
                            >
                            {action.label}
                            </button>
                        )
                    })}
                </div>
            </form>
            </div>
        </div>
        
    )
}

export default Form