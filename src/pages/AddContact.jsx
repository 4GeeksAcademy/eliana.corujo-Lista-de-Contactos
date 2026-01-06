import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams(); // Capturamos el ID si estamos editando

    // Estado del formulario
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Título dinámico
    const pageTitle = id ? "Editar Contacto" : "Añadir Nuevo Contacto";

    // Si hay un ID, buscamos los datos para rellenar el formulario
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find(c => c.id == id);
            if (currentContact) {
                setContact({
                    name: currentContact.name,
                    email: currentContact.email,
                    phone: currentContact.phone,
                    address: currentContact.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const saveContact = async () => {
        // Lógica: Si hay ID usamos PUT (Actualizar), si no, POST (Crear)
        const method = id ? "PUT" : "POST";
        const url = id 
            ? `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${id}`
            : `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                navigate("/"); // Volver a la lista al terminar
            } else {
                console.error("Error al guardar");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{pageTitle}</h1>
            
            <form className="container" onSubmit={(e) => { e.preventDefault(); saveContact(); }}>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input 
                        type="text" className="form-control" placeholder="Nombre completo"
                        name="name" value={contact.name} onChange={handleChange} required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" className="form-control" placeholder="Correo electrónico"
                        name="email" value={contact.email} onChange={handleChange} required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                        type="text" className="form-control" placeholder="Teléfono"
                        name="phone" value={contact.phone} onChange={handleChange} required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                        type="text" className="form-control" placeholder="Dirección"
                        name="address" value={contact.address} onChange={handleChange} required
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <Link to="/" className="btn btn-link">o volver a contactos</Link>
                </div>
            </form>
        </div>
    );
};