import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetPasswordToken } from "../redux/users/userThunks";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uid = params.get("uid");
  const resetCode = params.get("resetCode");

const { isSuccess, isError, isLoading } = useSelector(
  (state) => state.user.verifyToken || {}
);

  useEffect(() => {
    if (uid && resetCode) {
      dispatch(
  verifyResetPasswordToken({
    uid,
    resetCode
  })
      );
    }
  }, [uid, resetCode, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/reset-password-form?uid=${uid}&resetCode=${resetCode}`);
    }
  }, [isSuccess, navigate, uid, resetCode]);

  if (isError) return <p>Invalid or expired reset link</p>;

  return <p>Verifying reset link...</p>;
}
