import RootLayout from "@/components/layout";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import "notyf/notyf.min.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Toaster, toast } from "sonner";

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState();

  const fetchData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/account/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const res = await response.json();

    if (res.detail !== "Unauthenticated") {
      setAuth(res);
    } else {
      console.log("some issues");
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageProps]);
  return (
    <RootLayout auth={auth}>
      <Toaster richColors position="top-center" duration={2000} />
      <Component {...pageProps} />
    </RootLayout>
  );
}
