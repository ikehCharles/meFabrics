import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddProductComponent from '../component/addProductComponent';
import GetProductsComponent from "../component/getProducts";
import deleteProductHelper from '../helpers/deleteProduct';
import UpdateProductComponent from '../component/updateProductComponent';
import { toast } from 'react-toastify';
import ProductsTable from '../component/productTable';

export default function Products() {
  const [isAddProductForm, toggleAddProductForm] = useState(false);
  const toggleAddProduct = () => {
    if (isAddProductForm) return toggleAddProductForm(false);
    return toggleAddProductForm(true);
  };
  const [refresh, setRefresh] = useState(false);
  const [showProducts, switchShowProducts] = useState(true);
  const [filterByCategory, switchFilterByCateory] = useState()
  const [shouldUpdateProduct, switchShouldUpdateProduct] = useState(false)
  const [showAddProductButton, switchshowAddProductButton] = useState(true)
  const [updateValue, getUpdateValue] = useState({});
  const [showTable, switchShowTable] = useState(false)
  const deleteProduct = (e, id) => {
    console.log(id)
    deleteProductHelper(id)
      .then(({ data }) => {
        if (data.status) {
          setRefresh(!refresh);
        }
        toast(data.message);
      })
      .catch((d) => {
        console.log(d)
      })
  }

  const editProduct = (e, productDetails) => {
    switchShowProducts(false)
    switchShouldUpdateProduct(true)
    switchshowAddProductButton(false)
    getUpdateValue(productDetails);
  }

  const toggleShowTable = ()=>{
    switchShowTable(!showTable)
    if(showTable){
      switchShowProducts(true)
    } else {
      switchShowProducts(false)
    }
  }

  return (
    <div>
      {showAddProductButton && <Button variant="contained" color="primary" onClick={toggleAddProduct}>
        Toggle Add Product
      </Button>}
      <Button variant="contained" color="primary" onClick={toggleShowTable}>
        Show Table
      </Button>
      {isAddProductForm && <AddProductComponent
        setRefresh={setRefresh}
        toggleOnSave={toggleAddProduct}
        refresh={refresh}
        url={`api/products/add`}
      />}
      {showProducts && <GetProductsComponent deleteProduct={deleteProduct} refresh={refresh} editProduct={editProduct} />}
      {shouldUpdateProduct && <UpdateProductComponent
        setRefresh={setRefresh}
        refresh={refresh}
        val={updateValue}
        switchShowProducts={switchShowProducts}
        switchshowAddProductButton={switchshowAddProductButton}
        switchShouldUpdateProduct={switchShouldUpdateProduct}
      />}
      {showTable && <ProductsTable refresh={refresh} />}
    </div>
  );
}