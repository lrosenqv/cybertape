export interface LIST_ITEM {
  title: string
  subtitle?: string
  id?: string
  type: string
}
export interface SETTING_ITEM {
  title: string
  label: string
  description: string
}
export interface SETTING_ITEM_TOGGLE {
  title: string
  label: string
  description: string
  min: number
  max: number
  steps: number
  step_labels: string[]
}
