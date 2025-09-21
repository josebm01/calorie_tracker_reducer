import { CalorieDisplay } from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export const CalorieTracker = () => {

    const { caloriesConsumed, caloriesBurned, netCalories } = useActivity()

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorías
      </h2>

      <div className="flex flexcol items-center md:flex-row md:justify-between gap-5 mt-10">
          <CalorieDisplay 
              calories={caloriesConsumed}
              text="Consumidas"
          />
          <CalorieDisplay 
              calories={caloriesBurned}
              text="quemadas"
          />
          <CalorieDisplay 
              calories={netCalories}
              text="Diferencia"
          />
      </div>
    </>
  );
};
