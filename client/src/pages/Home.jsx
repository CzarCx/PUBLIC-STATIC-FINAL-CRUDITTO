import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GeneralInput from '../components/GeneralInput'
import GeneralButton from '../components/GeneralButton'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'

import Modal from 'react-modal';



function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate()

    const [action, setAction] = useState({
        name: '',
        number_pages: '',
        name_creator: '',
    })

    const [tableData, setTableData] = useState([])
    const [editedData, setEditedData] = useState([])


    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'number_pages' ? parseInt(value, 10) : value;
        setAction((prev) => ({
            ...prev,
            [name]: value,
            [name]: parsedValue,
        }));
    };

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/crud')
            console.log(res.data)
            const result = res.data
            setTableData(result)
            setEditedData(result)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleReloadPage = () => {
        window.location.reload()
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/crud/${id}`);
            console.log('Registro eliminado');
            fetchData();
        } catch (err) {
            console.log('Error al eliminar el registro:', err);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3001/api/crud', action)
            fetchData()
            console.log('se guardo')
        } catch (err) {
            console.log(err)
            console.log('no se guardo')

        }
    }

    const handleSave = async (index) => {
        const dataToSave = editedData[index];
        try {
            await axios.put(`http://localhost:3001/api/crud/${dataToSave.id}`, dataToSave);
        } catch (err) {
            console.log(err);
        }
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const parsedValue = name === 'number_pages' ? parseInt(value, 10) : value;
        const updatedData = [...editedData];
        updatedData[index] = {
          ...updatedData[index],
          [name]: value,
          [name]: parsedValue,
        };
        setEditedData(updatedData);
      }
    const handleGet = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/crud/${id}`)
            console.log(id)
            setAction(res.data)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Poppins:wght@300&display=swap" rel="stylesheet" />
            <div className="container2">  
                <h1>Crud de Libros en Node</h1>
                <div class="pene">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre del libro</th>
                                <th>Nombre del autor</th>
                                <th>Numero de paginas</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((book, index) => (
                                <tr key={book.id}>
                                    <td><input value={editedData[index].name} name="name" onChange={(e) => handleInputChange(e, index)}/></td>
                                    <td><input value={editedData[index].name_creator} name="name_creator" onChange={(e) => handleInputChange(e, index)}/></td>
                                    <td><input value={editedData[index].number_pages} name="number_pages" onChange={(e) => handleInputChange(e, index)}/></td>
                                    <td className="">
                                        <GeneralButton
                                            id="eliminar"
                                            text="Eliminar"
                                            onClick={() => {
                                                handleDelete(book.id);
                                                handleReloadPage();
                                            }}
                                        />
                                        <GeneralButton text="Editar" id="editar" onClick={() => handleSave(index)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div class="ok">
            <div class="epa">
            <div className="">
                    <h1>Registro</h1>
                    <form onSubmit={handleSubmit}>
                        <h4>Nombre del libro</h4>
                        <GeneralInput
                            id='pinput'
                            onChangeHandler={handleChange}
                            name='name'
                            max={30}
                        />

                        <h4>Numero de Páginas</h4>
                        <GeneralInput
                            id='pinput'
                            onChangeHandler={handleChange}
                            type="number"
                            name='number_pages'
                        />

                        <h4>Autor</h4>
                        <GeneralInput
                            id='pinput'
                            onChangeHandler={handleChange}
                            name='name_creator'
                            
                            minLength={5}
                        />
                        <div className="container">
                        <GeneralButton type="submit" text="Enviar" id="enviar"/>

                        </div>
                    </form>
                </div>
            </div>

                </div>
                   
            </div>
        </>
    )
}

export default Home