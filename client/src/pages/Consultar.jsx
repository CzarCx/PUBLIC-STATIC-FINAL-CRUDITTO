import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function Consultar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tableData, setTableData] = useState([]);
    const [editedData, setEditedData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/${id}`);
            const result = res.data;
            setTableData(result);
            setEditedData(result); 
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedData = [...editedData];
        updatedData[index] = {
            ...updatedData[index],
            [name]: value,
        };
        setEditedData(updatedData);
    }

    const handleSave = async (index) => {
        const dataToSave = editedData[index];
        try {
            await axios.put(`http://localhost:3001/${dataToSave.id}`, dataToSave);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="container">
                <div className="tablaDiv">
                    <table className="todo-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Precio</th>
                                <th>ISBN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((lib, index) => (
                                <tr key={lib.id}>
                                    <td>
                                        <input value={editedData[index].titulo} name="titulo" onChange={(e) => handleInputChange(e, index)} />
                                    </td>
                                    <td>
                                        <input value={editedData[index].autor} name="autor" onChange={(e) => handleInputChange(e, index)} />
                                    </td>
                                    <td>
                                        <input value={editedData[index].precio} name="precio" onChange={(e) => handleInputChange(e, index)} />
                                    </td>
                                    <td>
                                        <input value={editedData[index].ISBN} name="ISBN" onChange={(e) => handleInputChange(e, index)} />
                                    </td>
                                    <td className="todo-actions">
                                        <GeneralButton
                                            text="Eliminar"
                                            onClick={() => handleDelete(lib.id)}
                                        />
                                        <GeneralButton text="Guardar" onClick={() => handleSave(index)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <GeneralButton text="Volver" onClick={() => navigate('/')} />
        </>
    )
}

export default Consultar