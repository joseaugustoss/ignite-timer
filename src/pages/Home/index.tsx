import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useState, useEffect, createContext } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}
interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interrupetdDate?: Date;
  finishedDate?: Date;
}
export const CycleContext = createContext({} as CycleContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }
  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime());
  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   };
  //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleId(id);
  //   setAmountSecondsPassed(0);
  //   reset();
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, InterruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  // const task = watch("task");
  // const isSubmitDisabled = !task;
  return (
    <HomeContainer>
      <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
        <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
          {/* <NewCycleForm /> */}
          <Countdown />
          {activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} />
              Começar
            </StopCountdownButton>
          ) : (
            <StartCountdownButton type="submit" /*disabled={isSubmitDisabled}*/>
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )}
        </form>
      </CycleContext.Provider>
    </HomeContainer>
  );
}
