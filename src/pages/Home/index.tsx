import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useState, useEffect } from "react";
import {differenceInSeconds} from 'date-fns'
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


export function Home(){
  interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupetdDate?: Date,
    finishedDate?: Date,
  }
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  
  function handleCreateNewCycle(data: NewCycleFormData) {
      const id = String(new Date().getTime())
      const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date()
      }
      setCycles(state=> [...state, newCycle])
      setActiveCycleId(id)
      setAmountSecondsPassed(0);
      reset();
  }

  function handleInterruptCycle() {
    setCycles( state => state.map(cycle => {
      if(cycle.id === activeCycleId) {
        return {...cycle, InterruptedDate: new Date()}
      } else {
        return cycle
      }
    }))
    setActiveCycleId(null)
  }
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutsAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutsAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2,'0');
  useEffect(() =>{
    if(activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  },[minutes, seconds, activeCycle])
  
  const task = watch('task');
  const isSubmitDisabled = !task;
  return (
  <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="" >
      <NewCycleForm />
      <Countdown activeCycle={activeCycle} setCycles={setCycles}/>
      {activeCycle ? (
              <StopCountdownButton  type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24}/>
              Começar
            </StopCountdownButton>
      ) : (
        <StartCountdownButton  type="submit" disabled={isSubmitDisabled}>
        <Play size={24}/>
        Começar
      </StartCountdownButton>
      )}
    </form>
  </HomeContainer>
  )
}
