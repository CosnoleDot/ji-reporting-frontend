import React, { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
export const ReCaptcha = ({ setCaptchaVerified }) => {
  const onChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };
  const hanleError = (e) => {
    console.log(e.target.value);
    setCaptchaVerified(false);
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.recaptcha.net/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div>
      <ReCAPTCHA
        sitekey="6LcxPggqAAAAALk-MSrE3HzcHKYlI99M2V6yvkJJ"
        onChange={onChange}
        theme="light"
        onErrored={hanleError}
        type="image"
        hl="en"
        badge="bottom-right"
        onExpired={() => setCaptchaVerified(false)}
      />
    </div>
  );
};
