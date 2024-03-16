import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

import { useAlert } from "react-alert";
import { Switch } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { Aside } from "../../aside/Aside";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import {
  ClearError,
  adminGetAllProducts,
  deleteAdminProduct,
  updateProductStatus,
} from "../../../../actions/ProductAction";
import {
  DELETE_PRODUCT_RESET,
  PRODUCT_STATUS_RESET,
} from "../../../../constants/ProductConstants";
import { Helmet } from "react-helmet";
import Loader from "../../../layout/loader/Loader";
import MetaData from "../../../layout/metaData/MetaData";

export const AllProducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const [checked, setChecked] = useState({});
  const {
    loading: updateStatusLoading,
    isUpdate,
    error: updateStatusError,
  } = useSelector((state) => state.adminupdateproductstatus);
  const { error, products, loding } = useSelector((state) => state.products);
  const {
    error: deletError,
    isDeleted,
    loading,
  } = useSelector((state) => state.adminProduct);

  const deletehandler = (id) => {
    dispatch(deleteAdminProduct(id));
  };

  const handleChange = (id) => {
    const newCheckedState = !checked[id];
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    dispatch(updateProductStatus(id, newCheckedState));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (updateStatusError) {
      alert.error(updateStatusError);
      dispatch(ClearError());
    }
    if (isUpdate) {
      dispatch({ type: PRODUCT_STATUS_RESET });
    }
    if (deletError) {
      alert.error(deletError);
      dispatch(ClearError());
    }
    if (isDeleted) {
      alert.success("Product deleted succesfully");
      Navigate("/admin/all-products");
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
    }
    dispatch(adminGetAllProducts());
  }, [alert, dispatch, error, deletError, Navigate, isDeleted, isUpdate]);

  const columns = [
    {
      field: "id",
      headerName: "Product id",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      flex: 0.3,
      shortable: false,
      renderCell: (params) => {
        const rowStatus = params.row.status;
        return (
          <>
            <MetaData
              title={"Admin all product list"}
              content={"Admin all product list"}
              keywords={"Admin all product list"}
            />
            <Switch
              className={rowStatus ? "toggle-chekbox-active" : ""}
              checked={checked[params.row.id] || false}
              onChange={() => handleChange(params.row.id)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <NavLink
              to={`/admin/update-product/${params.getValue(params.id, "id")}`}
            >
              <FaUpRightFromSquare />
            </NavLink>

            <span
              onClick={() => deletehandler(params.getValue(params.id, "id"))}
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item, i) => {
      if (item.productstatus === "Active") {
        rows.push({
          id: item._id,
          stock: item.product_Stock ? "Yes" : "No",
          // status:item.productstatus,
          price: item.product_sale_price,
          name: item.product_name,
        });
      }
    });

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Admin All Products
        </title>
        <meta name="keywords" content="Admin All Products" />
      </Helmet>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont">
                  <div className="all-post-heading">
                    <h2>
                      Products
                      <span>
                        <NavLink to="/admin/create-product">
                          Add New Product
                        </NavLink>
                      </span>
                    </h2>
                  </div>
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>All products</h1>
                    </div>
                    <div className="productdata">
                      {loding ? (
                        <Loader />
                      ) : (
                        <>
                          {products && products.length > 0 ? (
                            <>
                              <DataGrid
                                rows={rows}
                                columns={columns}
                                // page={10}
                                disableSelectionOnClick
                                className="product-list-table"
                                autoHeight
                              />
                            </>
                          ) : (
                            <p>no data found</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
