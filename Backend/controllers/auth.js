const axios = require("axios");

const generateJWT = async () => {
  const options = {
    method: "POST",
    url: "https://api.sandbox.co.in/authenticate",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.API_KEY,
      "x-api-secret": process.env.API_SECRET,
      "x-api-version": "1.0",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateOTP = async (req, res) => {
  try {
    const { aadhaar_number } = req.body;
    // const aadhaar_number = "676445832086";

    const jwt = await generateJWT(); // Generate JWT token

    const options = {
      method: "POST",
      url: "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp",
      headers: {
        accept: "application/json",
        authorization: jwt,
        "x-api-key": process.env.API_KEY,
        "x-api-version": "1.0",
        "content-type": "application/json",
      },
      data: { aadhaar_number: "676445832086" },
    };

    const response = await axios.request(options);
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { ref_id, otp } = req.body;
    // const ref_id = "11522472";
    // const otp = "866044";
    const jwt = await generateJWT();
    const options = {
      method: "POST",
      url: "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify",
      headers: {
        accept: "application/json",
        authorization: jwt,
        "x-api-key": "key_live_c23TM6oUUH0mo5A9iOu4OAnPZiWnhGg7",
        "x-api-version": "1.0",
        "content-type": "application/json",
      },
      data: { ref_id: ref_id, otp: otp },
    };
    const response = await axios.request(options);
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const authController = {
  generateOTP,
  verifyOTP,
};

module.exports = authController;
