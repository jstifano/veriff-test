import React from "react"

export type Check = {
  id: string,
  priority: number,
  description: string,
  enabled?: boolean,
  optionSelected?: string,
  idx?: React.Key | undefined,
  onSelectAnswer?: Function
}