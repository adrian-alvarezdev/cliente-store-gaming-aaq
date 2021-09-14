import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {
  const {onCloseModal, setTitleModal} = props;
  const [showLogin, setshowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal("INICIA SESION");
    setshowLogin(true);
  };

  const showRegisterForm = () => {
    setTitleModal("REGISTRA TU CUENTA AQUI");
    setshowLogin(false);
  };

  return showLogin ? (
    <LoginForm showRegisterForm={showRegisterForm}
    onCloseModal= {onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
