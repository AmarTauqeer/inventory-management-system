import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiSearch } from "react-icons/fi";
import GeneratePDF from "@/components/GeneratePDF";
import CustomStylesStock from "@/components/CustomStylesStock";
import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sale And Purhase Month Wise (2024)",
    },
  },
};

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalproducts, setTotalproducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [monthWiseTotalSale, setMonthWiseTotalSale] = useState([]);
  const [monthWiseTotalPurchase, setMonthWiseTotalPurchase] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [lastSalePurchase, setLastSalePurchase] = useState([]);
  const userInfo = useContext(UserContext);
  const router = useRouter();

  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Sale",
        data: monthWiseTotalSale.map((m) => m.amount),
        backgroundColor: "#65a30d",
      },
      {
        label: "Purchase",
        data: monthWiseTotalPurchase.map((m) => m.amount),
        backgroundColor: "#22d3ee",
      },
    ],
  };

  const columns = [
    {
      name: "ID#",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "DATE",
      selector: (row) => row.date,
      sortable: true,
      width: "250px",
    },
    {
      name: "TYPE",
      selector: (row) => row.type,
      sortable: true,
      width: "150px",
    },
    {
      name: "CUSTOMER/SUPPLIER",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "AMOUNT",
      selector: (row) => <div>€ {row.amount}</div>,
      sortable: true,
      width: "100px",
    },
    {
      name: "DETAIL",
      selector: (row) => {
        if (row.type == "sale") {
          return (
            <div
              className="text-blue-400 underline cursor-pointer hover:text-blue-800"
              onClick={() => router.push(`/sale/detail/${row.id}`)}
            >
              detail
            </div>
          );
        } else {
          return (
            <div
              className="text-blue-400 underline cursor-pointer hover:text-blue-800"
              onClick={() => router.push(`/purchase/detail/${row.id}`)}
            >
              detail
            </div>
          );
        }
      },
      width: "100px",
    },
  ];

  const getLastSalePurchase = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/sale/last-sale-purchase/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    console.log(res);
    if (res) {
      setLastSalePurchase(res);
    }
  };

  const totalCustomer = async () => {
    const response = await fetch(`http://127.0.0.1:8000/customer/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      setTotalCustomers(res.length);
    }
  };

  const totalSale = async () => {
    const response = await fetch(`http://127.0.0.1:8000/sale/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    let total_amount = 0.0;
    if (res) {
      setTotalSales(res.length);
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element.sale_amount);
        total_amount =
          (parseFloat(total_amount).toFixed(2) * 100 +
            parseFloat(element.sale_amount).toFixed(2) * 100) /
          100;
      }
      setTotalSaleAmount(parseFloat(total_amount).toFixed(2));
    }
  };

  const totalStock = async () => {
    const response = await fetch(`http://127.0.0.1:8000/sale/stock/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      setTotalStocks(res.length);
    }
  };

  const totalPurchase = async () => {
    const response = await fetch(`http://127.0.0.1:8000/purchase/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    let total_amount = 0.0;
    total_amount = parseFloat(total_amount).toFixed(2);
    if (res) {
      setTotalPurchases(res.length);
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element.purchase_amount);
        total_amount =
          (parseFloat(total_amount).toFixed(2) * 100 +
            parseFloat(element.purchase_amount).toFixed(2) * 100) /
          100;
      }
      setTotalPurchaseAmount(parseFloat(total_amount).toFixed(2));
    }
  };

  const totalSupplier = async () => {
    const response = await fetch(`http://127.0.0.1:8000/supplier/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      setTotalSuppliers(res.length);
    }
  };

  const totalProduct = async () => {
    const response = await fetch(`http://127.0.0.1:8000/product/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      setTotalproducts(res.length);
    }
  };

  const totalSaleMonthWise = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/sale/month-wise-total-sale/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    console.log(res);
    if (res) {
      setMonthWiseTotalSale(res);
    }
  };

  const totalPurchaseMonthWise = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/sale/month-wise-total-purchase/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    // console.log(res);
    if (res) {
      setMonthWiseTotalPurchase(res);
    }
  };
  useEffect(() => {
    if (userInfo) {
      getLastSalePurchase();
      totalCustomer();
      totalSale();
      totalSupplier();
      totalPurchase();
      totalStock();
      totalProduct();
      totalSaleMonthWise();
      totalPurchaseMonthWise();
    }
  }, [userInfo]);

  return (
    <>
      <div className="grid grid-cols-1 overflow-x-auto">
        <div className="flex flex-col items-center justify-center  m-2 md:m-0 lg:m-0">
          <div className="w-96 m-auto md:w-[800px] lg:w-[800px] p-4 border rounded-lg bg-white mb-6 mt-36 overflow-x-auto">
            <Bar options={options} data={data} />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-10">
            <div
              onClick={() => router.push("/sale/customer")}
              className="flex justify-center items-center w-[300px] h-64 border rounded-lg text-xl font-bold text-white bg-cyan-500 cursor-pointer"
            >
              Customers [{totalCustomers}]
            </div>
            <div
              onClick={() => router.push("/purchase/supplier")}
              className="flex justify-center items-center w-[300px] h-64 border rounded-lg text-xl font-bold text-white bg-green-400 cursor-pointer"
            >
              Supplier [{totalSuppliers}]
            </div>
            <div
              onClick={() => router.push("/sale/product")}
              className="flex justify-center items-center w-[300px] h-64 border rounded-lg text-xl font-bold text-white bg-red-600 cursor-pointer"
            >
              Products [{totalproducts}]
            </div>
            <div
              onClick={() => router.push("/stock")}
              className="flex justify-center items-center w-[300px] h-64 border rounded-lg text-xl font-bold text-white bg-slate-500 cursor-pointer"
            >
              Stock [{totalStocks}]
            </div>
            <div
              onClick={() => router.push("/sale")}
              className="flex flex-col justify-center items-center w-[300px] h-64 border rounded-lg text-xl font-bold text-white bg-blue-300 cursor-pointer"
            >
              <div>Sale [{totalSales}]</div>
              <div>Sales Amount [€ {totalSaleAmount}]</div>
            </div>
            <div
              onClick={() => router.push("/purchase")}
              className="flex flex-col justify-center items-center w-[300px] h-64 border rounded-lg text-xl font-bold text-white bg-orange-600 cursor-pointer"
            >
              <div>Purchase [{totalPurchases}]</div>
              <div>Purchase Amount[€ {totalPurchaseAmount}]</div>
            </div>
          </div>

          <div>
            <h3 className="text-center font-bold text-2xl mt-6">
              Recent Sale And Purchase
            </h3>
          </div>
          <div className="container mt-4 md:w-[1000px] lg:w-[1000px]">
            {lastSalePurchase.length > 0 ? (
              <DataTable
                columns={columns}
                data={lastSalePurchase}
                customStyles={CustomStylesStock}
                pagination
              />
            ) : (
              "There are no records to display"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
