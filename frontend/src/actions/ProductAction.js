import axios from "axios";
import {
  ALL_PRODUCT_ERRORS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCCT_DETAILS_REQUEST,
  PRODUCCT_DETAILS_SUCCESS,
  PRODUCCT_DETAILS_FAIL,
  ALL_CAT_FAIL,
  ALL_CAT_REQUEST,
  ALL_CAT_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  ALL_PRODUCT_SEARCH_REQUEST,
  ALL_PRODUCT_SEARCH_SUCCESS,
  ALL_PRODUCT_SEARCH_FAIL,
  ALL_FEATURE_PRODUCT_REQUEST,
  ALL_FEATURE_PRODUCT_SUCCESS,
  ALL_FEATURE_PRODUCT_FAIL,
  PRODUCT_STATUS_REQUEST,
  PRODUCT_STATUS_SUCCESS,
  PRODUCT_STATUS_FAIL,
  CREATE_ATTRIBUTE_REQUEST,
  CREATE_ATTRIBUTE_SUCCESS,
  CREATE_ATTRIBUTE_FAIL,
  GET_ATTRIBUTE_REQUEST,
  GET_ATTRIBUTE_SUCCESS,
  GET_ATTRIBUTE_FAIL,
  GET_SINGLE_ATTRIBUTE_REQUEST,
  GET_SINGLE_ATTRIBUTE_SUCCESS,
  GET_SINGLE_ATTRIBUTE_FAIL,
  UPDATE_ATTRIBUTE_REQUEST,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_FAIL,
  CREATE_LABEL_REQUEST,
  CREATE_LABEL_SUCCESS,
  CREATE_LABEL_FAIL,
  GET_LABEL_REQUEST,
  GET_LABEL_SUCCESS,
  GET_LABEL_FAIL,
  GET_SINGLE_LABEL_REQUEST,
  GET_SINGLE_LABEL_SUCCESS,
  GET_SINGLE_LABEL_FAIL,
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_SUCCESS,
  UPDATE_ATTRIBUTE_RESET,
  UPDATE_LABEL_FAIL,
  DELETE_ATTRIBUTE_FAIL,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_REQUEST,
  DELETE_LABEL_REQUEST,
  DELETE_LABEL_SUCCESS,
  DELETE_LABEL_FAIL,
  GET_ALL_LABEL_REQUEST,
  GET_ALL_LABEL_SUCCESS,
  GET_ALL_LABEL_FAIL,
  NEW_PRODUCT_REQUEST,
} from "../constants/ProductConstants";
import { MdDataObject } from "react-icons/md";

