import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";

const PaymentSuccess = () => {
  const axiosInstance = useAxios();
  // get session id from the url after payment
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosInstance]);
  return (
    <div className="p-4">
      <h2>Payment Successful</h2>
    </div>
  );
};

export default PaymentSuccess;
