import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Add from "./add";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


import CustomStyles from "@/components/CustomStyles";
import Edit from "./[id]";
import GeneratePDF from "@/components/GeneratePDF";

const Category = () => {
  const [filterCategory, setFilterCategory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const userInfo = useContext(UserContext);
 

  const columns = [
    {
      name: "ID#",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "300px",
    },
    {
      name: "Create Date",
      selector: (row) => row.created_at,
      sortable: true,
      width: "300px",
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
                    description: row.description,
                    created_at:row.created_at,
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
                  description: row.description,
                  created_at:row.created_at,
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
    console.log(childData);
    setCategoryData(childData);
  };


  const getCategory = async () => {
    const response = await fetch(`http://127.0.0.1:8000/category/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);
    if (res) {
      setCategoryData(res);
    }
  };

  const handleChange = (e) => {
    const filtered = categoryData.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterCategory(filtered);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:8000/category/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    console.log(res);
    if (res) {
      console.log("The record is deleted successfully");
      getCategory();
      toast.success("Record is deleted successfully.")
      setShowModalDelete(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getCategory();
      //   setUser(userData);
    }
  }, [userInfo]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center font-bold text-2xl mb-6 mt-32">
          Category List
        </h3>
        <div className="flex items-center bg-white border rounded-xl w-80 md:w-[600px] lg:w-[600px]  
        m-2 md:m-0 lg:m-0">
          <input
            type="text"
            className="py-2 rounded-lg px-2 w-full outline-none"
            placeholder="Enter category name to search"
            // value={search}
            onChange={handleChange}
          />
          <span>
            <FiSearch size={30} />
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
              Add Category
            </h4>
          </span>
        </div>
        <div className="container">
        <div className="flex mb-2">
            <GeneratePDF data={categoryData} id="category" />
          </div>
          {categoryData.length > 0 ? (
            <DataTable
              columns={columns}
              data={filterCategory.length >= 1 ? filterCategory : categoryData}
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
          title="Category Create"
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        >
          <Add handleCallBack={callBack} onClose={() => setShowModal(false)} />
        </Modal>
        <Modal
          title="Category Update"
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
          title="Category Delete"
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

export default Category;
