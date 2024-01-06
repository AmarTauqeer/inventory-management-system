import { UserContext } from "@/components/UserContext";
import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "sonner";
import SaleDetailUpdate from "@/components/SaleDetailUpdate";
import { useParams } from "next/navigation";
import InvoicePDF from "@/components/InvoicePDF";
import SaleDetailDtl from "@/components/SaleDetailDtl";

const Detail = (props) => {
  const params = useParams();
  let id = "";
  if (params) {
    // console.log(params.id);
    id = params.id;
  }
  const userInfo = useContext(UserContext);
  const router = useRouter();
  const [customerData, setCustomerData] = useState([]);
  const [valueDate, setValueDate] = useState(new Date());
  const [saleItems, setSaleItems] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [saleDetailData, setSaleDetailData] = useState([]);
  const {
    register,
    formState: { errors },
    // handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      created_at: new Date(),
      sale_amount: 0,
      customer: "",
    },
  });

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

  const getSale = async () => {
    const response = await fetch(`http://127.0.0.1:8000/sale/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    if (res) {
      let filterSale = res.filter((r) => r.id == id);
      filterSale = filterSale[0];
      // console.log(filterSale);
      setSaleData(filterSale);
      setValue("customer", filterSale.customer);
      setValue("created_at", filterSale.created_at);
      setValue("sale_amount", filterSale.sale_amount);
    }
  };

  const getSaleDetail = async () => {
    const response = await fetch(`http://127.0.0.1:8000/sale/detail-list/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    // console.log(res);
    let filterSale = [];
    if (res) {
      filterSale = res.filter((r) => r.sale_id == parseInt(id));
    }
    // console.log(filterSale);
    setSaleDetailData(filterSale);
  };

  useEffect(() => {
    if (userInfo) {
      getCustomer();
      getSale();
      getSaleDetail();
    }
  }, [userInfo, props]);

  const detailData = (values) => {
    // console.log(values);
    let total = 0;
    let detail = [];
    values.map((x) => {
      // console.log("hi");
      let result = {
        sale_id: id,
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

    setValue("sale_amount", total);
    // console.log(detail);
    setSaleItems(detail);
  };
  // console.log(purchaseItems);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center text-xl font-bold mt-24 mb-3">
          Sale Invoice
        </h3>
        <form>
          <div className="flex flex-col m-2">
            <div className="flex items-center m-2 outline-none">
              <span className="w-24 md:w-48 lg:48 text-xs md:text-sm">
                Date
              </span>
              <DateTimePicker
                disabled
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
                disabled
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
                className="w-48 md:w-2/3 ml-2 md:ml-0 border border-solid border-gray-700 rounded py-1 px-1 
                text-sm text-end font-bold outline-none"
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
              <div className="flex mb-2">
                {saleDetailData.length > 0 && (
                  <InvoicePDF
                    data={saleData}
                    id="sale_invoice"
                    detail={saleDetailData}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
        {/* {console.log(purchaseDetailData)} */}
        <SaleDetailDtl id={id} detailData={detailData} data={saleDetailData} />
      </div>
    </>
  );
};

export default Detail;
