export const initialStore = () => {
  return {
    contacts: [],    
    slug: "elianacorujo" // Tu usuario de la API
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    // Caso para guardar la lista de contactos en el estado global
    case 'load_contacts':
      return {
        ...store,
        contacts: action.payload
      };

    default:
      throw Error('Unknown action.');
  }
}