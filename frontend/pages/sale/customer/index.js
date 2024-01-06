import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Modal from "@/components/Modal";
import { toast } from "sonner";

import CustomStyles from "@/components/CustomStyles";
import Add from "./add";
import Edit from "./[id]";
import GeneratePDF from "@/components/GeneratePDF";

const Customer = () => {
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const userInfo = useContext(UserContext);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      width: "200px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      width: "300px",
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      width: "150px",
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
      width: "150px",
    },
    {
      name: "Create Date",
      selector: (row) => row.created_at,
      sortable: true,
      width: "200px",
    },
    {
      name: "ACTIONS",
      selector: (row) => (
        <div className="flex items-center justify-center">
          <div className="d-flex flex-row align-items-center">
            <div>
              <FiEdit
                className="m-1 text-cyan-500"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropUpdate"
                onClick={() => {
                  setData({
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    phone: row.phone,
                    address: row.address,
                    city: row.city,
                    country: row.country,
                    created_at: row.created_at,
                  });
                  setShowModalEdit(true);
                }}
                size={20}
              />
            </div>

            <div
              className="m-1"
              onClick={() => {
                setData({
                  id: row.id,
                  name: row.name,
                  email: row.email,
                  phone: row.phone,
                  address: row.address,
                  city: row.city,
                  country: row.country,
                  created_at: row.created_at,
                });
              }}
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
    },
  ];

  const callBack = async (childData) => {
    // console.log(childData);
    setCustomerData(childData);
  };

  const getCustomer = async () => {
    const response = await fetch(`http://127.0.0.1:8000/customer/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      setCustomerData(res);
    }
  };

  const handleChange = (e) => {
    const filtered = customerData.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterCustomer(filtered);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:8000/customer/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    // console.log(res);
    if (res) {
      // console.log("The record is deleted successfully");
      getCustomer();
      toast.success("Record is deleted successfully.");
      setShowModalDelete(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getCustomer();
    }
  }, [userInfo]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center font-bold text-2xl mb-6 mt-32">
          Customer List
        </h3>
        <div
          className="flex items-center bg-white border rounded-xl w-80 md:w-[600px] lg:w-[600px]  
        m-2 md:m-0 lg:m-0"
        >
          <input
            type="text"
            className="py-2 rounded-lg px-2 w-full outline-none"
            placeholder="Enter customer name to search"
            onChange={handleChange}
          />
          <span>
            <FiSearch size={25} />
          </span>
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
                onClick={() => setShowModal(true)}
              />
            </div>

            <h4 className="ml-2" onClick={() => setShowModal(true)}>
              Add Customer
            </h4>
          </span>
        </div>
        <div className="container">
        <div className="flex mb-2">
            <GeneratePDF data={customerData} id="customer" />
          </div>
          {customerData.length > 0 ? (
            <DataTable
              columns={columns}
              data={filterCustomer.length >= 1 ? filterCustomer : customerData}
              pagination
              customStyles={CustomStyles}
              // highlightOnHover
              dense
              // fixedHeader={!showModal && fixedHeader}
              // fixedHeaderScrollHeight="400px"
            />
          ) : (
            "There are no records to display"
          )}
        </div>
        <Modal
          title="Customer Create"
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        >
          <Add handleCallBack={callBack} onClose={() => setShowModal(false)} />
        </Modal>
        <Modal
          title="Customer Update"
          isVisible={showModalEdit}
          onClose={() => setShowModalEdit(false)}
        >
          <Edit
            handleCallBack={callBack}
            onClose={() => setShowModalEdit(false)}
            data={data}
          />
        </Modal>

        <Modal
          title="Customer Delete"
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

export default Customer;
