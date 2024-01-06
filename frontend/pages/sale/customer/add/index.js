import React, { useContext, useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserContext } from "@/components/UserContext";
import { Country, City } from "country-state-city";
import { useRouter } from "next/router";

function city(countryCode) {
  let countryData = Country.getAllCountries();
  let cities;
  const filteredCountry = countryData.filter((c) => c.name === countryCode);
  if (filteredCountry.length > 0) {
    const countCode = filteredCountry[0].isoCode;
    cities = City.getCitiesOfCountry(countCode);
  }
  return {
    cityData: cities,
  };
}

const Add = (props) => {
  let countryData = Country.getAllCountries();
  const [valueDate, setValueDate] = useState(new Date());
  const [country, setCountry] = useState(countryData);
  const [countryCode, setCountryCode] = useState("");

  const router = useRouter();
  const userInfo = useContext(UserContext);

  const { cityData } = city(countryCode);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      created_at: new Date(),
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      city: "",
    },
  });

  const onSubmit = async (data) => {
    let dateISO = valueDate.toISOString();
    console.log(dateISO);

    const fd = new FormData();
    fd.append("created_at", dateISO);
    fd.append("name", data.name);
    fd.append("email", data.email);
    fd.append("phone", data.phone);
    fd.append("address", data.address);
    fd.append("country", data.country);
    fd.append("city", data.city);

    const requestOptions = {
      method: "POST",
      credentials: "include",
      body: fd,
    };

    // console.log(requestOptions);

    const response = await fetch(
      "http://127.0.0.1:8000/customer/create/",
      requestOptions
    );
    const result = await response.json();

    if (result) {
      setValue("name", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("address", "");
      setValue("country", "");
      setValue("city", "");
      toast.success("Record saved successfully.");
      router.push("/sale/customer");
    }
  };

  return (
    <>
      {userInfo !== undefined && (
        <div className="flex flex-col m-2">
          <form>
            <div className="flex items-center m-4 outline-none">
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
              <span className="w-24 text-sm">email</span>
              <input
                className="w-2/3 border border-solid border-gray-700 rounded py-1 px-1 text-sm"
                placeholder="enter type description"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please Enter A Valid Email!",
                  },
                })}
              />
            </div>
            {errors.email && (
              <div className="flex items-center m-4">
                <span className="w-24 text-sm"></span>
                <div className="w-2/3 text-sm">
                  <error className="text-red-400">
                    {errors.email?.type === "required" && "Email is required"}
                    {errors.email?.message}
                  </error>
                </div>
              </div>
            )}

            <div className="flex items-center m-4">
              <span className="w-24 text-sm">Phone</span>
              <input
                className="w-2/3 border border-solid border-gray-700 rounded py-1 px-1 text-sm"
                placeholder="enter phone number"
                {...register("phone", {
                  required: true,
                  minLength: 12,
                  maxLength: 14,
                })}
              />
            </div>
            {errors.phone && (
              <div className="flex items-center m-4">
                <span className="w-24 text-sm"></span>
                <div className="w-2/3 text-sm">
                  <error className="text-red-400">
                    {errors.phone?.type === "required" && "Phone is required"}
                    {errors.phone?.type === "minLength" &&
                      "Minimum length is 12"}
                    {errors.phone?.type === "maxLength" &&
                      "Maximum length is 14"}
                  </error>
                </div>
              </div>
            )}

            <div className="flex items-center m-4">
              <span className="w-24 text-sm">Address</span>
              <input
                className="w-2/3 border border-solid border-gray-700 rounded py-1 px-1 text-sm"
                placeholder="enter name"
                {...register("address", {
                  required: true,
                })}
              />
            </div>
            {errors.address && (
              <div className="flex items-center m-4">
                <span className="w-24 text-sm"></span>
                <div className="w-2/3 text-sm">
                  <error className="text-red-400">
                    {errors.address?.type === "required" &&
                      "Address is required"}
                  </error>
                </div>
              </div>
            )}

            <div className="flex items-center m-4">
              <span className="w-24 text-sm">Country</span>
              <Controller
                control={control}
                name="country"
                render={({ onChange, name, ref, onBlur, value }) => (
                  <select
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setValue("country", e.target.value);
                      setCountryCode(e.target.value);
                    }}
                    name={name}
                    className="outline-none ml-2 md:ml-0 text-sm md:text-md flex rounded py-2 px-1 shadow-sm ring-1 ring-inset w-48 md:w-80 lg:w-80 
                    ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                    value={value}
                    onBlur={onBlur}
                    inputRef={ref}
                    style={{ borderRadius: "10px" }}
                  >
                    <option value="">Select...</option>
                    {country.map((x) => {
                      return (
                        <>
                          <option value={x.name}>{x.name}</option>
                        </>
                      );
                    })}
                  </select>
                )}
                // rules={{ required: true }}
              />
            </div>
            {errors.country && (
              <div className="flex items-center m-4">
                <span className="w-24 text-sm"></span>
                <div className="w-2/3 text-sm">
                  <error className="text-red-400">
                    {errors.country?.type === "required" &&
                      "Country name is required"}
                  </error>
                </div>
              </div>
            )}

            <div className="flex items-center m-4">
              <span className="w-24 text-sm">City</span>
              <select
                className="outline-none ml-2 md:ml-0 text-sm md:text-md flex rounded py-2 px-1 shadow-sm ring-1 ring-inset w-48 
                ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md md:w-80 lg:w-80"
                style={{ borderRadius: "10px" }}
                {...register("city", {
                  required: true,
                })}
              >
                <option value="">Select...</option>
                {cityData !== undefined &&
                  cityData.map((x) => {
                    return (
                      <>
                        <option value={x.name}>{x.name}</option>
                      </>
                    );
                  })}
              </select>
            </div>
            {errors.city && (
              <div className="flex items-center m-4">
                <span className="w-24 text-sm"></span>
                <div className="w-2/3 text-sm">
                  <error className="text-red-400">
                    {errors.city?.type === "required" &&
                      "City name is required"}
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
      )}
    </>
  );
};

export default Add;
