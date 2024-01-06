import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiSearch } from "react-icons/fi";
import GeneratePDF from "@/components/GeneratePDF";

const CustomStyle = {
  hieght: "100%",
  rows: {
    style: {
      fontSize: "15px",
      paddingBottom: "10px",
      paddingTop: "10px",
      backgroundColor: "#f4f4f5",
      "&:hover": {
        backgroundColor: "#a5f3fc",
      },
    },
  },
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "bold",
      paddingBottom: "20px",
      paddingTop: "20px",
      backgroundColor: "#22d3ee",
      color: "#ffffff",
    },
  },
};

const Stock = () => {
  const [filterProduct, setFilterProduct] = useState([]);
  const [stock, setStock] = useState([]);
  const userInfo = useContext(UserContext);

  const columns = [
    {
      name: "ID#",
      selector: (row) => row.product_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Name",
      selector: (row) => {
        if (row.stock_qty < 5) {
          return <div className="text-rose-500">{row.product_name}</div>;
        }
        return <div>{row.product_name}</div>;
      },
      sortable: true,
      width: "350px",
    },
    {
      name: "Qty",
      selector: (row) => {
        if (row.stock_qty < 5) {
          return <div className="text-rose-500">{row.stock_qty}</div>;
        }
        return <div>{row.stock_qty}</div>;
      },
      sortable: true,
      width: "300px",
    },
  ];

  const getStock = async () => {
    const response = await fetch(`http://127.0.0.1:8000/sale/stock/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      setStock(res);
    }
  };

  const handleChange = (e) => {
    const filtered = stock.filter((x) => {
      return x.product_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilterProduct(filtered);
  };

  useEffect(() => {
    if (userInfo) {
      getStock();
    }
  }, [userInfo]);

  return (
    <>
      <div className="grid grid-cols-1 overflow-x-auto">
        <div className="flex flex-col items-center justify-center  m-2 md:m-0 lg:m-0">
          <h3 className="text-center font-bold text-2xl mb-6 mt-32">
            Invenvtory Stock
          </h3>
          <div
            className="flex items-center bg-white border rounded-xl w-80 md:w-[600px] lg:w-[600px]  
        m-2 md:m-0 lg:m-0"
          >
            <input
              type="text"
              className="py-2 rounded-lg px-2 w-full outline-none"
              placeholder="Enter product name to search"
              onChange={handleChange}
            />
            <span>
              <FiSearch size={30} />
            </span>
          </div>
          <div className="flex justify-end md:w-[800px] lg:w-[800px] mt-4">
            <GeneratePDF data={stock} id="stock" />
          </div>

          <div className="container mt-4 md:w-[800px] lg:w-[800px]">
            {stock.length > 0 ? (
              <DataTable
                columns={columns}
                data={filterProduct.length >= 1 ? filterProduct : stock}
                customStyles={CustomStyle}
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

export default Stock;
