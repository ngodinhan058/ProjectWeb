import React from "react";
import { useNavigate } from "react-router-dom";

const MobileCollections = ({ collections }) => {
  const navigate = useNavigate();

  return (
    <>
      {collections.map((collection) => (
        <div key={collection.id} className="col-md-12 collection-item">
          <h4>{collection.name}</h4>

          {/* Hình ảnh của collection */}
          <div className="row">
            <div className="col-12">
              <img
                src={collection.image}
                alt={collection.name}
                className="img-fluid category-img"
              />
            </div>
            <div className="col-12 d-block d-md-none">
              <div className="row">
                {collection.products.slice(0, 6).map((product, index) => (
                  <div key={product.id} className="col-6 mb-3">
                    <div
                      className="product-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/product-detail/${product.id}`, {
                          state: {
                            id: product.id,
                          },
                        });
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                      />
                      <p>{product.name}</p>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MobileCollections;
