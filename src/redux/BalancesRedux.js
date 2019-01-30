//@flow
import { from } from "rxjs"
import { filter, switchMap, flatMap } from "rxjs/operators"

// api
import { getPrice } from "../services/api"

export const initialState = {
    loading: false,
    items: [
        {name: 'Bitcon', price: number},
        {name: 'Ethereum', price: number},
        {name: 'Ripple', price: number},
        {name: 'Bitcoin Cash', price: number},
        {name: 'EOS', price: number},
        {name: 'Cardano', price: number},
        {name: 'Litecoin', price: number},
        {name: 'Tron', price: number},
        {name: 'Tether', price: number},
        {name: 'NEO', price: number}
    ],
    error: null,
}

export const onPriceRequest = () => ({
    type: "ON_PRICE_REQUEST",
})
export const onPriceSuccess = prices => ({
    type: "ON_PRICE_SUCCESS",
    prices,
})
export const onPriceFail = error => ({
    type: "ON_PRICE_FAIL",
    error,
})

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ON_PRICE_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "ON_PRICE_SUCCESS":
            return {
                ...state,
                loading: false,
                items: action.prices.results,
            }
        case "ON_PRICE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state
    }
}

export const pricesRequestEpic = action$ =>
    action$.pipe(
        filter(action => action.type === "ON_PRICE_REQUEST"),
        switchMap(() =>
            from(getPrice()).pipe(
                flatMap(response => from([onPriceSuccess(response.data)])),
            ),
        ),
    )
