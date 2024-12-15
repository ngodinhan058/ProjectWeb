import React from "react";
import { useNavigate } from "react-router-dom";
import Product from './Product';

const DesktopCollections = ({ collections }) => {
  return (
    <>
      {collections?.length > 0 ? collections?.map((collection) => (
        <div key={collection.collectionId}>
          <div className="text-center">
            <h3 className="titlex">Colletions {collection.imageIndex}</h3>
          </div>
          <div key={collection.collectionId} className="col-md-12 collection-item">
            <div className="row">
              <div className="col-md-6">
                <img
                  style={{ width: "auto", height: "555px", marginTop: 15, }}
                  src={collection.imageUrl}
                  alt={collection.imageAlt}
                  className="img-fluid category-img"
                />
              </div>
              <div className="col-md-6">
                <div className="row">
                  {collection?.products?.length > 0 ? collection?.products?.map((product) => (
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
                  )) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )) : null}

    </>
  );
};

export default DesktopCollections;
