import React from "react";
import { useNavigate } from "react-router-dom";
import Product from './Product';

const DesktopCollections = ({ collections }) => {
  return (
    <>
      <div key={collections.collectionId} className="col-md-12 collection-item">
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ width: "auto", height: "555px", marginTop: 15, }}
              src={collections.imageUrl}
              alt={collections.imageAlt}
              className="img-fluid category-img"
            />
          </div>
          <div className="col-md-6">
            <div className="row">
              {collections?.products.map((product) => (
                <div key={product.productId} className="col-md-4">
                  <Product
                    id={product.productId}
                    name={product.productName}
                    price={product.productPriceSale}
                    oldPrice={product.productPrice}
                    categories={product.categories}
                    images={product.productImages}
                    rating={product.productRating}
                    sale={product.productSale}
                    supplier={product.productSupplier.productSupplierName}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopCollections;
