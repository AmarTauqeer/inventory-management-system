import Link from "next/link";
import React, { useState, useEffect, useContext, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import { UserContext } from "@/components/UserContext";
import { IoIosArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const wrapperRef = useRef();
  const wrapperRef1 = useRef();
  const wrapperRefMobilePurchase = useRef();
  const wrapperRefMobileSale = useRef();
  const [toggle, setToggel] = useState(false);
  const [toggleSale, setToggelSale] = useState(false);
  const [togglePurchase, setToggelPurchase] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [linkColor, setLinkColor] = useState("#1f2937");
  const userInfo = useContext(UserContext);

  const router = useRouter();

  const handleToggle = (e) => {
    setToggel(!toggle);
  };

  const handleToggleSale = (e) => {
    setToggelSale(!toggleSale);
  };
  const handleTogglePurchase = (e) => {
    setToggelPurchase(!togglePurchase);
  };

  useEffect(() => {
    let handler = (e) => {
      if (toggle) {
        if (wrapperRefMobilePurchase.current != undefined) {
          if (!wrapperRefMobilePurchase.current.contains(e.target)) {
            setToggelPurchase(false);
          }
        }
        if (wrapperRefMobileSale.current != undefined) {
          if (!wrapperRefMobileSale.current.contains(e.target)) {
            setToggelSale(false);
          }
        }
      } else {
        if (wrapperRef.current != undefined) {
          if (!wrapperRef.current.contains(e.target)) {
            setToggelPurchase(false);
          }
        }
        if (wrapperRef1.current != undefined) {
          if (!wrapperRef1.current.contains(e.target)) {
            setToggelSale(false);
          }
        }
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [toggle]);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/account/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const res = await response.json();
      // console.log(await res);

      await router.push("/login");
    };
    fetchData();
  };

  return (
    <>
      <div
        className={
          shadow
            ? "fixed w-full h-20 shadow-xl z-[100]"
            : "fixed w-full h-20 z-[100]"
        }
      >
        <div className="flex justify-between items-center font-bold text-white w-full h-full px-2 2xl:px-16 bg-cyan-400">
          <h2>
            <Link href="/">Hi-Tech Petroluem</Link>
          </h2>
          <div className="text-white">
            <ul className="hidden md:flex">
              <Link href="/">
                <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
              </Link>

              <Link href="/contact">
                <li className="ml-10 text-sm uppercase hover:border-b">
                  Contact
                </li>
              </Link>

              {userInfo && userInfo !== undefined && userInfo !== null ? (
                <>
                  <Link href="/dashboard">
                    <li className="ml-10 text-sm uppercase hover:border-b">
                      Dashboard
                    </li>
                  </Link>
                  <div className="menu" ref={wrapperRef}>
                    <li className="ml-10 text-sm hover:border-b relative">
                      <div
                        className="cursor-pointer flex justify-between w-[100px]"
                        onClick={handleTogglePurchase}
                      >
                        PURCHASE <IoIosArrowDropdown size={20} />
                      </div>
                      {togglePurchase && (
                        <>
                          <div className="rounded border-gray-500 bg-white py-2 absolute mt-2 shadow-md w-36 md:w-48">
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={handleTogglePurchase}
                            >
                              <Link
                                href="/purchase/supplier"
                                onClick={handleTogglePurchase}
                              >
                                Supplier
                              </Link>
                            </div>

                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={handleTogglePurchase}
                            >
                              <Link
                                href="/purchase"
                                onClick={handleTogglePurchase}
                              >
                                Purchase Invoice
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </li>
                  </div>
                  <div className="menu-sale" ref={wrapperRef1}>
                    <li className="ml-10 text-sm hover:border-b relative">
                      <div
                        className="cursor-pointer flex justify-between w-[60px]"
                        onClick={handleToggleSale}
                      >
                        SALE <IoIosArrowDropdown size={20} />
                      </div>
                      {toggleSale && (
                        <>
                          <div className="rounded border-gray-500 bg-white py-2 absolute mt-2 shadow-md w-36 md:w-48">
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={handleToggleSale}
                            >
                              <Link
                                href="/sale/customer"
                                onClick={handleToggleSale}
                              >
                                Customer
                              </Link>
                            </div>
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={handleToggleSale}
                            >
                              <Link
                                href="/sale/category"
                                onClick={handleToggleSale}
                              >
                                Category
                              </Link>
                            </div>
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={handleToggleSale}
                            >
                              <Link
                                href="/sale/product"
                                onClick={handleToggleSale}
                              >
                                Product
                              </Link>
                            </div>
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={handleToggleSale}
                            >
                              <Link href="/sale" onClick={handleToggleSale}>
                                Sale Invoice
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </li>
                  </div>
                  <Link href="/stock">
                    <li className="ml-10 text-sm uppercase hover:border-b">
                      Stock
                    </li>
                  </Link>
                  <Link href="/">
                    <li className="ml-10 text-sm uppercase hover:border-b">
                      {userInfo.username}
                    </li>
                  </Link>
                  <Link href="/login" onClick={handleLogout}>
                    {/* <div className="flex items-center justify-center"> */}

                    <li className="ml-5 text-sm" onClick={handleLogout}>
                      Logout
                    </li>
                    {/* </div> */}
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <li className="ml-10 text-sm uppercase hover:border-b">
                      Login
                    </li>
                  </Link>
                </>
              )}
            </ul>
            <div className="md:hidden" onClick={handleToggle}>
              <AiOutlineMenu size={25} />
            </div>
          </div>
        </div>
        <div
          className={
            toggle
              ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70"
              : ""
          }
        >
          <div
            className={
              toggle
                ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-3 ease-in duration-500"
                : "fixed left-[-100%] p-10 ease-in duration-500"
            }
          >
            <div className="flex w-full justify-between items-center">
              <h4>
                <Link onClick={() => setToggel(false)} href="/">
                  Hi-Tech Petroluem
                </Link>
              </h4>
              <div
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
                onClick={handleToggle}
              >
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4"></p>
            </div>
            <div className="py-4 flex flex-col">
              <ul className="uppercase">
                <Link onClick={() => setToggel(false)} href="/">
                  <li className="py-4 text-sm">Home</li>
                </Link>
                <Link onClick={() => setToggel(false)} href="/contact">
                  <li className="py-4 text-sm">Contact</li>
                </Link>

                {userInfo && userInfo !== undefined && userInfo !== null ? (
                  <>
                    <Link onClick={() => setToggel(false)} href="/dashboard">
                      <li className="py-4 text-sm">Dashboard</li>
                    </Link>
                    <div
                      className="mobile-menu-purchase"
                      ref={wrapperRefMobilePurchase}
                    >
                      <li className="md:ml-10 text-sm hover:border-b relative mb-2 md:mb-0">
                        <div
                          className="cursor-pointer flex justify-between w-[100px]"
                          onClick={handleTogglePurchase}
                        >
                          PURCHASE <IoIosArrowDropdown size={20} />
                        </div>
                        {togglePurchase && (
                          <>
                            <div className="rounded border-gray-500 bg-white py-2 absolute mt-2 shadow-md w-36 md:w-48">
                              <div
                                className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                                onClick={() => {
                                  handleTogglePurchase();
                                  setToggel(false);
                                }}
                              >
                                <Link
                                  href="/purchase/supplier"
                                  onClick={() => {
                                    handleTogglePurchase();
                                    setToggel(false);
                                  }}
                                >
                                  Supplier
                                </Link>
                              </div>

                              <div
                                className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                                onClick={() => {
                                  handleTogglePurchase();
                                  setToggel(false);
                                }}
                              >
                                <Link
                                  href="/purchase"
                                  onClick={() => {
                                    handleTogglePurchase();
                                    setToggel(false);
                                  }}
                                >
                                  Purchase Invoice
                                </Link>
                              </div>
                            </div>
                          </>
                        )}
                      </li>
                    </div>
                    <div
                      className="mobile-sale-menu"
                      ref={wrapperRefMobileSale}
                    >
                      <div
                        className="cursor-pointer flex justify-between w-[60px]"
                        onClick={() => {
                          handleToggleSale();
                          // setToggel(false)
                        }}
                      >
                        SALE <IoIosArrowDropdown size={20} />
                      </div>
                      {toggleSale && (
                        <>
                          <div className="rounded border-gray-500 bg-white py-2 absolute mt-2 shadow-md w-36 md:w-48">
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={() => {
                                handleToggleSale();
                                setToggel(false);
                              }}
                            >
                              <Link
                                href="/sale/customer"
                                onClick={() => {
                                  handleToggleSale();
                                  setToggel(false);
                                }}
                              >
                                Customer
                              </Link>
                            </div>
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={() => {
                                handleToggleSale();
                                setToggel(false);
                              }}
                            >
                              <Link
                                href="/sale/category"
                                onClick={() => {
                                  handleToggleSale();
                                  setToggel(false);
                                }}
                              >
                                Category
                              </Link>
                            </div>
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={() => {
                                handleToggleSale();
                                setToggel(false);
                              }}
                            >
                              <Link
                                href="/sale/product"
                                onClick={() => {
                                  handleToggleSale();
                                  setToggel(false);
                                }}
                              >
                                Product
                              </Link>
                            </div>
                            <div
                              className="text-gray-700 text-sm mb-1 hover:bg-cyan-200 p-2"
                              onClick={() => {
                                handleToggleSale();
                                setToggel(false);
                              }}
                            >
                              <Link
                                href="/sale"
                                onClick={() => {
                                  handleToggleSale();
                                  setToggel(false);
                                }}
                              >
                                Sale Invoice
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <Link href="/stock" onClick={() => setToggel(false)}>
                      <li
                        className="md:ml-10 text-sm uppercase hover:border-b"
                        onClick={() => setToggel(false)}
                      >
                        Stock
                      </li>
                    </Link>
                    <Link onClick={() => setToggel(false)} href="/logout">
                      <div className="flex flex-col items-center justify-center">
                        {userInfo.username}
                        <li className="py-4 text-sm" onClick={handleLogout}>
                          Logout
                        </li>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link onClick={() => setToggel(false)} href="/login">
                      <li className="py-4 text-sm">Login</li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
