import React, {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {registerApi} from "../../../api/user";

export default function RegisterForm(props) {
  const {showLoginForm} = props;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerApi(formData);
      console.log(response);
      if (response?.jwt) {
        toast.success(
          "TE HAS REGISTRADO CORRECTAMENTE, YA ERES PARTE DE PARCHESBORDADOSPRO"
        );

        showLoginForm();
      } else {
        toast.error("ERROR EN EL REGISTRO");
      }
      setLoading(false);
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      ></Form.Input>
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      ></Form.Input>
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de Usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      ></Form.Input>
      <Form.Input
        name="email"
        type="text"
        placeholder="Tu email "
        onChange={formik.handleChange}
        error={formik.errors.email}
      ></Form.Input>
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      ></Form.Input>

      <div className="actions">
        <Button type="button" basic onClick={showLoginForm}>
          Iniciar Sesion
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("El Nombre es Obligatorio"),
    lastname: Yup.string().required("El Apellido es Obligatorio"),
    username: Yup.string().required("El Nombre de Usuario es Obligatorio"),
    email: Yup.string().email(true).required("El email es Obligatorio"),
    password: Yup.string().required("La Contraseña  es Obligatorio"),
  };
}
