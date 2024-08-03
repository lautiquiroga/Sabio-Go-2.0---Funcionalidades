import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
                <h2 className="product-price">${product.price}</h2>
                <h3 className="product-name">{product.name}</h3>
            </div>
            <button className="add-to-cart">Agregar al carrito</button>
        </div>
    );
};

export default ProductCard;
