import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import SaleDetail from "@/components/SaleDetail";
import { toast } from "sonner";

const Add = (props) => {
  const userInfo = useContext(UserContext);
  const router = useRouter();
  const [customerData, setCustomerData] = useState([]);
  const [valueDate, setValueDate] = useState(new Date());
  const [saleItems, setSaleItems] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      created_at: new Date(),
      sale_amount: 0,
      supplier: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    let dateISO = valueDate.toISOString();

    const fd = new FormData();
    fd.append("created_at", dateISO);
    fd.append("customer", parseInt(data.customer));
    fd.append("sale_amount", parseInt(data.sale_amount));

    const requestOptions = {
      method: "POST",
      credentials: "include",
      body: fd,
    };


    const response = await fetch(
      "http://127.0.0.1:8000/sale/create/",
      requestOptions
    );
    const result = await response.json();
    // console.log(result);
    if (result) {
      let id = result.id;
      const addSaleDetail = async (id) => {
        if (saleItems.length > 0) {
          for (let index = 0; index < saleItems.length; index++) {
            const element = saleItems[index];
            let data = {
              sale_id: id,
              product: parseInt(element.product),
              qty: element.qty,
              price: element.price,
              amount_per_product: element.amount_per_product,
            };
            // console.log(data);

            const response = await fetch(
              `http://127.0.0.1:8000/sale/detail-create/`,
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
              console.log("sale detail is saved");
            }
          }
        }
      };
      addSaleDetail(id);
    }
    toast.success("Record saved successfully.");
    router.push("/sale");
  };

  const getCustomer = async () => {
    const response = await fetch(`http://127.0.0.1:8000/customer/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    if (res) {
      setCustomerData(res);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getCustomer();
    }
  }, [userInfo]);

  const detailData = (values) => {
    // console.log(values);
    let total = 0;
    let detail = [];
    values.map((x) => {
      let result = {
        sale_id: 1,
        product: x.product,
        qty: parseInt(x.qty),
        price: parseFloat(x.price),
        amount_per_product: x.qty * x.price,
      };

      let amt = x.qty * x.price;
      total += amt;
      detail.push(result);
    });

    setValue("sale_amount", total);
    setSaleItems(detail);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-center text-xl font-bold mt-24 mb-3">
        Sale Invoice
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
            <span className="w-24 md:w-48 text-xs md:text-sm">Customer</span>
            <select
              className="outline-none ml-2 md:ml-0 text-xs md:text-sm flex rounded md:py-1 py-2 shadow-sm ring-1 ring-inset w-48 md:w-2/3 lg:w-2/3 
                    ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              {...register("customer", {
                required: "Customer is required.",
              })}
            >
              <option value="">Select...</option>
              {customerData !== undefined &&
                customerData.map((x) => {
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
              Sale Amount
            </span>

            <input
              readOnly
              className="w-48 md:w-2/3 ml-2 md:ml-0 border border-solid border-gray-700 rounded py-1 px-1 text-sm text-end font-bold outline-none"
              {...register("sale_amount", {})}
            />
          </div>
          <div className="flex justify-center items-center m-2 mt-8">
            <button
              type="button"
              className="bg-slate-300 rounded py-1 px-3 mr-1 hover:bg-slate-800 hover:text-white cursor-pointer text-sm w-24"
              onClick={() => router.push("/sale")}
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
      <SaleDetail sale_id={1} detailData={detailData} />
    </div>
  );
};

export default Add;
