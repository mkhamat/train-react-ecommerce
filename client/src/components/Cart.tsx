import { DeleteTwoTone } from "@ant-design/icons";
import { Avatar, Button, Empty, InputNumber } from "antd";
import { List } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart, removeProductFromCart } from "../ducks/cart";
import { RootState } from "../store";
import { CartPayload } from "../types";

export default function CartPage() {
  const cartList: { cart: CartPayload[] } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const RemoveItem = (_id: string) => (
    <Button
      onClick={() => dispatch(removeProductFromCart(_id))}
      icon={<DeleteTwoTone />}
    />
  );
  const Qty = (item: CartPayload) => {
    let target = cartList.cart.find((x: CartPayload) => {
      return item.product._id === x.product._id;
    });
    return (
      <InputNumber
        value={target?.qty}
        onChange={(value: any) =>
          dispatch(addProductToCart({ product: item.product, qty: value }))
        }
        min={1}
        max={target?.product.inStock}
        style={{ width: "40px", margin: "5px" }}
      />
    );
  };
  return (
    <div>
      {cartList.cart.length ? (
        <List
          itemLayout="horizontal"
          dataSource={cartList.cart}
          header={"Cart"}
          footer={"Total"}
          renderItem={(item) => (
            <List.Item actions={[RemoveItem(item.product._id), Qty(item)]}>
              <List.Item.Meta
                avatar={<Avatar src={item.product.image} />}
                title={<a href="https://ant.design">{item.product.name}</a>}
                description={"$" + item.product.price}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty
          description={"Return to the home page to buy something useless"}
          image={
            <img
              src={
                "https://ariya.events/wp-content/uploads/2020/07/ariya-empty-cart.png"
              }
            />
          }
        >
          <Link to="/">
            <Button>Home Page</Button>
          </Link>
        </Empty>
      )}
    </div>
  );
}
