import Lottie from "lottie-react";
import notfound from "../assets/404.json";
function NotFound() {
  return (
    <div className="mt-auto">
      <Lottie animationData={notfound} loop={true} style={{ height: 300 }} />
    </div>
  );
}

export default NotFound;
