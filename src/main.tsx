import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { BrowserRouter as Router } from "react-router-dom";

//theme
import "primereact/resources/themes/fluent-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#01579B",
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </ConfigProvider>
  </Router>
);
