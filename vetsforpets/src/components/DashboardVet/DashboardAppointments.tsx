//RESPONSIVE//
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

  return (
    <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Turnos registrados</h2>
      <hr className="my-4 border-gray-300" />

      <div className="space-y-6">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center w-full gap-4 p-4 mx-auto border rounded-lg shadow-sm sm:w-3/4 md:w-2/3 lg:w-1/2"
            >
              <input type="checkbox" className="w-5 h-5 rounded-full" />
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


// "use client";

// import { useState } from "react";

// interface Appointment {
//   id: string;
//   time: string;
//   userName: string;
//   petName: string;
// }

// export function DashboardAppointments() {
//   const [appointments] = useState<Appointment[]>([]);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold">Turnos registrados</h2>
//       <hr className="my-4 border-gray-300" />

//       <div className="space-y-10">
//         {appointments.length > 0 ? (
//           appointments.map((appointment) => (
//             <div
//               key={appointment.id}
//               className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
//             >
//               <input type="checkbox" className="w-5 h-5 rounded-full" />
//               <div>
//                 <p className="text-lg font-semibold">{appointment.time}</p>
//                 <p className="text-gray-600">
//                   {appointment.userName} - {appointment.petName}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No hay turnos registrados.</p>
//         )}
//       </div>
//     </div>
//   );
// }
