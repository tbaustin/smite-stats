import { createMachine } from "@xstate/compiled"

type Events = { type: "REMOVE" } | { type: "CANCEL" }

type Context = Record<string, never>

const sessionMachine = createMachine<Context, Events, "session">({
  id: "session",
  initial: "idle",
  states: {
    idle: {}
  }
})

export default sessionMachine