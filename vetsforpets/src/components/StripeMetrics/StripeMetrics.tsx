import { IDTOStripeMetricsTransactionResponse, IDTOStripeMetricsUserActiveResponse, IStripeMetricsFinancialResponse } from "@/interfaces/stripeTypes";
import { fetchFinancialData, fetchTransactionData, fetchUsersActiveData } from "@/services/servicesStripe";
import Image from "next/image";
import { useState, useEffect } from "react";

const StripeMetrics = ({ token }: { token: string }) => {
  const [balance, setBalance] = useState<IStripeMetricsFinancialResponse>();
  const [transactions, setTransactions] = useState<IDTOStripeMetricsTransactionResponse>({
    data: [
      {
        id: "",
        amount: "",
        net: "",
      },
    ],
  });
  const [usersActive, setUsersActive] = useState<IDTOStripeMetricsUserActiveResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("balance");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceRes: IStripeMetricsFinancialResponse | void = await fetchFinancialData(token);
        const transactionsRes: IDTOStripeMetricsTransactionResponse = await fetchTransactionData(token);
        const usersActiveRes: IDTOStripeMetricsUserActiveResponse[] = await fetchUsersActiveData(token);
        if (!!balanceRes && !!transactionsRes && !!usersActive) {
          setBalance(balanceRes);
          setTransactions(transactionsRes);
          setUsersActive(usersActiveRes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-4">
          <p className="mb-4 text-2xl font-bold text-[#BC6C25]">Cargando...</p>
          <Image src="/loading.svg" width={100} height={100} alt="cargando" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen p-4 lg:p-6 bg-[#FFFAD7] overflow-auto">
      {/* Pestañas */}
      <div className="flex flex-wrap border-b border-[#606C38] rounded-t-3xl overflow-hidden">
        <button
          className={`flex-1 p-3 text-sm lg:text-base transition-all duration-300 ease-in-out ${
            activeTab === "balance" ? "bg-[#BC6C25] text-white" : "bg-white hover:bg-[#BC6C25] hover:text-white"
          }`}
          onClick={() => setActiveTab("balance")}
        >
          Balance Total
        </button>
        <button
          className={`flex-1 p-3 text-sm lg:text-base transition-all duration-300 ease-in-out ${
            activeTab === "transactions" ? "bg-[#BC6C25] text-white" : "bg-white hover:bg-[#BC6C25] hover:text-white"
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          Historial de Transacciones
        </button>
        <button
          className={`flex-1 p-3 text-sm lg:text-base transition-all duration-300 ease-in-out ${
            activeTab === "users" ? "bg-[#BC6C25] text-white" : "bg-white hover:bg-[#BC6C25] hover:text-white"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Usuarios Activos
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="p-4 pt-10">
        {activeTab === "balance" && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Tarjeta de Balance Total */}
            <div className="bg-[#BC6C25] text-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center">
              <h2 className="mb-4 text-2xl font-bold lg:text-3xl">Balance Total</h2>
              <div className="bg-white text-[#BC6C25] p-4 rounded-2xl w-full text-center">
                <p className="text-xl font-bold lg:text-xl">${balance?.available[0].amount}</p>
              </div>
            </div>

            {/* Tarjeta de Pendiente */}
            <div className="bg-[#BC6C25] text-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center">
              <h2 className="mb-4 text-2xl font-bold lg:text-3xl">Pendiente</h2>
              <div className="bg-white text-[#BC6C25] p-4 rounded-2xl w-full text-center">
                <p className="text-xl font-bold lg:text-xl">${balance?.pending[0].amount}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="p-6 bg-white shadow-lg rounded-3xl">
            <h2 className="mb-6 text-xl font-bold lg:text-2xl">Historial de Transacciones</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-[#606C38] rounded-3xl overflow-hidden">
                <thead className="bg-[#606C38] text-white">
                  <tr>
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Monto</th>
                    <th className="p-4 text-left">Neto</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.data.map((tx, index) => (
                    <tr key={index} className="transition-all duration-300 ease-in-out border-t hover:bg-gray-100">
                      <td className="p-4">{tx.id}</td>
                      <td className="p-4">${tx.amount}</td>
                      <td className="p-4">${tx.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="p-6 bg-white shadow-lg rounded-3xl">
            <h2 className="mb-6 text-xl font-bold lg:text-2xl">Usuarios Activos</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-[#606C38] rounded-3xl overflow-hidden">
                <thead className="bg-[#606C38] text-white">
                  <tr>
                    <th className="p-4 text-left">Nombre</th>
                    <th className="p-4 text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {usersActive.map((user, index) => (
                    <tr key={index} className="transition-all duration-300 ease-in-out border-t hover:bg-gray-100">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeMetrics;