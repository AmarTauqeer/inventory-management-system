import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "sonner";
import PurchaseDetailUpdate from "@/components/PurchaseDetailUpdate";
import { useParams } from "next/navigation";

const Edit = (props) => {
  const params = useParams();
  let id = "";
  if (params) {
    // console.log(params.id);
    id = params.id;
  }
  const userInfo = useContext(UserContext);
  const router = useRouter();
  const [supplierData, setSupplierData] = useState([]);
  const [valueDate, setValueDate] = useState(new Date());
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [purchaseDetailData, setPurchaseDetailData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      created_at: new Date(),
      purchase_amount: 0,
      supplier: "",
    },
  });

  const onSubmit = async (data) => {
    let dateISO;
    if (valueDate.length === 27) {
      dateISO = valueDate;
    } else {
      dateISO = valueDate.toISOString();
    }

    const fd = new FormData();
    fd.append("created_at", dateISO);
    fd.append("supplier", parseInt(data.supplier));
    fd.append("purchase_amount", parseInt(data.purchase_amount));

    const requestOptions = {
      method: "PUT",
      credentials: "include",
      body: fd,
    };

    // console.log(requestOptions);

    const response = await fetch(
      `http://127.0.0.1:8000/purchase/update/${id}`,
      requestOptions
    );
    const result = await response.json();
    // console.log(result);
    if (result) {
      let id = result.id;
      const addPurchaseDetail = async (id) => {
        if (purchaseItems.length > 0) {
          let purchase_array = [];
          for (let index = 0; index < purchaseItems.length; index++) {
            const element = purchaseItems[index];
            let data = {
              purchase_id: id,
              product: parseInt(element.product),
              qty: element.qty,
              price: parseFloat(element.price).toFixed(2),
              amount_per_product: parseFloat(
                element.amount_per_product
              ).toFixed(2),
            };
            purchase_array.push(data);
            // console.log(data);
          }
          const response = await fetch(
            `http://127.0.0.1:8000/purchase/detail-update/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(purchase_array),
            }
          );
          const res = await response.json();

          if (res) {
            console.log("purchase detail is updated succesfully.");
          }
        }
      };
      addPurchaseDetail(id);
    }
    toast.success("Record saved successfully.");
    router.push("/purchase");
  };

  const getSupplier = async () => {
    const response = await fetch(`http://127.0.0.1:8000/supplier/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    if (res) {
      setSupplierData(res);
    }
  };

  const getPurchase = async () => {
    const response = await fetch(`http://127.0.0.1:8000/purchase/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      let filterPurchase = res.filter((r) => r.id == id);
      filterPurchase = filterPurchase[0];
      // console.log(filterPurchase);
      setPurchaseData(filterPurchase);
      setValue("supplier", filterPurchase.supplier);
      setValue("created_at", filterPurchase.created_at);
      setValue("purchase_amount", filterPurchase.purchase_amount);
      setValueDate(filterPurchase.created_at)
    }
  };

  const getPurchaseDetail = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/purchase/detail-list/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const res = await response.json();
    // console.log(res);
    let filterPurchase = [];
    if (res) {
      filterPurchase = res.filter((r) => r.purchase_id == parseInt(id));
    }
    // console.log(filterPurchase);
    setPurchaseDetailData(filterPurchase);
  };

  useEffect(() => {
    if (userInfo) {
      getSupplier();
      getPurchase();
      getPurchaseDetail();
    }
  }, [userInfo, props]);

  const detailData = (values) => {
    // console.log(values);
    let total = 0;
    let detail = [];
    values.map((x) => {
      // console.log("hi");
      let result = {
        purchase_id: id,
        product: x.product,
        qty: parseInt(x.qty),
        price: parseFloat(x.price),
        amount_per_product: x.qty * x.price,
      };
      // console.log(result)

      let amt = x.qty * x.price;
      total += amt;
      // console.log(total);
      detail.push(result);
    });

    setValue("purchase_amount", total);
    // console.log(detail);
    setPurchaseItems(detail);
  };
  // console.log(purchaseItems);
  return (
    <>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center text-xl font-bold mt-24 mb-3">
            Purchase Invoice Update
          </h3>
          <form>
            <div className="flex flex-col m-2">
              <div className="flex items-center m-2 outline-none">
                <span className="w-24 md:w-48 lg:48 text-xs md:text-sm">
                  Date
                </span>
                <DateTimePicker
                  placeholder="Enter create date."
                  onChange={setValueDate}
                  value={valueDate}
                  name="created_at"
                  className="py-0 md:py-1 ml-2 md:ml-0 text-xs md:text-sm w-24 md:w-2/3 lg:w-2/3"
                />
              </div>

              <div className="flex items-center m-2">
                <span className="w-24 md:w-48 text-xs md:text-sm">
                  Supplier
                </span>
                <select
                  className="outline-none ml-2 md:ml-0 text-xs md:text-sm flex rounded md:py-1 py-2 shadow-sm ring-1 ring-inset w-48 md:w-2/3 lg:w-2/3 
                    ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  {...register("supplier", {
                    required: "Supplier is required.",
                  })}
                >
                  <option value="">Select...</option>
                  {supplierData !== undefined &&
                    supplierData.map((x) => {
                      return (
                        <>
                          <option value={x.id}>{x.name}</option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="flex items-center m-2">
                <span className="w-24 md:w-48 text-xs md:text-sm">
                  Purchase Amount
                </span>

                <input
                  readOnly
                  className="w-48 md:w-2/3 ml-2 md:ml-0 border border-solid border-gray-700 rounded py-1 px-1 
                text-sm text-end font-bold outline-none"
                  {...register("purchase_amount", {})}
                />
              </div>
              <div className="flex justify-center items-center m-2 mt-8">
                <button
                  type="button"
                  className="bg-slate-300 rounded py-1 px-3 mr-1 hover:bg-slate-800 hover:text-white cursor-pointer text-sm w-24"
                  onClick={() => router.push("/purchase")}
                >
                  Close
                </button>
                <button
                  className="bg-cyan-400 rounded py-1 px-4 hover:bg-cyan-800 hover:text-white cursor-pointer text-sm w-24"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          {/* {console.log(purchaseDetailData)} */}
          <PurchaseDetailUpdate
            id={id}
            detailData={detailData}
            data={purchaseDetailData}
          />
        </div>

    </>
  );
};

export default Edit;
