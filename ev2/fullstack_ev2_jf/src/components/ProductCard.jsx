function ProductCard({ imagen, nombre, precio }) {
  return (
    <div className="tarjeta-item">
      <img src={imagen} alt={nombre} className="item-img" />
      <div className="item-info">
        <h4>{nombre}</h4>
        <p className="price">{precio}</p>
      </div>
    </div>
  );
}

export default ProductCard;