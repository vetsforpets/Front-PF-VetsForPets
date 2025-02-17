"use client";

import { useState } from "react";

interface Appointment {
  id: string;
  time: string;
  userName: string;
  petName: string;
}

export function DashboardAppointments() {
  const [appointments] = useState<Appointment[]>([]);

  // useEffect(() => {

  //     const fetchAppointments = async () => {
  //         try {
  //             const response = await fetch("/api/appointments");
  //             const data = await response.json();
  //             setAppointments(data);
  //         } catch (error) {
  //             console.error("Error al cargar los turnos:", error);
  //         }
  //     };

  //     fetchAppointments();
  // }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">Turnos registrados</h2>
      <hr className="my-4 border-gray-300" />

      <div className="space-y-10">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
            >
              <input type="checkbox" className="rounded-full w-5 h-5" />
              <div>
                <p className="text-lg font-semibold">{appointment.time}</p>
                <p className="text-gray-600">
                  {appointment.userName} - {appointment.petName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay turnos registrados.</p>
        )}
      </div>
    </div>
  );
}
