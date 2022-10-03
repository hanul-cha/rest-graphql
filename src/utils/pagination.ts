import { SelectQueryBuilder } from 'typeorm'

export interface PageInfo {
  hasNextPage: boolean
  startPath: string
  endPath: string
}

export interface PageOption {
  skip?: number
  jump?: number
  after?: string | null
  order?: { column: string; asc: boolean }
}

export interface Paginate<TEntity> {
  totalCount: number
  nodes: TEntity[]
  pageInfo: PageInfo
}

export async function paginate<TEntity>(
  qb: SelectQueryBuilder<TEntity>,
  option: PageOption,
): Promise<Paginate<TEntity>> {
  const totalCount = await qb.clone().getCount()
  const nodeQuery = qb.clone()

  const test = option.order?.column

  return {
    totalCount,
    nodes: null,
    pageInfo: 123,
  }
}
