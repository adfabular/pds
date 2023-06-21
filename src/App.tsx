import useAppStore from "./store";
import AuthRoute from "./auth/AuthRoute";
import AppRoute from "./auth/AppRoute";
import { Layout, theme } from "antd";
import Footerx from "./components/Footer";
import Siderx from "./components/Siderx";

const { Content } = Layout;
function App() {
  const store = useAppStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {store.TokenId !== "" && <Siderx />}
        <Layout
          style={
            store.TokenId !== ""
              ? store.Collapsed
                ? { marginLeft: 80, marginTop: 12 }
                : { marginLeft: 200, marginTop: 12 }
              : { marginLeft: 0, marginTop: 40 }
          }
        >
          <Content style={{ margin: "0 8px" }}>
            <div
              style={{
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {store.TokenId === "" ? <AuthRoute /> : <AppRoute />}
            </div>
          </Content>
          <Footerx />
        </Layout>
      </Layout>
    </>
  );
}

export default App;
