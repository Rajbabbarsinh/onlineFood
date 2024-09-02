const INIT_STATE = {
    carts: []
};

export const cartreducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":
            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                // Create a new array with the updated quantity for the existing item
                const updatedCarts = state.carts.map((item, index) =>
                    index === itemIndex
                        ? { ...item, qnty: item.qnty + 1 }
                        : item
                );
                return {
                    ...state,
                    carts: updatedCarts
                };
            } else {
                // Add new item to the cart
                const temp = { ...action.payload, qnty: 1 };
                return {
                    ...state,
                    carts: [...state.carts, temp]
                };
            }

        case "RMV_CART":
            const filteredCarts = state.carts.filter((el) => el.id !== action.payload);
            return {
                ...state,
                carts: filteredCarts
            };

            case "RMV_ONE":
                const itemIndexDec = state.carts.findIndex((item) => item.id === action.payload.id);
            
                if (itemIndexDec >= 0) {
                    if (state.carts[itemIndexDec].qnty > 1) {
                        const updatedCarts = state.carts.map((item, index) =>
                            index === itemIndexDec
                                ? { ...item, qnty: item.qnty - 1 }
                                : item
                        );
                        return {
                            ...state,
                            carts: updatedCarts
                        };
                    } else {
                        // Remove the item entirely if quantity is 1
                        const updatedCarts = state.carts.filter((_, index) => index !== itemIndexDec);
                        return {
                            ...state,
                            carts: updatedCarts
                        };
                    }
                }
                return state;
            

        default:
            return state;
    }
};
