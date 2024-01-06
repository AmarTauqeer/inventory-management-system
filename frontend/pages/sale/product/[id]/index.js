import React, { useContext, useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { UserContext } from "@/components/UserContext";
import UploadImage from "../../../../public/images/default.png";
import Image from "next/image";

const Edit = (props) => {
  const receivedData = props.data;
  const [valueDate, setValueDate] = useState(new Date());
  const [categoryData, setCategoryData] = useState([]);
  const userInfo = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      created_at: new Date(),
      name: "",
      description: "",
      category_id: "",
      purchase_rate: "",
      sale_rate: "",
      image: "",
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
    fd.append("name", data.name);
    fd.append("description", data.description);
    fd.append("purchase_rate", parseFloat(data.purchase_rate).toFixed(2));
    fd.append("sale_rate", parseFloat(data.sale_rate).toFixed(2));
    fd.append("category", parseInt(data.category_id));

    if (selectedFile !== undefined) {
      fd.append("image", selectedFile);
    }

    // for (const pair of fd.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    const requestOptions = {
      method: "PUT",
      credentials: "include",
      body: fd,
    };

    // console.log(requestOptions);

    const response = await fetch(
      `http://127.0.0.1:8000/product/update/${receivedData.id}`,
      requestOptions
    );
    const result = await response.json();

    // fetch type data and send back to main component
    if (result) {
      toast.success("Record updated successfully.");
      router.push("/sale/product")
    }
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
      setValue("category_id", receivedData.category_id);
    }
  };
  useEffect(() => {
    // console.log(userInfo)
    if (userInfo) {
      setValue("name", receivedData.name);
      setValue("description", receivedData.description);
      setValue("purchase_rate", receivedData.purchase_rate);
      setValue("sale_rate", receivedData.sale_rate);
      setValue("category_id", receivedData.category_id);
      setValueDate(receivedData.created_at);
      if (receivedData.image !== null) {
        setImageUrl(`http://127.0.0.1:8000${receivedData.image}`);
      }

      getCategory();
    }
  }, [userInfo, props]);

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);

    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  return (
    <div className="flex flex-col m-2">
      <form>
        <div className="flex items-center m-4">
          <span className="w-24 text-sm">Date</span>
          <DateTimePicker
            placeholder="Enter create date."
            onChange={setValueDate}
            value={valueDate}
            name="created_at"
            className="py-1 text-sm"
          />
        </div>
        <div className="flex items-center m-4">
          <span className="w-24 text-sm">Category</span>

          <select
            className="ml-2 md:ml-0 text-sm md:text-md flex rounded py-1 shadow-sm ring-1 ring-inset w-48 
            ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            {...register("category_id", {
              required: "Category is required.",
            })}
          >
            <option value="">Select...</option>
            {categoryData !== undefined &&
              categoryData.map((x) => {
                return (
                  <>
                    <option value={x.id} key={x.id}>
                      {x.name}
                    </option>
                  </>
                );
              })}
          </select>
        </div>

        <div className="flex items-center m-4">
          <span className="w-24 text-sm">Name</span>
          <input
            className="w-2/3 border border-solid border-gray-700 rounded py-1 px-1 text-sm"
            placeholder="enter name"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        {errors.name && (
          <div className="flex items-center m-4">
            <span className="w-24 text-sm"></span>
            <div className="w-2/3 text-sm">
              <error className="text-red-400">
                {errors.name?.type === "required" && "Name is required"}
              </error>
            </div>
          </div>
        )}

        <div className="flex items-center m-4">
          <span className="w-24 text-sm">Description</span>

          <input
            className="w-2/3 border border-solid border-gray-700 rounded py-1 px-1 text-sm"
            placeholder="enter type description"
            {...register("description", {
              required: true,
            })}
          />
        </div>
        {errors.description && (
          <div className="flex items-center m-4">
            <span className="w-24 text-sm"></span>
            <div className="w-2/3 text-sm">
              <error className="text-red-400">
                {errors.description?.type === "required" &&
                  "Desription is required"}
              </error>
            </div>
          </div>
        )}

        <div className="flex items-center m-4">
          <span className="w-24 text-sm">Purchase Rate</span>

          <input
            type="number"
            className="w-2/3 border border-solid border-gray-700 rounded py-1 px-1 text-sm"
            placeholder="enter purchase rate"
            {...register("purchase_rate", {
              required: "Purchase rate is required",
              //   valueAsNumber: true,
              minLength: {
                value: 2,
                message: "Minimum purchase rate length is 2",
              },
              maxLength: {
                value: 7,
                message: "Maximum purchase rate length is 4",
              },
            })}
          />
        </div>
        {errors.purchase_rate && (
          <div className="flex items-center m-4">
            <span className="w-24 text-sm"></span>
            <div className="w-2/3 text-sm">
              <error className="text-red-400">
                {errors.purchase_rate?.message}
              </error>
            </div>
          </div>
        )}
        <div className="flex items-center m-4">
          <span className="w-24 text-sm">Sale Rate</span>

          <input
            type="number"
            className="w-2/3 border border-solid border-gray-700 rounded py-1 px-1 text-sm"
            placeholder="enter sale rate"
            {...register("sale_rate", {
              required: "Sale rate is required",
              //   valueAsNumber: true,
              minLength: {
                value: 2,
                message: "Minimum sale rate length is 2",
              },
              maxLength: {
                value: 7,
                message: "Maximum sale rate length is 4",
              },
            })}
          />
        </div>
        {errors.sale_rate && (
          <div className="flex items-center m-4">
            <span className="w-24 text-sm"></span>
            <div className="w-2/3 text-sm">
              <error className="text-red-400">
                {errors.sale_rate?.message}
              </error>
            </div>
          </div>
        )}

        <div className="flex items-center m-4">
          <span className="w-24 text-sm">Image</span>
          <input
            name="file"
            label="Image"
            type="file"
            onChange={imageHandler}
          />
        </div>
        <div className="flex items-center m-4">
          <span className="w-24 text-sm"></span>
          <Image
            src={imageUrl ? imageUrl : UploadImage}
            width={200}
            height={200}
            className="w-2/3 border border-solid border-gray-700 rounded-md py-1 px-1 text-sm h-48"
          />
        </div>

        <div className="flex justify-end items-center m-2 mt-8">
          <button
            type="button"
            className="bg-slate-300 rounded py-1 px-3 mr-1 hover:bg-slate-800 hover:text-white cursor-pointer text-sm"
            onClick={() => props.onClose()}
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
      </form>
    </div>
  );
};

export default Edit;
