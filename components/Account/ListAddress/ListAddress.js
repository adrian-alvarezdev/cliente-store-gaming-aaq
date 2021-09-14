import React, {useState, useEffect} from "react";
import {Grid, Button} from "semantic-ui-react";
import {map, size} from "lodash";
import {getAddressesApi, deleteAddressApi} from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress(props) {
  const {reloadAddreses, setReloadAddreses,openModal} = props;

  const [addresses, setAddresses] = useState(null);
  const {auth, logOut} = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logOut);
      setAddresses(response || []);
      setReloadAddreses(false);
    })();
  }, [reloadAddreses]);
  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h2>NO HAY DIRECCIONES</h2>
      ) : (
        <Grid>
          {map(addresses, (direccion) => (
            <Grid.Column key={direccion.id} mobile={16} tablet={8} computer={4}>
              <Address
                direccion={direccion}
                logOut={logOut}
                setReloadAddreses={setReloadAddreses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const {direccion, logOut, setReloadAddreses, openModal} = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(direccion._id, logOut);
    if (response) setReloadAddreses(true);
    setLoadingDelete(false);
  };

  return (
    <div className="direccion">
      <p>{direccion.title}</p>

      <p>{direccion.name}</p>
      <p>{direccion.address}</p>
      <p>
        {direccion.state}, {direccion.city} {direccion.postalCode}
      </p>
      <p>{direccion.phone}</p>

      <div className="actions">
        <Button primary 
        onClick={() => openModal(`Editar: ${direccion.title}`,direccion)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
