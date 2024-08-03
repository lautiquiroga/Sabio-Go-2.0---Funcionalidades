// SortOptions.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortOption = searchParams.get('sort') || 'createdAt'; // Valor por defecto

    const handleSortChange = (option) => {
        searchParams.set('sort', option);
        setSearchParams(searchParams);
    };

    return (
        <div className="sort-options">
            <button
                className={sortOption === 'createdAt' ? 'active' : ''}
                onClick={() => handleSortChange('createdAt')}
            >
                Ordenar por fecha de creación
            </button>
            <button
                className={sortOption === 'priceAsc' ? 'active' : ''}
                onClick={() => handleSortChange('priceAsc')}
            >
                Precio: Bajo a alto
            </button>
            <button
                className={sortOption === 'priceDesc' ? 'active' : ''}
                onClick={() => handleSortChange('priceDesc')}
            >
                Precio: Alto a bajo
            </button>
        </div>
    );
};

export default SortOptions;
