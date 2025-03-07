import { IStripeMetricsFinancialResponse, IStripeMetricsTransactionResponse, IStripeMetricsUserActiveResponse } from "@/interfaces/stripeTypes";
import { fetchFinancialData, fetchTransactionData, fetchUsersActiveData } from "@/services/servicesStripe";
import Image from "next/image";
import { useState, useEffect } from "react";

const StripeMetrics = ({token}:{token: string}) => {
  const [balance, setBalance] = useState<IStripeMetricsFinancialResponse>();
  const [transactions, setTransactions] = useState<IStripeMetricsTransactionResponse[] >([]);
  const [usersActive, setUsersActive] = useState<IStripeMetricsUserActiveResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("balance");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceRes: IStripeMetricsFinancialResponse | void = await fetchFinancialData(token)
        const transactionsRes: IStripeMetricsTransactionResponse[] | void = await fetchTransactionData(token)
        const usersActiveRes:IStripeMetricsUserActiveResponse[] = await fetchUsersActiveData(token)
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
          <p className="mb-4 text-2xl font-bold text-customBrown">
            Cargando...
          </p>
          <Image src="/loading.svg" width={100} height={100} alt="cargando" />
        </div>
      </div>
    );
  } else {

    return (
      <div className="w-2/3 h-screen p-6 bg-[#FFFAD7]">
      <div className="flex border-b border-[#606C38]">
        <button className={`p-3 ${activeTab === "balance" ? "bg-[#BC6C25] text-white" : "bg-white"}`} onClick={() => setActiveTab("balance")}>Balance Total</button>
        <button className={`p-3 ${activeTab === "transactions" ? "bg-[#BC6C25] text-white" : "bg-white"}`} onClick={() => setActiveTab("transactions")}>Historial de Transacciones</button>
        <button className={`p-3 ${activeTab === "users" ? "bg-[#BC6C25] text-white" : "bg-white"}`} onClick={() => setActiveTab("users")}>Usuarios Activos</button>
      </div>
      <div className="p-4">
        {activeTab === "balance" && (
          <div className="bg-[#BC6C25] text-white text-center p-6 rounded-lg">
            <h2 className="text-4xl">Balance Total</h2>
            <p className="text-5xl font-bold">${balance?.available[0].amount || "Cargando..."}</p>
          </div>
        )}
        {activeTab === "transactions" && (
          <div className="p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold">Historial de Transacciones</h2>
            <table className="w-full mt-4 border border-[#606C38]">
              <thead className="bg-[#606C38] text-white">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Monto</th>
                  <th className="p-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 text-center">{tx.id}</td>
                    <td className="p-2 text-center">${tx.amount}</td>
                    <td className="p-2 text-center">{new Date(tx.amount).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "users" && (
          <div className="p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold">Usuarios Activos</h2>
            <table className="w-full mt-4 border border-[#606C38]">
              <thead className="bg-[#606C38] text-white">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {usersActive.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 text-center">{user.name}</td>
                    <td className="p-2 text-center">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
}

export default StripeMetrics;
