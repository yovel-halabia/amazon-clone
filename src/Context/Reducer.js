export const initialState = {
    basket:[],
    user:null,
}

export const getBasketTotal = (basket)=> basket.reduce((amount,item) => (parseInt(item.price) *  parseInt(item.qty))+ amount,0);
export const getBasketLength = (basket) => basket.reduce((length,item)=> parseInt(item.qty) + length,0);
export const checkQty = (basket,id) => {return basket.some((item)=> item.id == id && item.qty ==5)};


const reducer = (state,action) =>{
    switch(action.type){
        case 'SET_STATE':
            return {
                ...action.state,
            };
        case 'ADD_TO_BASKET':
            if(state.basket.some(item => item.id == action.item.id)){
                return {
                    ...state,
                    basket: state.basket.map(item =>{
                        if(item.id == action.item.id)
                            return {
                                ...item,
                                qty: (parseInt(item.qty) + parseInt(action.item.qty) >= 5? 5 : parseInt(item.qty) + parseInt(action.item.qty))
                            }
                        
                        else
                            return item;
                    })
                }
            }else{
                return {
                    ...state,
                    basket:[...state.basket,action.item],
                }
            }
        case 'UPDATE_ITEM':
            return{
                ...state,
                basket: state.basket.map(item =>{
                    if(item.id == action.item.id)
                    return action.item;
                    else
                    return item;
                })
            }
        case 'REMOVE_FROM_BASKET':
            let isRemoved = false;
            return{
                ...state,
                basket:state.basket.filter((item) => {
                    if(item.id == action.id && !isRemoved){
                        isRemoved = true;
                        return;
                    }else
                    return item;
                })
            }
        case 'REMOVE_ALL_FROM_BASKET':
            return{
                ...state,
                basket:[]
            }
        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }
        case 'SHOW_ALERT':
            return {
                ...state,
                showMssg:action.showMssg
            }
        default:
            alert('wrong dispatch name');
            return state;

    }

}

export default reducer;