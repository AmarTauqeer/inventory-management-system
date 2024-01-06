import React, { useEffect, useState } from "react";

const PurchaseDetailDtl = ({ id, data, detailData }) => {
  const [productData, setProductData] = useState([]);

  const [inputs, setInputs] = useState([
    {
      sale_id: id,
      product: 1,
      qty: 0,
      price: 0.0,
      amount_per_product: 0.0,
    },
  ]);

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

  useEffect(() => {
    getProduct();
    setInputs(data);
  }, [id, data]);

  return (
    <>
      <div className="grid grid-cols-1 overflow-x-auto m-4">
        <form>
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex justify-start items-start text-xl font-bold w-full mb-3">
              Purchase Detail
            </div>

            {inputs.length > 0 &&
              inputs.map((i, index) => {
                return (
                  <div className="flex py-1" key={index}>
                    <div>
                      <select
                        disabled
                        name="product"
                        value={i.product}
                        className="outline-none ml-1 text-sm flex rounded py-[10px] shadow-sm ring-1 ring-inset w-48 md:w-80 lg:w-80
                      ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                      >
                        <option value="">Select product</option>
                        {productData !== undefined &&
                          productData.map((x) => {
                            return (
                              <>
                                <option value={x.id}>{x.name}</option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div>
                      <input
                        disabled
                        name="qty"
                        value={i.qty}
                        placeholder="qty"
                        className="w-[25px] md:w-24 lg:24 ml-1 border border-solid border-gray-700 rounded py-[8px] px-1 text-sm text-center outline-none"
                      />
                    </div>
                    <div>
                      <input
                        disabled
                        type="number"
                        name="price"
                        value={parseFloat(i.price).toFixed(2)}
                        placeholder="price"
                        className="w-[25px] md:w-24 lg:24 text-end ml-1 border border-solid border-gray-700 rounded py-[8px] px-1 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <input
                        readOnly
                        type="number"
                        name="amount_per_product"
                        value={parseFloat(i.amount_per_product).toFixed(2)}
                        className="w-[45px] md:w-24 lg:24 text-end font-bold ml-1 border border-solid border-gray-700 rounded py-[8px] px-1 text-sm outline-none"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </form>
      </div>
    </>
  );
};

export default PurchaseDetailDtl;
