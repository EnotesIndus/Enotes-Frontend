import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function VerifyPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const uid = searchParams.get("uid");
    const code = searchParams.get("code");

    axios.post("http://localhost:8080/enotes/api/v1/home/verify", {
      uid,
      code
    });
  }, []);

  return <h2>Verifying your account...</h2>;
}

export default VerifyPage;