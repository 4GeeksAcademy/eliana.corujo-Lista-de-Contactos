import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            
            {/* Ruta principal: Muestra la lista de contactos */}
            <Route path="/" element={<Contact />} />
            
            {/* Ruta para crear un contacto nuevo */}
            <Route path="/add-contact" element={<AddContact />} />
            
            {/* Ruta para editar (recibe el ID del contacto) */}
            <Route path="/edit-contact/:id" element={<AddContact />} />
            
        </Route>
    )
);