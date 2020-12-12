import React, { useEffect } from "react"
import { Form, Input, Button, Checkbox, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../ducks/user"
import { RootState } from "../store"
import { Link, useHistory } from "react-router-dom"

message.config({ maxCount: 1 })

export default function LoginScreen() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { error, loading, user }: any = useSelector(
    (state: RootState) => state.users
  )
  function onFinish({ email, password }: { email: string; password: string }) {
    dispatch(login(email, password))
  }
  useEffect(() => {
    loading && message.loading("Wait, please...")
    error && message.error(error)
    user && message.success(`${user.name} successfully logged in!`)
    user && history.push("/users/profile")
  }, [error, loading, user])
  return (
    <>
      <Form
        labelCol={{ span: 5 }}
        name="basic"
        initialValues={{ remember: true }}
        style={{ maxWidth: 400, margin: "auto" }}
        onFinish={onFinish}
      >
        <h1>SIGN IN</h1>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Please input your e-mail address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <p>
          Don't have an account?{" "}
          <Link style={{ fontWeight: "bold" }} to={"/users/register"}>
            Register
          </Link>
        </p>
      </Form>
    </>
  )
}
