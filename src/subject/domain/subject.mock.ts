import { Subject } from "./subject"
import { faker } from "@faker-js/faker"
import { makeMocks } from "../../packages/test/makeMocks"

export const subjectMock = (overwrites?: Partial<Subject>) => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.jobType(),
    ...overwrites,
  }
}

export const subjectMocks = makeMocks(subjectMock)
