import React from "react";
import { useNavigate } from "react-router-dom";

const DesktopCollections = ({ collections }) => {
  const navigate = useNavigate();

  return (
    <>
      {collections.map((collection) => (
        <div key={collection.id} className="col-md-12 collection-item">
          <h4>{collection.name}</h4>
          <div className="row">
            <div className="col-md-6">
              <img
                style={{ width: "auto", height: "500px" }}
                src={collection.image}
                alt={collection.name}
                className="img-fluid category-img"
              />
            </div>
            <div className="col-md-6">
              <div className="row">
                {collection.products.map((product) => (
                  <div key={product.id} className="col-md-4">
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

export default DesktopCollections;
