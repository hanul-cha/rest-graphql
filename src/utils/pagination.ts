import { SelectQueryBuilder } from 'typeorm'

export interface PageInfo {
  hasNextPage: boolean
  startPath: string
  endPath: string
}

export interface PageOption {
  perPage?: number
  page?: number
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

  const perPage = Math.min(option.perPage ?? 20, 100)
  const page = Math.min(option.page ?? 20, 100)
  const nodeQuery = qb.clone()

  const nodes = await nodeQuery
    .take(perPage)
    .skip(perPage * (page - 1))
    .getMany()

  const nextPageLength = await nodeQuery
    .take(1)
    .skip(perPage * page)
    .getCount()

  return {
    totalCount,
    nodes,
    pageInfo: {
      hasNextPage: nextPageLength > 0,
      startPath: '',
      endPath: '',
    },
  }
}
