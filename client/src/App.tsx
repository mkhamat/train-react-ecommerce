import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import SingleProductScreen from "./screens/SingleProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import { Layout } from "antd"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"

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
            <HomeScreen />
          </Route>
          <Route path={"/products/:id"}>
            <SingleProductScreen />
          </Route>
          <Route path={"/cart"}>
            <CartScreen />
          </Route>
          <Route path={"/users/login"}>
            <LoginScreen />
          </Route>
          <Route path={"/users/register"}>
            <RegisterScreen />
          </Route>
          <Route path={"/users/profile"}>
            <ProfileScreen />
          </Route>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center", backgroundColor: "#fff" }}>
          <Footer />
        </Layout.Footer>
      </Layout>
    </BrowserRouter>
  )
}

export default App
