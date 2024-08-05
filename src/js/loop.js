import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './loopItemProduct';
import SortOptions from './sortOptions';
import FilterChips from './filters__chips';

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loadCount, setLoadCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef(null);

    // Cargar los productos desde el servidor
    useEffect(() => {
        fetch('http://localhost:3000/assets/test-data.json')
            .then((response) => response.json())
            .then((json) => setProducts(json))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Filtrar y ordenar los productos según los parámetros de búsqueda
    const filterAndSortProducts = useCallback(() => {
        const destacados = searchParams.get('destacados');
        const plan = searchParams.get('plan');
        const categorys = searchParams.get('category') ? searchParams.get('category').split(',') : [];
        const marcas = searchParams.get('marca') ? searchParams.get('marca').split(',') : [];

        let filteredProducts = products.filter(product => {
            if (destacados && product.att2.toString() !== destacados) {
                return false;
            }

            if (plan && !product.plan) {
                return false;
            }

            if (categorys.length && !categorys.includes(product.category)) {
                return false;
            }

            if (marcas.length && !marcas.includes(product.att1)) {
                return false;
            }

            return true;
        });

        const sortOption = searchParams.get('sort') || 'createdAt'; // Valor por defecto
        filteredProducts = filteredProducts.sort((a, b) => {
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

        return filteredProducts;
    }, [products, searchParams]);

    // Actualiza los productos filtrados y ordenados y los productos mostrados
    useEffect(() => {
        const filteredAndSorted = filterAndSortProducts();
        setFilteredAndSortedProducts(filteredAndSorted);

        // Reinicia el conteo de carga y muestra los primeros productos según el conteo actual
        setLoadCount(1);
        setDisplayedProducts(filteredAndSorted.slice(0, 5));
    }, [filterAndSortProducts]);

    // Carga más productos
    const loadMoreProducts = useCallback(() => {
        if (loading) return; // Prevent multiple loads
        setLoading(true);

        // Solo carga más productos si hay más disponibles en la lista filtrada
        const newCount = loadCount + 1;
        const newDisplayProducts = filteredAndSortedProducts.slice(0, newCount * 5);

        setDisplayedProducts(newDisplayProducts);
        setLoadCount(newCount);
        setLoading(false);
    }, [filteredAndSortedProducts, loadCount, loading]);

    // Observa el antepenúltimo producto para cargar más productos
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadMoreProducts();
            }
        }, { threshold: 0.5 }); // Cambiado a 0.5 para cargar antes de llegar al final

        const observeEndOfProducts = () => {
            if (displayedProducts.length > 2) {
                const antepenultimateProductElement = document.querySelector('.product-list .product-card:nth-last-of-type(3)');
                if (antepenultimateProductElement) {
                    observer.current.observe(antepenultimateProductElement);
                }
            }
        };

        observeEndOfProducts();

        return () => observer.current.disconnect();
    }, [displayedProducts, loadMoreProducts, loading]);

    return (
        <div className="product-list d-flex flex-column gap-3 p-2 align-items-center">
            <SortOptions />
            <FilterChips />
            <div className='d-flex flex-wrap gap-3 justify-content-center'>
                {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {loading && <div className="loading">Loading...</div>}
        </div>
    );
};

export default ProductList;
