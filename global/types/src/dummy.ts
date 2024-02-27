import zod from 'zod'

export const DummySchema = zod.object({
  name: zod.string(),
})

export type DummyType = zod.infer<typeof DummySchema>
