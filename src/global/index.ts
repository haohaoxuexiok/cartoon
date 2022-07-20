import { App } from 'vue'
import { registerIcon } from './icon'
import registerFormatTime from './format'

export function globalRegister(app: App): void {
  registerIcon(app)
  registerFormatTime(app)
}
