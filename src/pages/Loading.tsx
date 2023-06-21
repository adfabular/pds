import Lottie from "lottie-react";
import loading from "../assets/loading.json";
function Loading() {
  return (
    <div className="mt-auto">
      <Lottie animationData={loading} loop={true} style={{ height: 200 }} />
    </div>
  );
}

export default Loading;
