import { title } from 'process'

export interface ConfirmDialogModel {
  title: string,
  message: string
}

export class ConfirmDialogModel_Class {
  constructor(public title: string, public message: string) {}
}
