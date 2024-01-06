import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Modal from "@/components/Modal";
import { toast } from "sonner";
import { useRouter } from "next/router";

import CustomStyles from "@/components/CustomStyles";
import { CgDetailsMore } from "react-icons/cg";
const PurchaseMaster = () => {
  const [filterPurchase, setFilterPurchase] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [data, setData] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const userInfo = useContext(UserContext);
  const router = useRouter();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "200px",
    },

    {
      name: "Supplier",
      selector: (row) => {
        if (supplierData !== undefined) {
          const filter = supplierData.filter((x) => x.id === row.supplier);
          if (filter !== undefined && filter.length > 0) {
            return filter[0].name;
          }
          return null;
        }
      },
      sortable: true,
      width: "300px",
    },
    {
      name: "Purchase Amount",
      selector: (row) => <div>€ {row.purchase_amount}</div>,
      sortable: true,
      width: "200px",
    },
    {
      name: "Create Date",
      selector: (row) => row.created_at,
      sortable: true,
      width: "350px",
    },
    {
      name: "ACTIONS",
      selector: (row) => (
        <div className="flex items-center justify-center">
          <div className="d-flex flex-row align-items-center">
            <div>
              <CgDetailsMore
                className="m-1 text-cyan-500"
                onClick={() => router.push(`/purchase/detail/${row.id}`)}
                size={25}
              />
            </div>

            <div
              className="m-1"
              onClick={() => router.push(`/purchase/detail/${row.id}`)}
            ></div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div>
              <FiEdit
                className="m-1 text-cyan-500"
                onClick={() => router.push(`/purchase/${row.id}`)}
                size={20}
              />
            </div>

            <div
              className="m-1"
              onClick={() => router.push(`/purchase/${row.id}`)}
            ></div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div>
              <RiDeleteBinLine
                size={22}
                className="m-1 text-rose-700"
                onClick={() => {
                  setData({
                    id: row.id,
                  });
                  setShowModalDelete(true);
                }}
              />
            </div>
            <div
              className="m-1 bg-red-700"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropDelete"
              onClick={() => {
                setData({
                  id: row.id,
                });
              }}
            ></div>
          </div>
        </div>
      ),
      // sortable: true,
      // grow: 2,
      // width: "300px",
    },
  ];

  const callBack = async (childData) => {
    // console.log(childData);
    setPurchaseData(childData);
  };

  const getSupplier = async () => {
    const response = await fetch(`http://127.0.0.1:8000/supplier/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      setSupplierData(res);
    }
  };

  const getPurchase = async () => {
    const response = await fetch(`http://127.0.0.1:8000/purchase/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      setPurchaseData(res);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value.toLowerCase());
    if (e.target.value.toLowerCase() === "") {
      setFilterPurchase(purchaseData);
    } else {
      const supplier = supplierData.filter((sup) => {
        return sup.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      if (supplier.length > 0) {
        const filtered = purchaseData.filter((x) => {
          return x.supplier == supplier[0].id;
        });
        setFilterPurchase(filtered);
      }
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:8000/purchase/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log(response.status)
    if ((await response.status) == 204) {
      getPurchase();
      toast.success("Record is deleted successfully.");
      setShowModalDelete(false);
    } else {
      toast.error("There are issues to delete the record.");
    }
  };

  useEffect(() => {
    if (userInfo) {
      getSupplier();
      getPurchase();
    }
  }, [userInfo]);

  return (
    <>
      <div className="flex flex-col items-center justify-center m-2 md:m-0 lg:m-0">
        <h3 className="text-center font-bold text-2xl mb-6 mt-32">
          Purchase Invoice List
        </h3>
        <div
          className="flex items-center bg-white border rounded-xl w-80 md:w-[600px] lg:w-[600px]  
        m-2 md:m-0 lg:m-0"
        >
          <input
            type="text"
            className="py-2 rounded-lg px-2 w-full outline-none"
            placeholder="Enter supplier name to search"
            // value={search}
            onChange={handleChange}
          />
          <FiSearch size={30} />
        </div>

        <div className="container m-5">
          <span
            className="flex items-center text-semibold"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <div className="text-green-700">
              <IoIosAddCircleOutline
                size={30}
                onClick={(e) => router.push("/purchase/add")}
              />
            </div>

            <h4 className="ml-2" onClick={() => router.push("/purchase/add")}>
              Add Purchase Invoice
            </h4>
          </span>
        </div>
        <div className="container">
          {purchaseData.length > 0 ? (
            <DataTable
              columns={columns}
              data={filterPurchase.length >= 1 ? filterPurchase : purchaseData}
              pagination
              customStyles={CustomStyles}
              // highlightOnHover
              dense
              // fixedHeader={!showModal && fixedHeader}
              fixedHeaderScrollHeight="400px"
              theme="solarized"
            />
          ) : (
            "There are no records to display"
          )}
        </div>

        <Modal
          title="Purchase Invoice Delete"
          isVisible={showModalDelete}
          onClose={() => setShowModalDelete(false)}
        >
          <div className="flex items-center text-xlg p-4">
            <span>Do you realy want to delete this record? </span>
            <button
              onClick={() => handleDelete(data.id)}
              className="py-1 bg-red-600 rounded text-sm text-white px-2 ml-2 mr-2 w-24"
            >
              Delete
            </button>
            <button
              onClick={() => setShowModalDelete(false)}
              className="py-1 bg-cyan-600 rounded text-sm text-white px-2 w-24"
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default PurchaseMaster;
