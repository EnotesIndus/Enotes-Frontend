import { useSearchParams } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";

export default function ResetPasswordForm() {
  const [params] = useSearchParams();

  const uid = params.get("uid");
  const resetCode = params.get("resetCode");

  return (
    <div>
      <h2>Reset Password</h2>
      <p>User ID: {uid}</p>
      <p>Reset Code: {resetCode}</p>
      <ResetPassword/>
    </div>
  );
}