export const getProduct =
  (
    currentPage = 1,
    price = [0, 1000],
    ratings,
    categorie,
    subcategory,
    discount = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}`;
      if (ratings) {
        link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      }
      if (subcategory) {
        // link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&ratings[gte]=${ratings}`;
        link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}&product_category=${categorie}&product_subcategory=${subcategory}&ratings[gte]=${ratings}`;
      }
      if (discount > 0) {
        link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}&product_category=${categorie}&ratings[gte]=${ratings}&discount=${discount}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const featureProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_FEATURE_PRODUCT_REQUEST });

    // let link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

    const { data } = await axios.get("/api/v1/feature-product");

    dispatch({
      type: ALL_FEATURE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: ALL_FEATURE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const searchProduct = (searchData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_SEARCH_REQUEST });
    const { data } = await axios.get(`/api/v1/products?keyword=${searchData}`);

    dispatch({ type: ALL_PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ALL_PRODUCT_SEARCH_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCCT_DETAILS_SUCCESS,
      payload: data.Product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategorie =
  (currentPage = 1, price = [0, 1000], categorie, ratings) =>
  async (dispatch) => {
    console.log(price);
    try {
      dispatch({ type: ALL_CAT_REQUEST });

      let link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}`;
      if (ratings) {
        link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      }
      if (categorie) {
        // link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&ratings[gte]=${ratings}`;
        link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}&product_category=${categorie}&ratings[gte]=${ratings}`;
      }
      // if (discount > 0) {
      //   link = `/api/v1/products?page=${currentPage}&product_sale_price[gte]=${price[0]}&product_sale_price[lte]=${price[1]}&product_category=${categorie}&ratings[gte]=${ratings}&discount=${discount}`;
      // }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_CAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CAT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.Product,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//----------get all product for admin

export const adminGetAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.Products,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const createNewProduct =
  (
    // inputValue,
    productData,
    VariationData,
    imageIds,
    subcheckedItems,
    checkedItems
    // title,
    // slug,
    // article,
    // content,
    // product_Type,
    // general_Price,
    // SKU,
    // Stock,
    // Sold_Individually,
    // Availability_Date,
    // Weight,
    // Dimensions,
    // Shipping_class,
    // Variations,
    // Default_value,
    // subcheckedItems,
    // checkedItems,
    // imageIds
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });

      // const general_Price_JsonData = JSON.stringify(general_PriceData);
      const VariationJsonData = JSON.stringify(VariationData);

      const formData = new FormData();
      formData.append("variation", VariationJsonData);
      // formData.append("general_Price", general_Price_JsonData);
      for (let i = 0; i < imageIds.length; i++) {
        formData.append("imageId", String(imageIds[i]));
      }
      for (let i = 0; i < subcheckedItems.length; i++) {
        formData.append("subcategory", String(subcheckedItems[i]));
      }

      for (let key in productData) {
        formData.append(key, productData[key]);
      }
      // for (let key in inputValue) {
      //   formData.append(key, inputValue[key]);
      // }

      for (let i = 0; i < checkedItems.length; i++) {
        formData.append("category", String(checkedItems[i]));
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `/api/v1/product/new`,
        formData,
        config
      );
      // const data = "ffffffff";

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error,
      });
    }
  };

//--------------delete product by admin

export const deleteAdminProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

//---update adminproduct

export const updateAdminProduct =
  (
    id,
    checkedItems,
    subcheckedItems,
    article,
    content,
    VariationData,
    inputValue,
    currentImageArray
  ) =>
  async (dispatch) => {
    console.log(VariationData)
    try {
      const VariationJsonData = JSON.stringify(VariationData);
    
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("variation", VariationJsonData);

      formData.append("content", content);
      formData.append("article", article);
      for (let key in inputValue) {
        formData.append(key, inputValue[key]);
      }

      // // Append each file individually
      for (let i = 0; i < currentImageArray.length; i++) {
        formData.append("imageIds", currentImageArray[i]);
      }

      for (let i = 0; i < subcheckedItems.length; i++) {
        formData.append("subcategory", String(subcheckedItems[i]));
      }
      for (let i = 0; i < checkedItems.length; i++) {
        formData.append("category", String(checkedItems[i]));
      }

      const { data } = await axios.put(
        `/api/v1/product/${id}`,
        formData,
        config
      );

      // const data = 'ddd';

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/review?id=${id}`);
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// export const deleteReviews = (reviewId, productId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_REVIEW_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/review?id=${reviewId}&productId=${productId}`
//     );

