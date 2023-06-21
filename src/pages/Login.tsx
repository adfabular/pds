import { Button, Form, Input, notification } from "antd";
import login from "../assets/login.json";
import Lottie from "lottie-react";
import { ILogin } from "../models";
import { useNavigate } from "react-router-dom";
import { PostData } from "../api";
import { isNullOrUndefinedOrBlank } from "../helpers";
import useAppStore from "../store";
import Submitting from "./Submitting";
import Cookies from "js-cookie";
function Login() {
  const store = useAppStore();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  async function handleSubmit(v: ILogin) {
    store.SetSubmitting(true);
    const res = await PostData("LogIn", v);

    if (res) {
      store.SetSubmitting(false);
      if (res.status === 1) {
        notification.success({
          message: "Successfully logged in!",
          placement: "topRight",
          duration: 3,
        });
        store.SetFirstname(res.parameters.Firstname);
        store.SetTokenId(res.parameters.TokenId);
        store.SetEmployeeId(res.parameters.EmployeeId);
        Cookies.set("TokenId", res.parameters.TokenId);
        navigate("/");
      } else {
        notification.error({
          message: res.message,
          placement: "topRight",
          duration: 3,
        });
      }
    }
  }
  function handleRegister() {
    navigate("/register");
  }
  async function handleForgotPassword() {
    try {
      const Email = form.getFieldValue("Email");

      if (isNullOrUndefinedOrBlank(Email)) {
        notification.error({
          message: "Email address is required!",
          placement: "topRight",
          duration: 5,
        });
        return;
      }
      store.SetSubmitting(true);
      const res = await PostData("ForgotPassword", {
        Email: Email,
      });
      if (res) {
        store.SetSubmitting(false);
        if (res.status === 1) {
          notification.success({
            message: "We have successfully emailed your temporary password!",
            placement: "topRight",
            duration: 5,
          });
        } else {
          notification.error({
            message: res.message,
            placement: "topRight",
            duration: 5,
          });
        }
      }
    } catch (error) {}
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-2">
      <div>
        <div className="cardBackGround  mx-auto  mt-16  lg:mt-32 max-w-xl">
          <div className="text-center font-bold">Login</div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            scrollToFirstError
          >
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
                  message: "Invalid Email Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="PasswordPds"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex justify-between">
              <Button
                type="primary"
                htmlType="submit"
                disabled={store.Submitting}
              >
                Login
              </Button>
              <Button
                type="link"
                onClick={handleRegister}
                disabled={store.Submitting}
              >
                Not registered click here
              </Button>
            </div>
            <div className="mt-2">
              {store.Submitting === true ? (
                <Submitting />
              ) : (
                <Button type="link" onClick={handleForgotPassword}>
                  Forgot password
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
      <div className="invisible lg:visible">
        <Lottie animationData={login} loop={true} style={{ height: 500 }} />
      </div>
    </div>
  );
}

export default Login;
