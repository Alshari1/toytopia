import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"

const useOrders = () => {
    const { user } = useContext(AuthContext)

    const { refetch, data: orders = [], error, isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                throw new Error('User email is missing');
            }
            const res = await axios.get(`http://localhost:5000/orders/${user.email}`, {
                withCredentials: true
            })
            return res.data
        },
        enabled: !!user?.email // Only run the query if the user email exists
    })
    console.log(orders)
    return { refetch, orders, error, isLoading }
}

export default useOrders;
