const Modal = ({ data, onClose }) => {
    const { start_date, start_vacation_date, end_vacation_date } = data;

    const mapping = {
        0: 'Data de Início',
        1: 'Início das férias',
        2: 'Fim das férias'
    }

    const dateArray = [start_date, start_vacation_date, end_vacation_date];
    const timelineDates = dateArray.sort((a, b) => new Date(a) - new Date(b));

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal flex items-center justify-center fixed inset-0 z-10 shadow-2xl bg-gray-700 bg-opacity-10">
            <div className="modal-content bg-white rounded-lg p-8 w-1/6 border border-solid border-gray-500">
                <h2 className="text-xl font-bold mb-4">Timeline</h2>
                <ul className="timeline">
                {timelineDates.map((date, index) => (
                    <>
                    <label key={index}>{mapping[index]}</label>
                    <li key={index} className="py-2">{date}</li>
                    </>
                    
                ))}
                </ul>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleClose}
                    >
                    Fechar
                </button>
            </div>
        </div>
    );
  };
  
  export default Modal;