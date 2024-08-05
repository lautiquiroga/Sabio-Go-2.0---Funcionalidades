import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './loopItemProduct';
import SortOptions from './sortOptions';
import FilterChips from './filters__chips';


const products = [
    { id: 1, image: 'url_de_la_imagen_1', price: 230256, name: 'Notebook Lenovo Ideapad 1i Intel I3 1215u 4gb Ram', des: true, categoria: 'Notebooks', marca: 'Lenovo', plan: "ahora12" },
    { id: 2, image: 'url_de_la_imagen_2', price: 150000, name: 'Celular Motorola G8 Power', des: false, categoria: 'Celulares', marca: 'Motorola' },
    { id: 3, image: 'url_de_la_imagen_3', price: 180000, name: 'Monitor HP 24mh 23.8-Inch FHD Monitor', des: true, categoria: 'Monitores', marca: 'HP' },
    { id: 4, image: 'url_de_la_imagen_4', price: 120000, name: 'Auriculares Sony WH-1000XM4', des: true, categoria: 'Auriculares', marca: 'Sony' },
    { id: 5, image: 'url_de_la_imagen_5', price: 85000, name: 'Cable HDMI 2.0 3m', des: false, categoria: 'Cables', marca: 'Netmak' },
    { id: 6, image: 'url_de_la_imagen_6', price: 300000, name: 'Notebook Acer Aspire 5 Intel i5 10ma gen', des: true, categoria: 'Notebooks', marca: 'Acer' },
    { id: 7, image: 'url_de_la_imagen_7', price: 95000, name: 'Celular Sony Xperia XZ2', des: false, categoria: 'Celulares', marca: 'Sony' },
    { id: 8, image: 'url_de_la_imagen_8', price: 200000, name: 'Monitor Lenovo Q27h-10', des: true, categoria: 'Monitores', marca: 'Lenovo' },
    { id: 9, image: 'url_de_la_imagen_9', price: 40000, name: 'Cable USB-C a USB-A', des: false, categoria: 'Cables', marca: 'HP' },
    { id: 10, image: 'url_de_la_imagen_10', price: 70000, name: 'Auriculares Motorola Pulse Escape', des: true, categoria: 'Auriculares', marca: 'Motorola' },
    { id: 11, image: 'url_de_la_imagen_11', price: 250000, name: 'Notebook HP Pavilion 15', des: true, categoria: 'Notebooks', marca: 'HP' },
    { id: 12, image: 'url_de_la_imagen_12', price: 100000, name: 'Celular Acer Liquid Z6', des: false, categoria: 'Celulares', marca: 'Acer' },
    { id: 13, image: 'url_de_la_imagen_13', price: 180000, name: 'Monitor Sony Bravia 24"', des: true, categoria: 'Monitores', marca: 'Sony' },
    { id: 14, image: 'url_de_la_imagen_14', price: 50000, name: 'Cable VGA 1.5m', des: false, categoria: 'Cables', marca: 'Netmak' },
    { id: 15, image: 'url_de_la_imagen_15', price: 140000, name: 'Auriculares HP Omen', des: true, categoria: 'Auriculares', marca: 'HP' },
    { id: 16, image: 'url_de_la_imagen_16', price: 270000, name: 'Notebook Lenovo ThinkPad X1', des: true, categoria: 'Notebooks', marca: 'Lenovo' },
    { id: 17, image: 'url_de_la_imagen_17', price: 120000, name: 'Celular Netmak NM45', des: false, categoria: 'Celulares', marca: 'Netmak' },
    { id: 18, image: 'url_de_la_imagen_18', price: 195000, name: 'Monitor Acer Nitro 27"', des: true, categoria: 'Monitores', marca: 'Acer' },
    { id: 19, image: 'url_de_la_imagen_19', price: 60000, name: 'Cable DisplayPort 2m', des: false, categoria: 'Cables', marca: 'Sony' },
    { id: 20, image: 'url_de_la_imagen_20', price: 80000, name: 'Auriculares Acer Predator', des: true, categoria: 'Auriculares', marca: 'Acer' }
];

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loadCount, setLoadCount] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initialProducts = products.slice(0, 5);
        setDisplayedProducts(initialProducts);
    }, []);

    const loadMoreProducts = useCallback(() => {
        if (loading) return; // Prevent multiple loads
        setLoading(true);
        const newCount = loadCount + 1;
        const newProducts = products.slice(0, newCount * 5);
        setDisplayedProducts(newProducts);
        setLoadCount(newCount);
        setLoading(false);
    }, [loadCount, loading]);

    // Gracias al hook searchParams, el siguiente const va a ir cambiando en tiempo real cada vez que la URL cambie (debido al uso de searchParams.get)
    const filteredProducts = displayedProducts.filter(product => {
        const destacados = searchParams.get('destacados');
        const plan = searchParams.get('plan');
        const categorias = searchParams.get('categoria') ? searchParams.get('categoria').split(',') : [];
        const marcas = searchParams.get('marca') ? searchParams.get('marca').split(',') : [];

        if (destacados && product.des.toString() !== destacados) {
            return false;
        }

        if (plan && !product.plan) {
            return false;
        }

        if (categorias.length && !categorias.includes(product.categoria)) {
            return false;
        }

        if (marcas.length && !marcas.includes(product.marca)) {
            return false;
        }

        return true;
    });

    // Ordenamiento
    const sortOption = searchParams.get('sort') || 'createdAt'; // Valor por defecto

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'priceAsc':
                return a.price - b.price;
            case 'priceDesc':
                return b.price - a.price;
            case 'createdAt':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt); // Suponiendo que tienes un campo 'createdAt'
        }
    });

    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadMoreProducts();
            }
        }, { threshold: 0.5 }); // Cambiado a 0.5 para cargar antes de llegar al final

        const endOfProductsElement = document.querySelector('.end-of-products');
        if (endOfProductsElement) {
            observer.current.observe(endOfProductsElement);
        }

        return () => observer.current.disconnect();
    }, [filteredProducts, loadMoreProducts, loading]);

    return (
        <div className="product-list d-flex flex-column gap-3 p-2 align-items-center">
            <SortOptions />
            <FilterChips />
            <div className='d-flex flex-wrap gap-3 justify-content-center'>
                {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="end-of-products" style={{ height: '20px' }}></div>
            {loading && <div className="loading">Loading...</div>}
        </div>
    );
};

export default ProductList;
