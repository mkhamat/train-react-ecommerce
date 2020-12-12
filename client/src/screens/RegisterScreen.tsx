import React, { useEffect } from "react"
import { Form, Input, Button, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../ducks/user"
import { RootState } from "../store"
import { Link, useHistory } from "react-router-dom"

message.config({ maxCount: 1 })

export default function RegisterScreen() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { error, loading, user }: any = useSelector(
    (state: RootState) => state.users
  )
  function onFinish({
    name,
    email,
    password,
    confirm,
  }: {
    name: string
    email: string
    password: string
    confirm: string
  }) {
    dispatch(register(name, email, password))
  }
  useEffect(() => {
    loading && message.loading("Wait, please...")
    error && message.error(error)
    user && message.success(`${user.name} successfully registered!`)
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
        <h1>SIGN UP</h1>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Please input your e-mail address" },
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
        <Form.Item
          label="Confirm"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                )
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
