export const taskReducer=(state, action)=>{
    switch(action.type){

        case 'ADD_Task':
            return [...state, action.payload];

        case 'DELETE_Task':
            return state.filter((task)=> task.id !== action.payload);   

        case 'EDIT_Task':
            return state.map((task)=>
                task.id=== action.payload.id 
            ? {...task, text: action.payload.text}: task
            );
        default:
            return state;   
        }
    };