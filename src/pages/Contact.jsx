import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();

    // 1. Función para traer los contactos
    const fetchContacts = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`);
            
            // Si el usuario no existe (Error 404), lo creamos
            if (response.status === 404) {
                createAgenda();
                return;
            }

            const data = await response.json();
            
            // Guardamos en el store
            dispatch({
                type: "load_contacts",
                payload: data.contacts
            });

        } catch (error) {
            console.error("Error cargando contactos:", error);
        }
    };

    // 2. Función auxiliar para crear la agenda si es nueva
    const createAgenda = async () => {
        try {
            await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}`, {
                method: "POST"
            });
            fetchContacts(); // Reintentamos pedir los contactos
        } catch (error) {
            console.error("Error creando agenda:", error);
        }
    }

    // 3. Función para borrar contacto
    const deleteContact = async (id) => {
        const isConfirmed = window.confirm("¿Estás segura de que quieres eliminar este contacto?");
        
        if (isConfirmed) {
            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${id}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    fetchContacts(); // Recargamos la lista
                }
            } catch (error) {
                console.error("Error eliminando contacto:", error);
            }
        }
    };

    // Ejecutar al cargar la página
    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Lista de Contactos</h1>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add-contact" className="btn btn-success">Agregar nuevo contacto</Link>
            </div>
            
            <ul className="list-group">
                {store.contacts.length === 0 ? (
                    <div className="alert alert-info text-center">No hay contactos, ¡agrega uno!</div>
                ) : (
                    store.contacts.map((contact) => (
                        <ContactCard 
                            key={contact.id} 
                            contact={contact} 
                            onDelete={deleteContact} 
                        />
                    ))
                )}
            </ul>
        </div>
    );
};