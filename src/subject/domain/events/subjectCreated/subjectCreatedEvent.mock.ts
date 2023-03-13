import { SUBJECT_CREATED_EVENT_TYPE, SubjectCreatedEvent } from "./subjectCreatedEvent"
import { faker } from "@faker-js/faker"
import { changeEventMock } from "../../../../packages/test/changeEventMock"

export const subjectCreatedEventMock = (overwrites?: Partial<SubjectCreatedEvent>) => {
  const changeEvent = changeEventMock(SUBJECT_CREATED_EVENT_TYPE)
  return {
    ...changeEvent,
    data: {
      id: changeEvent.aggregateId,
      name: faker.name.jobType(),
    },
    ...overwrites,
  }
}
