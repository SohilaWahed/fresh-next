import { getMyToken } from "@/utilities/getMyToken"
import { jwtDecode } from "jwt-decode"
import AllOrders from "../_/components/AllOrders/AllOrders"
import { allOrdersType } from "@/types/orders.type"

export default async function Orders() {
  const token = await getMyToken()
 const user = token ? jwtDecode<allOrdersType>(token) : null;
  return <>
  <AllOrders user={user} />
  </>
}