import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Filters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Función para crear parámetros de los filtros para la URL, con el nombre (filterType) y el value. Ejemplo: ?destacados=true.
    // Se usa en los onChange de los checkboxes.
    const handleFilterChange = (filterType, value) => {
        const currentFilters = searchParams.get(filterType) ? searchParams.get(filterType).split(',') : [];
        if (currentFilters.includes(value)) {
            const newFilters = currentFilters.filter(item => item !== value);
            if (newFilters.length > 0) {
                searchParams.set(filterType, newFilters.join(','));
            } else {
                searchParams.delete(filterType);
            }
        } else {
            currentFilters.push(value);
            searchParams.set(filterType, currentFilters.join(','));
        }
        setSearchParams(searchParams);
    };

    const isChecked = (filterType, value) => {
        const currentFilters = searchParams.get(filterType) ? searchParams.get(filterType).split(',') : [];
        return currentFilters.includes(value);
    };

    return (
        <>
            <p className="m-0">Filters</p>
            {/* <ul className="p-0">
                <li>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChecked('destacados', 'true')}
                            onChange={() => handleFilterChange('destacados', 'true')}
                        />
                        Destacados
                    </label>
                </li>
                <li>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChecked('plan', 'ahora12')}
                            onChange={() => handleFilterChange('plan', 'ahora12')}
                        />
                        Ahora 12
                    </label>
                </li>
            </ul> */}

            <div className="d-flex flex-column">
                <p className="m-0">Categorías</p>
                <ul className="p-0">
                    {['CAT A', 'CAT B'].map(category => (
                        <li key={category}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked('category', category)}
                                    onChange={() => handleFilterChange('category', category)}
                                />
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="d-flex flex-column">
                <p className="m-0">Marcas</p>
                <ul className="p-0">
                    {['ATT1 A', 'ATT1 B'].map(brand => (
                        <li key={brand}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked('marca', brand)}
                                    onChange={() => handleFilterChange('marca', brand)}
                                />
                                {brand}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Filters;
