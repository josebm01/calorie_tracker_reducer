import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4} from 'uuid'

import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducer/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export const Form = ({ dispatch, state }: FormProps) => {


    const [activity, setActivity] = useState<Activity>(initialState)

    // Seteamos el valor de la actividad seleccionada para editar
    useEffect(() => {
      if ( state.activeId ) {
        const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
        setActivity( selectedActivity )
      }
    }, [state.activeId])
    


    // Función que sirve para extraer los valores de un select o inputs
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {

        // Validamos que estemos en los inputs de categoría y calorías para ingresar números
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        // Convertimos a número
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value  
        })
    }

    // Función para validar que se tengan los campos llenos de actividad y calorías
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    // Función para guardar los datos
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: 'save-activity',
            payload: {
                newActivity: activity
            }
        })

        setActivity({
            ...initialState,
            id: uuidv4()
        })

    }

  return (
    <form 
        className="space-y-5 bg-white shaow p-10 rounded-lg"
        onSubmit={handleSubmit}    
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          name="category"
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={ activity.category }
          onChange={ handleChange }
        >
          {
            categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))
          }
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, ensalada, ejercicio, pesas, caminata, etc"
          value={ activity.name }
          onChange={ handleChange }
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías: Ej. 300 o 500"
          value={ activity.calories }
          onChange={ handleChange }
        />
      </div>

      <input
        type="submit"
        className="bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed enabled:hover:bg-gray-700"
        value={ activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio' } 
        disabled={!isValidActivity()}
      />
    </form>
  );
};
