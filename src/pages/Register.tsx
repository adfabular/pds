import { Alert, Button, DatePicker, Form, Input, notification } from "antd";
import { IEmployeeInfo } from "../models";
import useAppStore from "../store";
import Submitting from "./Submitting";
import { PostData } from "../api";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const store = useAppStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  async function handleSubmit(v: IEmployeeInfo) {
    store.SetSubmitting(true);
    const res = await PostData("SaveRegistration", {
      ...v,
      BirthDate: dayjs(v.BirthDate).format("YYYY-MM-DD"),
    });
    if (res) {
      store.SetSubmitting(false);
      if (res.status === 1) {
        setShowSuccess(true);
      } else {
        notification.error({
          message: res.message,
          placement: "topRight",
          duration: 5,
        });
      }
    }
  }
  return (
    <div className="max-w-lg mx-auto mt-8 cardBackGround ">
      <div className="font-bold text-center">Account Registration</div>
      {showSuccess === false && (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="EmployeeID"
            label="Employee Id"
            rules={[
              {
                required: true,
                message: "Employee Id is required!",
              },
            ]}
            extra="Don't know your employee Id please contact the HR dept."
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="LName"
            label="Lastname"
            rules={[
              {
                required: true,
                message: "Lastname is required!",
              },
            ]}
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="FName"
            label="Firstname"
            rules={[
              {
                required: true,
                message: "Firstname is required!",
              },
            ]}
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="MName"
            label="Middlename"
            rules={[
              {
                required: true,
                message: "Middlename is required!",
              },
            ]}
            normalize={(v) => v.toUpperCase()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="BirthDate"
            label="Birth Date"
            rules={[
              {
                required: true,
                message: "Birth date is required!",
              },
            ]}
          >
            <DatePicker format="MM/DD/YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email Address"
            rules={[
              {
                required: true,
                message: "Email address is required!",
              },
              {
                type: "email",
                message: "Email address is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {showSuccess === false && (
            <div>
              {store.Submitting === true ? (
                <Submitting />
              ) : (
                <div className="flex justify-between">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button type="primary" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                </div>
              )}
            </div>
          )}
        </Form>
      )}
      {showSuccess === true && (
        <>
          <div className="mb-2">
            <Alert
              // message="Success Tips"
              description="Please check your email for your temporary password!"
              type="success"
              showIcon
            />

            <Button
              className="mt-2"
              type="primary"
              onClick={() => navigate("/login")}
            >
              Click here to login!
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Register;
