
import { OrderInfo } from "./order-info";
import {useLocation} from 'react-router-dom'
import { useSelector } from "react-redux";
export function OrderFull () {
    const {orders} = useSelector(store => store.ws)
    if (!orders) return null
   return <OrderInfo />
}