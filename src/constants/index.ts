export const QUERY_KEYS = ['tasks', 'completedTasks', 'userInfo'] as const

type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never
export type QueryKeysTypes = Unpacked<typeof QUERY_KEYS>

export const STATUSES = {
  isNotCompleted: 0,
  isCompleted: 1,
}

export const SORT = {
  isLatestSort: 0,
  isOldestSort: 1,
}
