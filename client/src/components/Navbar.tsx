import MenuItem from "antd/lib/menu/MenuItem";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Menu } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Product } from "../types";

export default function Navbar() {
  const cartItems: { cart: Product[] } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <Menu
      selectedKeys={[""]}
      style={{ maxWidth: "1200px", margin: "0 auto" }}
      mode="horizontal"
      theme="dark"
    >
      <Link to="/">
        <span
          style={{
            color: "rgba(255, 255, 255, 0.65)",
            fontWeight: "bold",
          }}
        >
          ONSHOP
        </span>
      </Link>
      <Menu.Item style={{ float: "right" }} icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge
            count={cartItems.cart.length}
            offset={[10, 0]}
            size="small"
            style={{ backgroundColor: "#222" }}
          >
            Cart
          </Badge>
        </Link>
      </Menu.Item>
      <MenuItem style={{ float: "right" }} icon={<UserOutlined />}>
        <Link to="/login">Sign In</Link>
      </MenuItem>
    </Menu>
  );
}
