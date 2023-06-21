import { Button, Form, Input, notification } from "antd";
import useAppStore from "../store";
import { PostData } from "../api";
import { IChangePassword } from "../models";
import Submitting from "./Submitting";

function ChangePassword() {
  const store = useAppStore();
  const [form] = Form.useForm();
  const handleSubmit = async (v: IChangePassword) => {
    store.SetSubmitting(true);
    v.EmployeeID = store.EmployeeId;
    const res = await PostData("ChangePassword", v);
    if (res) {
      store.SetSubmitting(false);
      if (res.status === 1) {
        notification.success({
          message: "Password successfully changed",
          placement: "topRight",
          duration: 3,
        });
        store.SetFirstname("");
        store.SetEmployeeId("");
        store.SetTokenId("");
      } else {
        notification.error({
          message: res.message,
          placement: "topRight",
          duration: 3,
        });
      }
    }
  };

  return (
    <div className="max-w-md cardBackGround mx-auto mt-8">
      <div className="text-center font-bold">Change Password</div>
      <Form
        form={form}
        layout="vertical"
        scrollToFirstError
        onFinish={handleSubmit}
      >
        <Form.Item
          name="OldPassword"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Old Password is required!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="NewPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "New Password is required!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="ConfirmPassword"
          label="Confirm New Password"
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("NewPassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {store.Submitting === false ? (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ) : (
          <Submitting />
        )}
      </Form>
    </div>
  );
}

export default ChangePassword;
