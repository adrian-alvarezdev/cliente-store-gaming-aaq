import React, {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {updateNameApi} from "../../../api/user";

export default function ChangeNameForm(props) {
  const {user, logOut, setReloadUser} = props;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameApi(user.id, formData, logOut);
      if (!response) {
        toast.error("Error al actualizar el nombre y apellidos");
      } else {
        setReloadUser(true);
        toast.success("Nombre y apellidos actualizado");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>
        Cambia tu Nombre y Apellido
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="name"
              placeholder="Tu nuevo nombre"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
            <Form.Input
              name="lastname"
              placeholder="Tu nuevos Apellidos"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              error={formik.errors.lastname}
            />
          </Form.Group>
          <Button className="submit" loading={loading}>
            Actualizar
          </Button>
        </Form>
      </h4>
    </div>
  );
}

function initialValues(name, lastname) {
  return {
    name: name || "",
    lastname: lastname || "",
  };
}
function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}
