export const QUERY_KEYS = ['tasks', 'completedTasks', 'userInfo'] as const

type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never
export type QueryKeysTypes = Unpacked<typeof QUERY_KEYS>
