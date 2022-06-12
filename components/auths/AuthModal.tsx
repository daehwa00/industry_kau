import React from "react";
import { RootState, useSelector } from "../../store";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

interface IProps {
  closeModalPortal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModalPortal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);
  return (
    <div>
      {authMode === "signup" && (
        <SignupModal closeModalPortal={closeModalPortal} />
      )}
      {authMode === "login" && (
        <LoginModal closeModalPortal={closeModalPortal} />
      )}
    </div>
  );
};
export default AuthModal;
