import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <h2 className="product-price">${product.price}</h2>
                <button className="add-to-cart">Agregar al carrito</button>
            </div>
        </div>
    );
};

export default ProductCard;
