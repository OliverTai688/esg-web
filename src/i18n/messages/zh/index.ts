import common from "./common"
import home from "./home"
import sustainability from "./sustainability"
import events from "./events"
import learning from "./learning"
import consulting from "./consulting"
import join from "./join"

// Traditional Chinese is the source language: its shape defines the Messages type.
const zh = { ...common, home, sustainability, events, learning, consulting, join }

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { readonly [K in keyof T]: Widen<T[K]> }

export type Messages = Widen<typeof zh>
export default zh
