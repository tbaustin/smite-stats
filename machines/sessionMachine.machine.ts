import { createMachine, assign } from "@xstate/compiled"
import axios from 'axios'

import { InvokeCallbackType } from "./types"

export type Events = 
  | { type: "SESSION_FOUND", data: string } 
  | { type: "SESSION_NOT_FOUND" }
  | { type: "SESSION_CREATED", data: string }
  | { type: "SESSION_NOT_CREATED" }

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
      }, 
      on: {
        SESSION_CREATED: {
          target: "idle",
          actions: ["saveSession"]
        },
        SESSION_NOT_CREATED: {
          target: "failure",
          actions: ["clearSession"]
        }
      }
    },
    idle: {
      type: "final"
    },
    failure: {
      type: "final"
    }
  }
}, {
  services: {
    checkingForSession: () => async (cb: InvokeCallbackType) => {
      const session = localStorage.getItem(key)

      const { data } = await axios.post('/api/testSession', { session })
      
      console.log(`Data: `, data)
      

      // if(session) {
      //   cb({ type:"SESSION_FOUND", data: session })
      // } else {
      //   cb("SESSION_NOT_FOUND")
      // }
    },
    creatingSession: () => async (cb: InvokeCallbackType) => {
      const { data } = await axios.get('/api/createSession')
      console.log(`Data: `, data)
      const { ret_msg, session_id } = data 
      if(ret_msg === "Approved" && session_id) {
        cb({ type: "SESSION_CREATED", data: session_id })
      } else {
        cb("SESSION_NOT_CREATED")
      }      
    }
  },
  actions: {
    saveSession: assign((_, eve) => {
      localStorage.setItem(key, eve.data)

      return {
        session: eve.data
      }
    }),
    clearSession: assign(() => {
      localStorage.removeItem(key)
      
      return {
        session: null
      }
    })
  }
})

export default sessionMachine