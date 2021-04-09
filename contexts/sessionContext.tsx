import React, { createContext, ReactNode, useContext } from "react"
import { Interpreter, State, PayloadSender } from "xstate"
import { useInterpret, useService } from "@xstate/react"
import sessionMachine, {
  Context,
  Events
} from "../machines/sessionMachine.machine"

type SessionContextProps = { children: ReactNode }

type ServiceType = Interpreter<
  Context,
  any,
  Events,
  { value: any; context: Context }
>

type UseServiceHookValue = [State<Context, Events>, PayloadSender<Events>]

export const SessionContext = createContext<ServiceType | undefined>(
  undefined
)

function SessionProvider({
  children
}: SessionContextProps): any {
  const service = useInterpret(sessionMachine)

  return (
    <SessionContext.Provider value={service}>
      {children}
    </SessionContext.Provider>
  )
}

function useSession(): UseServiceHookValue {
  const context = useContext(SessionContext)

  if (context === undefined) {
    throw new Error(
      "useSession must be used within a SessionProviderProps"
    )
  }

  return useService(context)
}

export { SessionProvider, useSession }