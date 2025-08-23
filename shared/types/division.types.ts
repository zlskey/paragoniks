export type DivisionType = keyof typeof DivisionTranslationEnum

export enum DivisionTranslationEnum {
  percentage = 'Procenty',
  amount = 'Kwota',
  shares = 'Udziały',
}

export enum DivisionUnitEnum {
  percentage = '%',
  amount = 'zł',
  shares = '',
}

export interface Division {
  [index: string]: number | null
}
