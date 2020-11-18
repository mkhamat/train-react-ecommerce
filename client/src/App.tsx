import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import SingleProduct from "./components/SingleProduct";
import CartPage from "./components/Cart";
import { Layout } from "antd";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Layout.Header>
          <Navbar />
        </Layout.Header>
        <Layout.Content
          style={{
            backgroundColor: "#fff",
            padding: "2rem",
            minHeight: "80vh",
          }}
        >
          <Route path={"/"} exact>
            <ProductList />
          </Route>
          <Route path={"/products/:id"}>
            <SingleProduct />
          </Route>
          <Route path={"/cart"}>
            <CartPage />
          </Route>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center", backgroundColor: "#fff" }}>
          <Footer />
        </Layout.Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
