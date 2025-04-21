"use client"

import React, { useState, useEffect } from 'react';

const CalendlyUserComponent = () => {
    const [userUri, setUserUri] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const accessToken = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQ1MTc2MTY4LCJqdGkiOiI5OGNlMzQ3MS1iMmY1LTRiNzgtYWQzOC05Zjk5OGUwMmQ2OGMiLCJ1c2VyX3V1aWQiOiIxMzY5ZWJjMC03NjZkLTQwOGMtYTg4YS0xMDkyNDU4MDY1YmIifQ.eLZbPEjv6Hk2ahSmUHxKF_TYgRRTAMVZLvIcd_Hr098kp-9b6RgW7UdbZjXcJNWV3FKPDRiL1TdNakkGDRNTAw"
    const getCalendlyUserUri = async (accessToken: string): Promise<string> => {
        const response = await fetch('https://api.calendly.com/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener el usuario de Calendly');
        }

        const data = await response.json();
        return data.resource.uri;  // Aquí obtienes el calendlyUserUri
    };

    useEffect(() => {
        getCalendlyUserUri(accessToken)
            .then((uri) => {
                setUserUri(uri);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [accessToken]);  // Se ejecuta solo una vez al montar el componente

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Calendly User URI</h2>
            <p>{userUri}</p>
        </div>
    );
};

export default CalendlyUserComponent;
