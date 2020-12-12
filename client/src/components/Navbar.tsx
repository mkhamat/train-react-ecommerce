import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Badge, Menu, message } from "antd";
import {
  LogoutOutlined,
  ProfileTwoTone,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../types";
import SubMenu from "antd/lib/menu/SubMenu";
import { logout } from "../ducks/user";

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems: { cart: Product[] } = useSelector(
    (state: RootState) => state.cart
  );

  const { user }: { user: { name: string } } = useSelector(
    (state: RootState) => state.users
  );
  function handleLogout() {
    dispatch(logout());
    message.info("You logged out");
    history.push("/");
  }
  return (
    <Menu
      selectedKeys={[""]}
      style={{ maxWidth: "1200px", margin: "0 auto" }}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item>
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
      </Menu.Item>
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
      {user ? (
        <SubMenu
          style={{ float: "right" }}
          icon={<UserOutlined />}
          title={user.name}
        >
          <Menu.Item icon={<ProfileTwoTone />}>
            {<Link to={"/users/profile"}>Profile</Link>}
          </Menu.Item>
          <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
            Log Out
          </Menu.Item>
        </SubMenu>
      ) : (
        <Menu.Item style={{ float: "right" }} icon={<UserOutlined />}>
          <Link to="/users/login">Sign In</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}
