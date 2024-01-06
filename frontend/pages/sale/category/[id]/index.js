import React, { useState } from "react";
// import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "sonner";

const Edit = (props) => {
  const receviedData = props.data;
  // console.log(receviedData.created_at)
  const [valueDate, setValueDate] = useState(receviedData.created_at);

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      created_at: receviedData.created_at,
      name: receviedData.name,
      description: receviedData.description,
    },
  });

  const onSubmit = async (data) => {
    let dateISO;
    if (valueDate.length === 27) {
      dateISO = valueDate;
    } else {
      dateISO = valueDate.toISOString();
    }

    const postData = {
      created_at: dateISO,
      name: data.name,
      description: data.description,
    };
    // console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(postData),
    };

    // console.log("hi");

    const response = await fetch(
      `http://127.0.0.1:8000/category/update/${receviedData.id}`,
      requestOptions
    );
    const result = await response.json();

    // fetch type data and send back to main component
    if (result) {
      
      // setShowAlert(true);
      setValue("name", "");
      setValue("description", "");
      toast.success("Record has been updated successfully.")
      router.push("/sale/category")
    }
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

        <div className="flex justify-end items-center m-2 mt-8">
          <button
            type="button"
            className="bg-slate-300 rounded py-1 px-3 mr-1 hover:bg-slate-800 hover:text-white cursor-pointer text-sm w-24"
            onClick={() => props.onClose()}
          >
            Close
          </button>
          <button
            className="bg-cyan-400 rounded py-1 px-4 hover:bg-cyan-800 hover:text-white cursor-pointer text-sm w-24"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
