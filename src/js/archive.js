import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import ProductList from './loop';
import Filters from './filters';

const Archive = () => (
    <div className="page-single archive">
        {/* Sección 1 */}
        <section id="section-1" className="d-flex flex-column justify-content-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 d-flex flex-column gap-4 border border-2">
                        <Filters />
                    </div>
                    <div className="col-md-9 d-flex flex-column align-items-center justify-content-center gap-4 border border-2">
                        <ProductList />
                    </div>
                </div>
            </div>
        </section>

    </div>
);

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('archive');
    console.log(rootElement);

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            <Router basename="/archive.html">
                <Routes>
                    <Route path="/" element={<Archive />} />
                </Routes>
            </Router>
        );
    }
});

export default Archive;
