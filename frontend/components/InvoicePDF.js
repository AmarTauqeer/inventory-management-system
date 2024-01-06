import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

const InvoicePDF = (props) => {
  const [customer, setCustomer] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [productData, setProductData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const data = props.data;
  const detail = props.detail;
  const purchase_detail = props.purchaseDetail;
  const id = props.id;

  const getCustomer = async () => {
    const response = await fetch(`http://127.0.0.1:8000/customer/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    if (res) {
      const filtered = res.filter((d) => d.id === data.customer);
      setCustomer(filtered);
    }
  };

  const getSupplier = async () => {
    const response = await fetch(`http://127.0.0.1:8000/supplier/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    if (res) {
      const filtered = res.filter((d) => d.id === data.supplier);
      setSupplier(filtered);
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

  const makeData = async () => {
    let data = await detail;
    let product = await productData;
    let arr = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let product_name = "";
      for (let index = 0; index < product.length; index++) {
        const elementProduct = product[index];
        if (elementProduct.id === element.product) {
          product_name = elementProduct.name;
        }
      }
    //   console.log(product_name);

      let obj = {
        sale_id: element.sale_id,
        product_name: product_name,
        qty: element.qty,
        price: element.price,
      };
      arr.push(obj);
    }
    setDetailData(arr);
  };

  const makeDataPurchase = async () => {
    let data = await purchase_detail;
    let product = await productData;
    let arr = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let product_name = "";
      for (let index = 0; index < product.length; index++) {
        const elementProduct = product[index];
        if (elementProduct.id === element.product) {
          product_name = elementProduct.name;
        }
      }
    //   console.log(product_name);

      let obj = {
        purchase_id: element.purchase_id,
        product_name: product_name,
        qty: element.qty,
        price: element.price,
      };
      arr.push(obj);
    }
    setDetailData(arr);
  };

  useEffect(() => {
    if (id === "purchase_invoice") {
      makeDataPurchase();
    } else {
      makeData();
    }

    getCustomer();
    getSupplier();
    getProduct();
  }, [props]);

  const generate = () => {
    // console.log("hi");
    const doc = new jsPDF();
    if (detailData.length > 0) {
      if (id === "sale_invoice") {
        const name = customer[0].name;
        const saleAmount = data.sale_amount;
        doc.text("Sale Invoice", 80, 10);
        doc.setFontSize(10);
        doc.text("Customer", 14, 20);
        doc.text(name, 55, 20);
        doc.text("Sale Amount", 14, 30);
        doc.text(saleAmount, 55, 30);

        doc.autoTable({
          //   styles: { fillColor: [255, 0, 0] },
          margin: { top: 40 },
          head: [["ID", "PRODUCTNAME", "QTY", "PRICE"]],
          body: detailData.map(({ sale_id, product_name, qty, price }) => {
            return [sale_id, product_name, qty, price];
          }),
        });

        // doc.text("Sale Amount", 120, 250);
        // doc.text(saleAmount, 150, 250);
        doc.save("sale_invoice.pdf");
      } else if (id === "purchase_invoice") {
        const name = supplier[0].name;
        const purchaseAmount = data.purchase_amount;
        doc.text("Purchase Invoice", 80, 10);
        doc.setFontSize(10);
        doc.text("Supplier", 14, 20);
        doc.text(name, 55, 20);
        doc.text("Purchase Amount", 14, 30);
        doc.text(purchaseAmount, 55, 30);

        doc.autoTable({
          //   styles: { fillColor: [255, 0, 0] },
          margin: { top: 40 },
          head: [["ID", "PRODUCTNAME", "QTY", "PRICE"]],
          body: detailData.map(({ purchase_id, product_name, qty, price }) => {
            return [purchase_id, product_name, qty, price];
          }),
        });

        // doc.text("Sale Amount", 120, 250);
        // doc.text(saleAmount, 150, 250);
        doc.save("purchase_invoice.pdf");
      }
    }
  };
  return <FaFilePdf size={30} color="red" onClick={generate} />;
};

export default InvoicePDF;
