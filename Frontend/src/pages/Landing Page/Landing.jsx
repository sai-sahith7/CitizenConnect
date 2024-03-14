import { useState } from "react";
import "./Landing.css";
const aadhaarAPI = require("../../api/aadhaar");

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");

  function handleAadhaarChange(e) {
    setAadhar(e.target.value);
  }

  function handleOTPChange(e) {
    setOtp(e.target.value);
  }

  const handleSendOtp = async () => {
    setLoading(true);
    await aadhaarAPI.sendOtp(aadhar).then((res) => {
      setLoading(false);
      if (res.refId) {
        setVerify(true);
      }
    });
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    await aadhaarAPI.verifyOtp(otp).then((res) => {
      setLoading(false);
      if (res.status === "VALID") {
        window.location.href = "/dashboard";
      }
    });
  };

  return (
    <div className="landing-page flex-container-row">
      <img
        className="background-image"
        src="/images/background.png"
        alt="background"
      />
      <div className="landing-page-left flex-container-row">
        <img
          className="landing-page-left-image flex-item"
          src="/images/indian-map.png"
          alt="India Map"
        />
        <p className="flex-item landing-page-left-para">
          Bridging Citizens and Solutions One Grievance at a Time.
        </p>
      </div>
      <div className="landing-page-right flex-container-column">
        <div className="landing-page-header-container flex-container-column">
          <h1 className="ladning-page-right-header flex-item">
            <section>C</section>itizen
          </h1>
          <h1 className="ladning-page-right-header flex-item">
            <section>C</section>onnect
          </h1>
        </div>
        <p className="landing-page-right-para flex-item">Get Started Now!</p>
        {verify ? (
          <div className="landing-page-right-input-container flex-container-row">
            <img
              src="/images/otp.png"
              alt="Aadhar"
              className="landing-page-right-input-image flex-item"
            />
            <input
              type="number"
              minLength={6}
              maxLength={6}
              placeholder="XXXXXX"
              className="landing-page-right-input flex-item"
              id="otp"
              onChange={handleOTPChange}
            />
          </div>
        ) : (
          <div className="landing-page-right-input-container flex-container-row">
            <img
              src="/images/aadhar.png"
              alt="Aadhar"
              className="landing-page-right-input-image flex-item"
            />
            <input
              type="number"
              minLength={12}
              maxLength={12}
              placeholder="XXXX XXXX XXXX"
              className="landing-page-right-input flex-item"
              id="aadhaar"
              onChange={handleAadhaarChange}
            />
          </div>
        )}
        {verify ? (
          <button
            onClick={handleVerifyOtp}
            className="landing-page-right-button flex-item"
          >
            {loading ? (
              <div className="chat-item-content-container flex-container-column">
                <section className="chat-item-content typing-animation-container flex-item flex-container-row">
                  <div className="typing dot1"></div>
                  <div className="typing dot2"></div>
                  <div className="typing dot3"></div>
                </section>
              </div>
            ) : (
              <div>Verify</div>
            )}
          </button>
        ) : (
          <button
            onClick={handleSendOtp}
            className="landing-page-right-button flex-item"
          >
            {loading ? (
              <div className="chat-item-content-container flex-container-column">
                <section className="chat-item-content typing-animation-container flex-item flex-container-row">
                  <div className="typing dot1"></div>
                  <div className="typing dot2"></div>
                  <div className="typing dot3"></div>
                </section>
              </div>
            ) : (
              <div>Send OTP</div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
