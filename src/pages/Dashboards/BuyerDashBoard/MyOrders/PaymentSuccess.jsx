import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import useTitle from "../../../../hooks/useTitle";

const PaymentSuccess = () => {
   useTitle("Payment Success");
  const axiosInstance = useAxios();
  // get session id from the url after payment
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({
    trackingId: "",
    transactionId: "",
  });
  console.log(sessionId);
  console.log("payment info", paymentInfo);

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosInstance]);
  return (
    <div className="p-4">
      <h2>Payment Successful</h2>
      <p>TrackingID: {paymentInfo.trackingId}</p>
      <p>TransactionId: {paymentInfo.transactionId}</p>
    </div>
  );
};

export default PaymentSuccess;
