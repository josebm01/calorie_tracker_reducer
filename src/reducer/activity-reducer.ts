import { Activity } from "../types"

//* Acciones con los valores que se recibirán
//paylaod: lo que va a recibir
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' } 

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')

    return activities ? JSON.parse(activities) : []
}

//* Valor inicial
export const initalState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

//* Funciones y lógica
export const activityReducer = (
    state: ActivityState = initalState, 
    action: ActivityActions
) => {

    // Crear actividad
    if ( action.type === 'save-activity' ) {
        // Lógica para actualizar el state

        let updatedActivities: Activity[] = [];

        if ( state.activeId ) {
            // Actualizamos el state con la actividad seleccionada para actualizarla
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [ ...state.activities, action.payload.newActivity ]     
        }
        
        // Devuelve el estado actualizado
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    // Editar actividad
    if ( action.type === 'set-activeId' ) {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    // Eliminar actividad
    if ( action.type === 'delete-activity' ) {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )
        }
    }

    // Eliminar todas las actividades 
    if ( action.type === 'restart-app' ) {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state 
}