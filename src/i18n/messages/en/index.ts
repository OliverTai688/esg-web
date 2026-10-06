import type { Messages } from "../zh"
import common from "./common"
import home from "./home"
import sustainability from "./sustainability"
import events from "./events"
import learning from "./learning"
import consulting from "./consulting"
import join from "./join"

// English mirror of the Traditional Chinese source; shape is enforced by Messages.
const en: Messages = { ...common, home, sustainability, events, learning, consulting, join }

export default en
