// FilterChips.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterChips = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const removeFilter = (filterType, value) => {
        const currentFilters = searchParams.get(filterType) ? searchParams.get(filterType).split(',') : [];
        const newFilters = currentFilters.filter(item => item !== value);
        if (newFilters.length > 0) {
            searchParams.set(filterType, newFilters.join(','));
        } else {
            searchParams.delete(filterType);
        }
        setSearchParams(searchParams);
    };

    const getChips = () => {
        const chips = [];
        const sortOptions = ['sort', 'order']; // Agregar aquí las keys de las opciones de orden

        searchParams.forEach((value, key) => {
            if (!sortOptions.includes(key)) {
                value.split(',').forEach(val => {
                    chips.push({ type: key, value: val });
                });
            }
        });

        return chips;
    };

    const chips = getChips();

    return (
        <div className="filter-chips d-flex gap-3">
            {chips.map((chip, index) => (
                <div key={index} className="chip">
                    {chip.value}
                    <button onClick={() => removeFilter(chip.type, chip.value)}>X</button>
                </div>
            ))}
        </div>
    );
};

export default FilterChips;
