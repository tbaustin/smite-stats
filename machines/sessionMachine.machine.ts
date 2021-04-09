import { createMachine, assign } from "@xstate/compiled"
import axios from 'axios'

import { InvokeCallbackType } from "./types"

export type Events = 
  | { type: "SESSION_FOUND", data: string } 
  | { type: "SESSION_NOT_FOUND"}

export type Context = {
  session: string | null
}

const key = "smite-session"

const sessionMachine = createMachine<Context, Events, "session">({
  id: "session",
  initial: "checkingForSession",
  context: {
    session: null
  },
  states: {
    checkingForSession: {
      invoke: {
        src: "checkingForSession"
      },
      on: {
        SESSION_FOUND: {
          target: "idle",
          actions: ["saveSession"]
        },
        SESSION_NOT_FOUND: {
          target: "creatingSession"
        }
      }
    },
    creatingSession: {
      invoke: {
        src: "creatingSession"
      }
    },
    idle: {
      type: "final"
    }
  }
}, {
  services: {
    checkingForSession: () => (cb: InvokeCallbackType) => {
      const session = localStorage.getItem(key)
      if(session) {
        cb({ type:"SESSION_FOUND", data: session })
      } else {
        cb("SESSION_NOT_FOUND")
      }
    },
    creatingSession: () => async (cb: InvokeCallbackType) => {
      const { data } = await axios.get('/api/createSession')
      console.log(`Session: `, data)
    }
  },
  actions: {
    saveSession: assign({
      session: (_, eve) => eve.data
    })
  }
})

export default sessionMachine