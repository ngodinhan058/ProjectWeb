import React, { useEffect, useState } from 'react';

import 'react-loading-skeleton/dist/skeleton.css';


const HomePage = () => {
    <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-title">
                        <h3 className="title">New Products</h3>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="products-tabs">
                            <div id="tab1" className="tab-pane active">
                                <div className="products-slick" data-nav="#slick-nav-1">
                                    {/* <Product
                                        imgSrc="./img/product01.png"
                                        isNew={true}
                                        isOnSale={true}
                                        name="Product name goes here"
                                        category="Category"
                                        price={980}
                                        oldPrice={990}
                                        rating={5}
                                    />
                                    <Product
                                        imgSrc="./img/product02.png"
                                        isNew={true}
                                        isOnSale={false}
                                        name="Product name goes here"
                                        category="Category"
                                        price={980}
                                        oldPrice={990}
                                        rating={4}
                                    /> */}
                                </div>
                                <div id="slick-nav-1" className="products-slick-nav"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};
export default HomePage;
