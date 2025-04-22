import { Activity } from "../types"

//* Acciones con los valores que se recibirán
export type ActivityActions = {
    //paylaod: lo que va a recibir
    type: 'save-activity', payload: { newActivity: Activity } 
}

type ActivityState = {
    activities: Activity[]
}

//* Valor inicial
export const initalState: ActivityState = {
    activities: []
}

//* Funciones y lógica
export const activityReducer = (
    state: ActivityState = initalState, 
    action: ActivityActions
) => {

    if ( action.type === 'save-activity' ) {
        // Lógica para actualizar el state
        
        // Devuelve el estado actualizado
        return {
            ...state,
            activities: [ ...state.activities, action.payload.newActivity ]
        }
    }

    return state 
}