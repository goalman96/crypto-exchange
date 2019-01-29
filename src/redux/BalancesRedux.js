import { from } from "rxjs"
import { filter, switchMap, flatMap } from "rxjs/operators"

// api
import { getPrice } from "../services/api"

export const initialState = {
    loading: false,
    items: [],
    error: null,
}

export const onPriceRequest = () => ({
    type: "ON_PRICE_REQUEST",
})
export const onPriceSuccess = movies => ({
    type: "ON_PRICE_SUCCESS",
    movies,
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
                items: action.movies.results,
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

export const moviesRequestEpic = action$ =>
    action$.pipe(
        filter(action => action.type === "ON_PRICE_REQUEST"),
        switchMap(() =>
            from(getPrice()).pipe(
                flatMap(response => from([onMoviesSuccess(response.data)])),
            ),
        ),
    )
