import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import {getProducts, getProductsAvailability} from "../../services/productService";

function Products() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await getProductsAvailability();
        const products = response.data;
        setProducts(products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
            <MaterialTable 
            columns = {[
                // {title: "Nazwa", field: "name"},
                // {title: "Kod", field: "code"},
                // {title: "PKWiU", field: "pkwiu"},
                // {title: "Optima ID", field: "optima_id"},
                // {title: "Kategoria", field: "category"},
                // {title: "Jednostka", field: "unit_name"},
                // {title: "Wartość", field: "value"},
                // {title: "Wartość odsprzedazy", field: "retail_value"},
                {title: 'Nazwa', field: 'product_name'},
                {title: 'Magazyn', field: 'store_short_name'},
                {title: 'Ilość', field: 'quantity'},
                {title: 'Jednostka', field: 'unit'},
                {title: 'Wartość', field: 'value'},
            ]}
            options={{
                pageSize: 10,
                pageSizeOptions: [ 10 ]
            }}
            data={products}
            title="Produkty"
            />

    );
}

export default Products;