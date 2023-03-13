import { faker } from "@faker-js/faker"
import { makeMocks } from "../test/makeMocks"
import { ChangeEvent } from "./changeEvent.types"

const mockEventData = () => {
  return {
    state: "active",
  }
}

const mockChangeEvent = <T extends Record<string, any>>(
  dataFn: (overwrites: Partial<T>) => T,
  overwrites: Partial<ChangeEvent<ReturnType<typeof dataFn>>>,
): ChangeEvent<ReturnType<typeof dataFn>> => {
  return {
    // Metadata
    version: 1,
    type: faker.name.jobType(),
    aggregateId: faker.datatype.uuid(),
    date: Date(),
    // event
    data: dataFn(overwrites.data),
    ...overwrites,
  }
}

export const mockChangeEvents = makeMocks((overwrites: Partial<ChangeEvent<ReturnType<typeof mockEventData>>>) =>
  mockChangeEvent(mockEventData, overwrites),
)
