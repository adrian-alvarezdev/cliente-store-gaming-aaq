import React, {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import {createAddressApi, updateAddressApi} from "../../../api/address.js";
import {toast} from "react-toastify";

export default function AddressForm(props) {
  const {setShowModal, setReloadAddreses, newAddress, address} = props;
  const [loading, setLoading] = useState(false);
  const {auth, logOut} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logOut);

    if (!response) {
      toast.warning("Error al crear la dirección");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddreses(true);
      setLoading(false);
      setShowModal(false);
      toast.success("DIRECCION AGREGADA CORRECTAMENTE");
    }
  };

  const updateAddress = (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = updateAddressApi(address._id, formDataTemp, logOut);

    if (!response) {
      toast.warning("Error al actualizar la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddreses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Titulo de la Direccion"
        placeholder="Direccion, por eje. Direccion Principal"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apeliidos"
          placeholder="Nombre y apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Direccion Completa (Calle y Numero)"
          placeholder="Direccion Completa (Calle y Numero)"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado"
          placeholder="Estado"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Codigo Postal"
          placeholder="Codigo Postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Telefono"
          placeholder="Telefono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
      
    
          {newAddress ? "Crear dirección" : "Actualizar dirección"}
        </Button>
      </div>
    </Form>
  );
}

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required("Dato Obligatorio"),
    name: Yup.string().required("Dato Obligatorio"),
    address: Yup.string().required("Dato Obligatorio"),
    city: Yup.string().required("Dato Obligatorio"),
    state: Yup.string().required("Dato Obligatorio"),
    postalCode: Yup.string().required("Dato Obligatorio"),
    phone: Yup.string().required("Dato Obligatorio"),
  };
}

/* PASOS PARA VALIDAR FORMULARIOS CON FORMIK Y Yup
PASO 1 - IMPORTAMOS FORMIK Y YUP EN LA PARTE DE ARRIBA 
paso 2 - creamos la const formik linea 10
paso 3- creamos la funcion de initialvalues y la llamamos en la linea 10
paso 4 creamos la funcion initialvalues() y retornamos todos los valores y la llamos en la lineade los campor
paso 5- validamos el formulario con schema en linea 10
paso 6- creamos la funcion validacionSchema en la linea 169
paso 7- creamos el onsubmit en la const de la linea 10
paso 8. aplicamos formik al formulario. linea 19
paso 9- aplicamos : 
   onChange={formik.handleChange}
         value={formik.values.name}
         error={formik.errors.name} 

 en cada item del formulario        

 paso 10









*/
