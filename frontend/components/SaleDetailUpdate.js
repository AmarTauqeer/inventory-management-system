import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

const SaleDetailUpdate = ({ id, data, detailData }) => {
  const [productData, setProductData] = useState([]);
  const [stock, setStock] = useState();
  const [value, setValue] = useState();

  const [inputs, setInputs] = useState([
    {
      sale_id: id,
      product: 1,
      qty: 0,
      price: 0.0,
      amount_per_product: 0.0,
    },
  ]);

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

  const handleChange = (e, index) => {
    const values = [...inputs];
    values[index][e.target.name] = e.target.value;

    //check stock qty
    let filterStock = stock.filter(
      (s) => s.product_id === parseInt(inputs[index].product)
    );
    if (
      parseInt(inputs[index].qty) >
      parseInt(filterStock[0].stock_qty)
    ) {
      toast.error(
        "Sale qty doesn't exceed with stock qty=" +
          filterStock[0].stock_qty
      );
      return false;
    }

    inputs[index].amount_per_product = inputs[index].qty * inputs[index].price;
    setInputs(values);
    detailData(values);
  };
  const handleAdd = () => {
    setInputs([
      ...inputs,
      {
        sale_id: id,
        product: 1,
        qty: 0,
        price: 0.0,
        amount_per_product: 0.0,
      },
    ]);
    detailData([
      ...inputs,
      {
        sale_id: id,
        product: 1,
        qty: 0,
        price: 0.0,
        amount_per_product: 0.0,
      },
    ]);
  };
  useEffect(() => {
    getProduct();
    getStock();
    setInputs(data);
  }, [id, data]);

  return (
    <>
      <div className="grid grid-cols-1 overflow-x-auto m-4">
        <form>
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex justify-start items-start text-xl font-bold w-full mb-3">
              Sale Detail
            </div>

            {inputs.length > 0 &&
              inputs.map((i, index) => {
                return (
                  <div className="flex py-1" key={index}>
                    <div>
                      <select
                        name="product"
                        value={i.product}
                        className="outline-none ml-1 text-sm flex rounded py-[10px] shadow-sm ring-1 ring-inset w-48 md:w-80 lg:w-80
                      ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                        onChange={(e) => handleChange(e, index)}
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
                        name="qty"
                        value={i.qty}
                        placeholder="qty"
                        onChange={(e) => handleChange(e, index)}
                        className="w-[25px] md:w-24 lg:24 ml-1 border border-solid border-gray-700 rounded py-[8px] px-1 text-sm text-center outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="price"
                        value={parseFloat(i.price).toFixed(2)}
                        placeholder="price"
                        onChange={(e) => handleChange(e, index)}
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
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                    <div>
                      <button
                        className="flex justify-center items-center bg-rose-400 rounded py-[8px] px-4 hover:bg-rose-800 hover:text-white
          cursor-pointer text-sm w-[50px] ml-1"
                        type="button"
                        onClick={() => {
                          const values = [...inputs];
                          values.splice(index, 1);
                          setInputs(values);
                          detailData(values);
                        }}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <button
            className="flex justify-center items-center bg-cyan-400 rounded py-[8px] px-4 hover:bg-cyan-800 hover:text-white
            cursor-pointer text-sm w-[120px] ml-1 mt-2"
            type="button"
            onClick={() => handleAdd()}
          >
            Add new row
          </button>
        </form>
      </div>
    </>
  );
};

export default SaleDetailUpdate;
