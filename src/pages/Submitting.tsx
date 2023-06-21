import Lottie from "lottie-react";
import submitting from "../assets/submitting.json";
function Submitting() {
  return (
    <div className="mt-auto">
      <Lottie animationData={submitting} loop={true} style={{ height: 100 }} />
    </div>
  );
}

export default Submitting;
