import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductCardManager(){
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        price: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const API_URL = "http://localhost:8080/api/products";

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error al cargar los productos: ", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                }),
            });
            if (response.ok) {
                alert('Producto almacenado correctamente');
                setFormData({ id: "", name: "", description: "", price: "" });
                fetchProducts();
            }
        } catch (error) {
            console.error("Ups!! ocurrió un error al grabar producto: ", error);
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setIsEditing(true);
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${API_URL}/${formData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                }),
            });
            if (response.ok) {
                alert('Producto modificado correctamente');
                setIsEditing(false);
                setFormData({ id: "", name: "", description: "", price: "" });
                fetchProducts();
            }
        } catch (error) {
            console.error("Ups!! ocurrió un error al modificar producto: ", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Está seguro de eliminar el producto??")) return;
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                alert('Producto eliminado correctamente');
                fetchProducts();
            }
        } catch (error) {
            console.error("Ups!! ocurrió un error al eliminar producto: ", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4 manager-title">Mantenedor de Productos</h2>

            <table className="table manager-card" style={{ marginBottom: '40px' }}>
                <thead>
                    <tr>
                        <th colSpan="3" className="text-center p-3" style={{ borderBottom: 'none' }}>
                            <h5 className="m-0" style={{ color: '#e0d0ff', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                {isEditing ? "Editar Producto" : "Nuevo Producto"}
                            </h5>
                        </th>
                    </tr>
                    <tr>
                        <th style={{ width: '40%' }}>Nombre</th>
                        <th style={{ width: '20%' }}>Precio</th>
                        <th style={{ width: '40%' }}>Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td className="align-middle">
                            <input type="text" 
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Ej: Nvidia rtx 5090"
                                style={{ maxWidth: '100%' }} 
                            />
                        </td>

                        <td className="align-middle">
                            <input type="number" 
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="0"
                                style={{ maxWidth: '100%' }}
                            />
                        </td>

                        <td className="align-middle text-center">
                            {isEditing ? (
                                <button onClick={handleUpdate} className="btn-form btn-crear">
                                    Actualizar
                                </button> 
                            ) : (
                                <button onClick={handleCreate} className="btn-form btn-crear">
                                    Crear
                                </button>
                            )}

                            <button onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ id: "", name: "", price: "" });
                                }}
                                className="btn-form btn-limpiar">
                                Limpiar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>    
            <table className="table-manager"> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p) =>
                        (<tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>
                                <button onClick={() => handleEdit(p)}
                                    className="btn-tabla separar">Editar</button>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="btn-tabla">
                                    Eliminar
                                </button>
                            </td>
                        </tr>)
                    )}
                </tbody>
            </table>
            
            <br /><br />
            <div className="d-flex justify-content-end p-3">
                <button
                    onClick={handleLogout}
                    className="btn-logout">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default ProductCardManager;