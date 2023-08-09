import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { FormPage } from './pages/form/Form';

export const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <FormPage error errorMessage="No UUID found" />
                        }
                    />
                    <Route path="/id/:id" element={<FormPage />} />
                    <Route
                        path="*"
                        element={<FormPage error errorMessage="Invalid UUID" />}
                    />
                </Route>
            </Routes>
        </>
    );
};
