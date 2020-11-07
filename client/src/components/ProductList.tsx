import React from "react";

export default function ProductList() {
    let products = [];
    for (let i = 0; i < 10; i++) {
        products.push(<ProductCard/>)
    }
    return (
        <div className={'product-list'}>
            {products}
        </div>
    )
}

function ProductCard() {
  return (
    <div className="product-card">
        <img
          src="https://w7.pngwing.com/pngs/723/514/png-transparent-laptop-personal-computer-laptops-electronics-photography-computer.png"
          alt=""
        />
        <h5 className="product-title">Computer with some new hardware</h5>
      <div className="product-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos laborum
        libero maiores quae voluptatum! Nesciunt.
      </div>
      <div className="product-reviews"> &#11242; 4 of 5</div>
      <span className="product-price">100000</span>
    </div>
  );
}
