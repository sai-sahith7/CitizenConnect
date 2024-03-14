import instance from "./init";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const sendOtp = async (aadhaar_number) => {
  try {
    await instance
      .post("/auth/otp", { aadhaar_number })
      .then((res) => {
        res.data.refId && cookies.set("refId", res.data.refId, { path: "/" });
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  } catch (error) {
    return error.response.data;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const refId = cookies.get("refId");
    await instance
      .post("/auth/verify", { refId, otp })
      .then((res) => {
        cookies.set("user", res.data, { path: "/" });
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  } catch (error) {
    return error.response.data;
  }
};
