import { useState, useEffect } from 'react';
import DashboardUI from './DashboardUI';
import { IVetCredentials } from '@/services/interfaces';

const DashboardData = () => {
    const [veterinaria, setVeterinaria] = useState<IVetCredentials | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/veterinaria')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
            .then((data: IVetCredentials) => {
                setVeterinaria(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <DashboardUI veterinaria={veterinaria!} />;
};

export default DashboardData;
