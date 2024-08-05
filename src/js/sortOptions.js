// SortOptions.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortOption = searchParams.get('sort') || 'createdAt'; // Valor por defecto

    const handleSortChange = (event) => {
        const option = event.target.value;
        searchParams.set('sort', option);
        setSearchParams(searchParams);
    };

    return (
        <div className="sort-options">
            <select value={sortOption} onChange={handleSortChange}>
                <option value="createdAt">Ordenar por fecha de creación</option>
                <option value="priceAsc">Precio: Bajo a alto</option>
                <option value="priceDesc">Precio: Alto a bajo</option>
            </select>
        </div>
    );
};

export default SortOptions;
