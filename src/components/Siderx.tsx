import { Layout, Menu, MenuProps, Modal } from "antd";
import useAppStore from "../store";
import {
  HomeOutlined,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { BsPersonCheck, BsReceiptCutoff } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
const { confirm } = Modal;
const Siderx = () => {
  const navigate = useNavigate();
  const store = useAppStore();

  const items: MenuProps["items"] = [
    {
      label: store.Firstname,
      key: "mnuUserInfo",
      icon: <UserOutlined />,
      children: [
        {
          label: "Change Password",
          key: "mnuChangePassword",
        },
        {
          label: "Logout",
          key: "mnuLogOut",
        },
      ],
    },
    {
      label: "Home",
      key: "mnuHome",
      icon: <HomeOutlined />,
    },
    {
      label: "Personal Info.",
      key: "mnuPersonalInformation",
      icon: <BsPersonCheck />,
    },
    {
      label: "Payslips",
      key: "mnuPaySlips",
      icon: <BsReceiptCutoff />,
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "mnuHome") {
      navigate("/");
    } else if (e.key === "mnuLogOut") {
      confirm({
        title: "Logout application now?",
        icon: <ExclamationCircleFilled />,
        content: "Logout",
        okText: "Yes",
        cancelText: "No",
        okType: "link",

        onOk() {
          store.SetTokenId("");
          store.SetFirstname("");
        },
        onCancel() {},
      });
    } else if (e.key === "mnuPersonalInformation") {
      navigate("/personalinformation");
    } else if (e.key === "mnuPaySlips") {
      navigate("/payslips");
    } else if (e.key === "mnuChangePassword") {
      navigate("/changepassword");
    }
    //
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={store.Collapsed}
        onCollapse={(value) => store.SetCollapsed(value)}
        breakpoint="md"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
    </>
  );
};

export default Siderx;
