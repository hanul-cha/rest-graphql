import { Brackets } from 'typeorm'

export function scopeAndWhereSameText(text: string, column: string): Brackets {
  return new Brackets((qb) => {
    qb.andWhere(`replace(${column},' ','') = :inputTitle`, {
      inputTitle: text.replace(/(\s*)/g, ''),
    })
  })
}
