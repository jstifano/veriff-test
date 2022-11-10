import { Check } from "../types/check"

export const sortChecksByPriority = (arrayOfChecks: Check[]): Check[] => {
  return arrayOfChecks.sort((a: Check, b: Check) => {
    if(a.priority < b.priority) {
      return -1
    } else if(a.priority > b.priority) {
      return 1
    }
    
    return 0
  })
}