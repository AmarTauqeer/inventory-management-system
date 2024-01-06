import React, { useContext, useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserContext } from "@/components/UserContext";
import { Country, City } from "country-state-city";
import { useRouter } from "next/router";

const Edit = (props) => {
  const receivedData = props.data;
  // console.log(receivedData.created_at);
  const [valueDate, setValueDate] = useState(receivedData.created_at);
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(countryData);
  const [countryCode, setCountryCode] = useState("");
  const router =useRouter();

  const data = country.filter((x) => x.name === receivedData.country);
  let cityData = [];
  if (data.length > 0) {
    cityData = City.getCitiesOfCountry(data[0].isoCode);
  }
  const [city, setCity] = useState(cityData);

  const userInfo = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      created_at: receivedData.created_at,
      name: receivedData.name,
      email: receivedData.email,
      phone: receivedData.phone,
      address: receivedData.address,
      country: receivedData.country,
      city: receivedData.city,
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
    fd.append("email", data.email);
    fd.append("phone", data.phone);
    fd.append("address", data.address);
    fd.append("country", data.country);
    fd.append("city", data.city);

    const requestOptions = {
      method: "PUT",
      credentials: "include",
      body: fd,
    };

    // console.log(requestOptions);

    const response = await fetch(
      `http://127.0.0.1:8000/supplier/update/${receivedData.id}`,
      requestOptions
    );
    const result = await response.json();

    if (result) {

      toast.success("Record saved successfully.");
      router.push("/purchase/supplier")
    }
  };

  useEffect(() => {
    if (userInfo) {
      setValue("name", receivedData.name);
      setValue("phone", receivedData.phone);
      setValue("email", receivedData.email);
      setValue("address", receivedData.address);
      setValue("country", receivedData.country);
      setValue("city", receivedData.city);
      setValueDate(receivedData.created_at);

      const getData = async () => {
        const data = await props.data;
        setValue("name", data.name);
        setValue("phone", data.phone);
        setValue("email", data.email);
        setValue("address", data.address);
        setValue("country", data.country);
        setValue("city", data.city);
        setValueDate(data.created_at);

        const countCode = country.filter((c) => c.name === data.country);

        if (countCode.length > 0) {
          setCountryCode(countCode[0].isoCode);
        }
      };
      getData();
    }
  }, [userInfo, props]);

  const fetchCity = () => {
    let filteredCountry = [];
    if (countryCode.length === 2) {
      filteredCountry = country.filter((c) => c.isoCode === countryCode);
      const cities = City.getCitiesOfCountry(countryCode);
      setCity(cities);
    } else {
      filteredCountry = country.filter((c) => c.name === countryCode);
      if (filteredCountry.length > 0) {
        const countCode = filteredCountry[0].isoCode;
        const cities = City.getCitiesOfCountry(countCode);
        setCity(cities);
      }
    }
  };

  useEffect(() => {
    fetchCity();
  }, [country, countryCode]);

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
                render={({ name, ref, onBlur, value }) => (
                  <select
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setValue("country", e.target.value);
                      setCountryCode(e.target.value);
                    }}
                    name={name}
                    className="outline-none ml-2 md:ml-0 text-sm md:text-md flex rounded py-2 px-1 shadow-sm ring-1 ring-inset w-48 md:w-80 lg:w-80 
                    ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                    value={getValues("country")}
                    onBlur={onBlur}
                    inputRef={ref}
                    style={{ borderRadius: "10px" }}
                  >
                    <option value="">Select...</option>
                    {country &&
                      country.map((x) => {
                        return (
                          <>
                            <option value={x.name}>{x.name}</option>
                          </>
                        );
                      })}
                  </select>
                )}
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
              <Controller
                control={control}
                name="city"
                render={({ name, ref, onBlur }) => (
                  <select
                    style={{ borderRadius: "10px" }}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setValue("city", e.target.value);
                      // setCountryCode(e.target.value);
                    }}
                    name={name}
                    value={getValues("city")}
                    onBlur={onBlur}
                    className="outline-none ml-2 md:ml-0 text-sm md:text-md flex rounded py-2 px-1 shadow-sm ring-1 ring-inset w-48 md:w-80 lg:w-80 
                    ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                    inputRef={ref}
                  >
                    <option value="">Select...</option>

                    {city.map((x) => {
                      return (
                        <>
                          <option value={x.name} key={x.name}>
                            {x.name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                )}
              />
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
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Edit;
