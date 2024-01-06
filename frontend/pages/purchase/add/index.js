import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import PurchaseDetail from "@/components/PurchaseDetail";
import { toast } from "sonner";

const Add = (props) => {
  const userInfo = useContext(UserContext);
  const router = useRouter();
  const [supplierData, setSupplierData] = useState([]);
  const [valueDate, setValueDate] = useState(new Date());
  const [lastPurchaseId, setLastPurchaseId] = useState();
  const [purchaseItems, setPurchaseItems] = useState([]);
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
    // console.log(data);
    let dateISO = valueDate.toISOString();

    const fd = new FormData();
    fd.append("created_at", dateISO);
    fd.append("supplier", parseInt(data.supplier));
    fd.append("purchase_amount", parseInt(data.purchase_amount));

    const requestOptions = {
      method: "POST",
      credentials: "include",
      body: fd,
    };

    // console.log(requestOptions);

    const response = await fetch(
      "http://127.0.0.1:8000/purchase/create/",
      requestOptions
    );
    const result = await response.json();
    // console.log(result);
    if (result) {
      let id = result.id;
      const addPurchaseDetail = async (id) => {
        if (purchaseItems.length > 0) {
          for (let index = 0; index < purchaseItems.length; index++) {
            const element = purchaseItems[index];
            let data = {
              purchase_id: id,
              product: parseInt(element.product),
              qty: element.qty,
              price: element.price,
              amount_per_product: element.amount_per_product,
            };
            console.log(data);

            const response = await fetch(
              `http://127.0.0.1:8000/purchase/detail-create/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
              }
            );
            const res = await response.json();
            if (res) {
              console.log("purchase detail is saved");
            }
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

  useEffect(() => {
    if (userInfo) {
      getSupplier();
    }
  }, [userInfo]);

  const detailData = (values) => {
    console.log(values);
    let total = 0;
    let detail = [];
    values.map((x) => {
      let result = {
        purchase_id: lastPurchaseId,
        product: x.product,
        qty: parseInt(x.qty),
        price: parseFloat(x.price),
        amount_per_product: x.qty * x.price,
      };

      let amt = x.qty * x.price;
      total += amt;
      detail.push(result);
    });

    setValue("purchase_amount", total);
    setPurchaseItems(detail);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-center text-xl font-bold mt-24 mb-3">
        Purchase Invoice
      </h3>
      <form>
        <div className="flex flex-col m-2">
          <div className="flex items-center m-2 outline-none">
            <span className="w-24 md:w-48 lg:48 text-xs md:text-sm">Date</span>
            <DateTimePicker
              placeholder="Enter create date."
              onChange={setValueDate}
              value={valueDate}
              name="created_at"
              className="py-0 md:py-1 ml-2 md:ml-0 text-xs md:text-sm w-24 md:w-2/3 lg:w-2/3"
            />
          </div>

          <div className="flex items-center m-2">
            <span className="w-24 md:w-48 text-xs md:text-sm">Supplier</span>
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
              className="w-48 md:w-2/3 ml-2 md:ml-0 border border-solid border-gray-700 rounded py-1 px-1 text-sm text-end font-bold outline-none"
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
      <PurchaseDetail purchase_id={lastPurchaseId} detailData={detailData} />
    </div>
  );
};

export default Add;
