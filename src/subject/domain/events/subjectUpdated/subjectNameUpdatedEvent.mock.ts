import { faker } from "@faker-js/faker"
import { changeEventMock } from "../../../../packages/test/changeEventMock"
import { SUBJECT_NAME_UPDATED_EVENT_TYPE, SubjectNameUpdatedEvent } from "./subjectNameUpdatedEvent"

export const subjectNameUpdatedEventMock = (overwrites?: Partial<SubjectNameUpdatedEvent>) => {
  const changeEvent = changeEventMock(SUBJECT_NAME_UPDATED_EVENT_TYPE)
  return {
    ...changeEvent,
    data: {
      id: changeEvent.aggregateId,
      name: faker.name.jobType(),
    },
    ...overwrites,
  }
}
