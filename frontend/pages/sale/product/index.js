import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import defaultImage from "../../../public/images/default.png";
import Image from "next/image";

import CustomStyles from "@/components/CustomStyles";
import Add from "./add";
import Edit from "./[id]";
import GeneratePDF from "@/components/GeneratePDF";

const Product = () => {
  const [filterProduct, setFilterProduct] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const userInfo = useContext(UserContext);

  const columns = [
    {
      name: "Image",
      selector: (row) => {
        if (row.image !== null) {
          return (
            <img
              src={`http://localhost:8000${row.image}`}
              width={50}
              height={50}
            />
          );
        } else {
          return <Image src={defaultImage} width={50} height={50} />;
        }
      },
      width: "200px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "300px",
    },
    {
      name: "Category",
      selector: (row) => {
        if (categoryData !== undefined) {
          const filter = categoryData.filter((x) => x.id === row.category);
          if (filter !== undefined && filter.length > 0) {
            return filter[0].name;
          }
          return null;
        }
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Purchase Rate",
      selector: (row) => row.purchase_rate,
      sortable: true,
      width: "150px",
    },
    {
      name: "Sale Rate",
      selector: (row) => row.sale_rate,
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
                    description: row.description,
                    purchase_rate: row.purchase_rate,
                    sale_rate: row.sale_rate,
                    category_id: row.category,
                    image: row.image,
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
                  description: row.description,
                  purchase_rate: row.purchase_rate,
                  sale_rate: row.sale_rate,
                  category_id: row.category,
                  image: row.image,
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
      // sortable: true,
      // grow: 2,
      // width: "200px",
    },
  ];

  const callBack = async (childData) => {
    // console.log(childData);
    setProductData(childData);
  };

  const getCategory = async () => {
    const response = await fetch(`http://127.0.0.1:8000/category/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      setCategoryData(res);
    }
  };

  const getProduct = async () => {
    const response = await fetch(`http://127.0.0.1:8000/product/list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      setProductData(res);
    }
  };

  const handleChange = (e) => {
    const filtered = productData.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterProduct(filtered);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      getProduct();
      toast.success("Record is deleted successfully.");
      setShowModalDelete(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getCategory();
      getProduct();
      //   setUser(userData);
    }
  }, [userInfo]);

  return (
    <>
      <div className="flex flex-col items-center justify-center m-2 md:m-0 lg:m-0">
        <h3 className="text-center font-bold text-2xl mb-6 mt-32">
          Product List
        </h3>
        <div
          className="flex items-center bg-white border rounded-xl w-80 md:w-[600px] lg:w-[600px]  
        m-2 md:m-0 lg:m-0"
        >
          <input
            type="text"
            className="py-2 rounded-lg px-2 w-full outline-none"
            placeholder="Enter product name to search"
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
                onClick={() => setShowModal(true)}
              />
            </div>

            <h4 className="ml-2" onClick={() => setShowModal(true)}>
              Add Product
            </h4>
          </span>
        </div>
        <div className="container">
        <div className="flex mb-2">
            <GeneratePDF data={productData} id="product" />
          </div>
          {productData.length > 0 ? (
            <DataTable
              columns={columns}
              data={filterProduct.length >= 1 ? filterProduct : productData}
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
          title="Product Create"
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        >
          <Add handleCallBack={callBack} onClose={() => setShowModal(false)} />
        </Modal>
        <Modal
          title="Product Update"
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
          title="Product Delete"
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

export default Product;
