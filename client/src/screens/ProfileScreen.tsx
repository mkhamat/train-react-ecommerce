import React, { useEffect } from "react"
import { Form, Input, Button, message, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../ducks/user"
import { RootState } from "../store"
import { Link, useHistory } from "react-router-dom"

message.config({ maxCount: 1 })

export default function ProfileScreen() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { error, loading, user }: any = useSelector(
    (state: RootState) => state.users
  )
  function onFinish({
    name,
    email,
    password,
  }: {
    name?: string
    email?: string
    password?: string
  }) {
    dispatch(update(name, email, password))
    if (error) message.error(error)
    else message.success("Succeffuly updated")
  }
  return (
    <>
      <Row justify={"center"}>
        <Col span={10}>
          <Form
            labelCol={{ span: 5 }}
            name="basic"
            initialValues={{ remember: true }}
            style={{ maxWidth: 400, margin: "auto" }}
            onFinish={onFinish}
          >
            <h1>USER PROFILE</h1>
            <Form.Item label="Full Name" name="name" initialValue={user.name}>
              <Input />
            </Form.Item>
            <Form.Item label="E-mail" name="email" initialValue={user.email}>
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm"
              name="confirm"
              dependencies={["password"]}
              rules={[
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
                Update user info
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={10}>
          <h1>ORDERS</h1>
        </Col>
      </Row>
    </>
  )
}