//     dispatch({
//       type: DELETE_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const updateProductStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_STATUS_REQUEST });

    const formdata = new FormData();
    formdata.append("status", status);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //   const data = 'dddd'
    const { data } = axios.put(
      `/api/v1/product/status/${id}`,
      formdata,
      config
    );
    dispatch({ type: PRODUCT_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//------------product attribute action----------

export const ProductAttributeAction =
  (customID, inputValue) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ATTRIBUTE_REQUEST });
      const formData = new FormData();
      formData.append("uuid", customID);
      for (let key in inputValue) {
        formData.append(key, inputValue[key]);
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/admin/products/create-attribute",
        formData,
        config
      );

      dispatch({ type: CREATE_ATTRIBUTE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ATTRIBUTE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//-----------GET PRODUCT ATTRIBUTE ACTION----------

export const GetProductAttributeAction = (label) => async (dispatch) => {
  try {
    dispatch({ type: GET_ATTRIBUTE_REQUEST });
    let link = `/api/v1/admin/products/product-attribute`;
    if (label) {
      link = `/api/v1/admin/products/product-attribute?keyword=${label}`;
    }
    const { data } = await axios.get(link);

    dispatch({ type: GET_ATTRIBUTE_SUCCESS, payload: data.attributedata });
  } catch (error) {
    dispatch({
      type: GET_ATTRIBUTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//--get single product attribute----------

export const GetSingleAttributeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ATTRIBUTE_REQUEST });
    const { data } = await axios.get(
      `/api/v1/admin/products/single-attribute/${id}`
    );
    dispatch({
      type: GET_SINGLE_ATTRIBUTE_SUCCESS,
      payload: data.attributedata,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ATTRIBUTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//-----------UPDATE PRODUCT ATTRIBUTE---------

export const UpdateAttributeAction = (id, inputValue) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ATTRIBUTE_REQUEST });
    const formData = new FormData();
    for (let key in inputValue) {
      formData.append(key, inputValue[key]);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/products/update-attribute/${id}`,
      formData,
      config
    );
    dispatch({ type: UPDATE_ATTRIBUTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ATTRIBUTE_FAIL,
      payload: error.data.response.message,
    });
  }
};

//---------------status and delete product attribute-----------------

export const StatusProductAttributeAction =
  (id, isdelete) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ATTRIBUTE_REQUEST });
      const formData = new FormData();

      formData.append("isdelete", isdelete);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/products/status-attribute/${id}`,
        formData,
        config
      );

      dispatch({ type: DELETE_ATTRIBUTE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_ATTRIBUTE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//--------------------LABEL CREATE ACTION----------------------

export const ProductLabelAction =
  (id, customID, inputValue) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_LABEL_REQUEST });
      const formData = new FormData();
      formData.append("uuid", customID);
      for (let key in inputValue) {
        formData.append(key, inputValue[key]);
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/admin/products/create-label/${id}`,
        formData,
        config
      );

      dispatch({ type: CREATE_LABEL_SUCCESS, payload: data.label });
    } catch (error) {
      dispatch({
        type: CREATE_LABEL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//----------------GET ALL LABEL----------

export const GetProductLabelAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LABEL_REQUEST });
    let link = `/api/v1/admin/products/get-label/${id}`;

    const { data } = await axios.get(link);
    dispatch({ type: GET_LABEL_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_LABEL_FAIL, payload: error.response.data.message });
  }
};

export const GetAllProductLabelAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LABEL_REQUEST });
    let link = `/api/v1/admin/products/all-att-labels`;

    const { data } = await axios.get(link);

    dispatch({ type: GET_ALL_LABEL_SUCCESS, payload: data.attributedata });
  } catch (error) {
    dispatch({
      type: GET_ALL_LABEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//-----get single label----------

export const GetSingleLabel = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_LABEL_REQUEST });
    const { data } = await axios.get(
      `/api/v1/admin/products/single-label/${id}`
    );
    dispatch({ type: GET_SINGLE_LABEL_SUCCESS, payload: data.attributedata });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_LABEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//--------update label---------------

export const UpdateProductLabelAction =
  (id, inputValue) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_LABEL_REQUEST });
      const formData = new FormData();
      for (let key in inputValue) {
        formData.append(key, inputValue[key]);
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/products/update-label/${id}`,
        formData,
        config
      );
      dispatch({ type: UPDATE_LABEL_SUCCESS, payload: data.attributedata });
    } catch (error) {
      dispatch({
        type: UPDATE_LABEL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//----------status or isdelete product label action------------

export const StatusProductAttributLabeleAction =
  (id, isdelete) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_LABEL_REQUEST });
      const formData = new FormData();

      formData.append("isdelete", isdelete);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/products/status-label/${id}`,
        formData,
        config
      );

      dispatch({ type: DELETE_LABEL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_LABEL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//---clear errors
export const ClearError = () => async (dispatch) => {
  dispatch({ type: ALL_PRODUCT_ERRORS });
};
