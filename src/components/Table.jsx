import React from "react"

const Table = ({items, data, actions}) => {
    return (
        <table className="w-full bg-white shadow-md rounded mb-4 ">
            <thead>
                <tr>
                    {items && items.map((item)=>{
                        return (
                            <th key={item.id} className="py-2 px-4 border-b">{item.label}</th>
                        )
                    })}
                    {!!actions && <th className="py-2 px-4 border-b">Ações</th>}
                </tr>
            </thead>
            <tbody className="text-center py-8">
            {/* Render table rows */}
            {data && data.map((row)=>{
                return (
                    <tr key={row.id}>
                        {items && items.map((item)=>{
                            return (
                                <td key={item.id}>{row[item.name]}</td>
                            )
                        })}
                        <td>
                        {!!actions && actions.map((action, index)=>{
                            
                            return (
                                    <button key={index} className="mr-2" onClick={(event)=>{event.preventDefault(); action.action(row)}}>
                                        <i className={action.icon}></i>
                                    </button>
                            )
                        })}
                        </td>
                    </tr>)
            })}
            </tbody>
        </table>
    )
}

// Table.propTypes = {
//     item: PropTypes.arrayOf(
//         PropTypes.shape({
//             label: PropTypes.string,
//             id: PropTypes.number,
//             name: PropTypes.string,
//             superUser: PropTypes.bool,
//         }
//     )),
//     data: PropTypes.any()
// }

export default Table