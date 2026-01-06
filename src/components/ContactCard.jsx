import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <h5 className="mb-1">{contact.name}</h5>
                <p className="mb-1 text-muted"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                <p className="mb-1 text-muted"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                <p className="mb-0 text-muted"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
            </div>
            <div>
                {/* Botón Editar (Lápiz): Lleva a la ruta de edición con el ID */}
                <Link to={`/edit-contact/${contact.id}`} className="btn btn-outline-primary btn-sm me-2">
                    <i className="fas fa-pencil-alt"></i>
                </Link>
                
                {/* Botón Borrar (Basura): Ejecuta la función onDelete */}
                <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(contact.id)}
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </li>
    );
};