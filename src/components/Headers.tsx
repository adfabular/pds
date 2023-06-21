import useAppStore from "../store";
import { Layout, Menu, MenuProps, Modal } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const { Header } = Layout;
function Headersx() {
  const navigate = useNavigate();
  const [showLogOut, setShowLogOut] = useState(false);
  const store = useAppStore();
  const [current, setCurrent] = useState("mnuHome");
  const items: MenuProps["items"] = [
    {
      label: "Home",
      key: "mnuHome",
      icon: <HomeOutlined />,
    },
    {
      label: "Personal Information",
      key: "mnuPersonalInformation",
      icon: <ProfileOutlined />,
    },
    {
      label: "My Payslips",
      key: "mnuMyPaySlips",
      icon: <ProfileOutlined />,
    },
  ];

  const items2: MenuProps["items"] = [
    {
      label: store.Firstname,
      key: "mnuUsername",
      icon: <UserOutlined />,
      children: [
        {
          label: "Change Password",
          key: "mnuChangePassword",
          icon: <EditOutlined />,
        },
        {
          label: "Logout",
          key: "mnuLogOut",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "mnuHome") {
      navigate("/");
    } else if (e.key === "mnuUsers") {
      navigate("/users");
    } else if (e.key === "mnuMyPaySlips") {
      navigate("/mypayslips");
    } else if (e.key === "mnuPersonalInformation") {
      navigate("/personalinformation");
    }
  };
  const handleMenuClickUser: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "mnuChangePassword") {
      navigate(`/changepassword`);
    } else if (e.key === "mnuLogOut") {
      setShowLogOut(true);
    }
  };
  const handleLogOut = () => {
    setShowLogOut(false);
    store.SetTokenId("");
    Cookies.remove("TokenId");
  };
  return (
    <>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="col-span-10">
            <Menu
              theme="dark"
              onClick={handleMenuClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </div>
          <div className="col-span-2">
            <Menu
              theme="dark"
              onClick={handleMenuClickUser}
              mode="horizontal"
              items={items2}
            />
          </div>
        </div>
      </Header>

      <Modal
        title="Logout"
        open={showLogOut}
        onOk={handleLogOut}
        onCancel={() => setShowLogOut(false)}
        okText="Yes"
        cancelText="No"
      >
        Logout Application Now?
      </Modal>
    </>
  );
}

export default Headersx;
