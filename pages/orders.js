import React, {useState, useEffect} from "react";
import BasicLayout from "../layouts/BasicLayout";
import {Grid} from "semantic-ui-react";
import {map, size} from "lodash";
import {getOrdersApi} from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from '../components/Orders';


export default function Orders() {
  const [orders, setOrders] = useState(null);

  const {auth, logOut} = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logOut);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <div className="orders__block">
        <div className="title">MIS PEDIDOS</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{textAlign: "center"}}>
              Todavía no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList(props) {
  const {orders} = props;

  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} table={6} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
