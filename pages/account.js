import React, {useState, useEffect} from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import {Icon} from "semantic-ui-react";
import {useRouter} from "next/router";
import useAuth from "../hooks/useAuth";
import {getMeApi} from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AdressForm from "../components/Account/AddressForm/AdressForm";
import ListAddress from "../components/Account/ListAddress";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const {auth, logOut, setReloadUser} = useAuth();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logOut);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logOut={logOut}
        setReloadUser={setReloadUser}
      />
    </BasicLayout>
  );
}

function Configuration(props) {
  const {user, logOut, setReloadUser} = props;
  return (
    <div className="account__configuration">
      <div className="title">CONFIGURACION</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logOut={logOut}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logOut={logOut}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm 
        user={user} 
        logOut={logOut} 
        />
      </div>
      <Addresses />
    </div>
  );
}

function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddreses, setReloadAddreses] = useState(false);

  const openModal = (title, direccion) => {
    setTitleModal(title);
    setFormModal(
      <AdressForm
        setShowModal={setShowModal}
        setReloadAddreses={setReloadAddreses}
        newAddress={direccion ? false : true}
        address={direccion || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon
          name="plus"
          Link
          onClick={() => openModal("NUEVA DIRECCION AHORA")}
        />
      </div>
      <div className="data">
        <ListAddress
          reloadAddreses={reloadAddreses}
          setReloadAddreses={setReloadAddreses}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
