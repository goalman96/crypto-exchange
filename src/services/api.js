import axiosLib from "axios"

export const axios = axiosLib.create({
    baseURL: "https://api.binance.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": "jY2gG6qVkzxIE1ME4KHyux6ZTsH0Lkz7OPrdnwBJMdsJoVHRDBtKNuLcn23Vr6TI",
        Accept: "application/json"
    },
})

const apiKey = "jY2gG6qVkzxIE1ME4KHyux6ZTsH0Lkz7OPrdnwBJMdsJoVHRDBtKNuLcn23Vr6TI"
axios.interceptors.request.use(request => ({
    ...request,
    url: request.url
}))

export const getPrice = (symbol) => axios.get(`/api/v3/avgPrice?${symbol}`)