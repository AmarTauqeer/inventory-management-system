import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/router";

const Add = (props) => {
  const router = useRouter();
  const [valueDate, setValueDate] = useState(new Date());

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      createDate: new Date(),
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    let dateISO = valueDate.toISOString();

    const postData = {
      created_at: dateISO,
      name: data.name,
      description: data.description,
    };
    console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(postData),
    };

    // console.log("hi");

    const response = await fetch(
      "http://127.0.0.1:8000/category/create/",
      requestOptions
    );
    const result = await response.json();

    // fetch type data and send back to main component
    if (result) {
      setValue("name", "");
      setValue("description", "");
      toast.success("Record saved successfully.");
      router.push("/sale/category");
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
            name="createDate"
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
