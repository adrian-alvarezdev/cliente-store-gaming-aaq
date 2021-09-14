import React, {useMemo, useState, useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import {useRouter} from "next/router";
import {setToken, getToken, removeToken} from "../api/token/token";
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart,
} from "../api/cart";

import CartContext from "../context/CartContext";

import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import {getDomainLocale} from "next/dist/next-server/lib/router/router";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({Component, pageProps}) {
  const [auth, setAuth] = useState(undefined);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);

  const [realoadUser, setReloadUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [realoadUser]);

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logOut = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/ ");
    }
  };

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar un juego tienes que iniciar sesión");
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logOut,
      setReloadUser,
    }),
    [auth]
  );

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />;
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocus={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
