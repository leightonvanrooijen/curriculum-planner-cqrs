import { faker } from "@faker-js/faker"
import { ChangeEvent } from "../eventSourcing/changeEvent.types"

export const changeEventMock = (type: string, overwrites?: Partial<ChangeEvent<any>>) => {
  return {
    type,
    version: 1,
    aggregateId: faker.datatype.uuid(),
    date: Date(),
    ...overwrites,
  }
}
