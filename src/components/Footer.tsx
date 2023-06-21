import { Layout } from "antd";

const { Footer } = Layout;
const Footerx = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <div className="flex flex-row justify-center">
        <div className="mr-2">Personnel Data Sheet Powered By</div>

        <a
          href="https://comlogikph.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="mx-auto"
            src="/logo.png"
            alt="Comlogik Logo"
            width="128"
            height="16"
          />
        </a>
      </div>
    </Footer>
  );
};

export default Footerx;
