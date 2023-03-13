import { makeSubjectNameUpdatedEvent, SUBJECT_NAME_UPDATED_EVENT_TYPE } from "./subjectNameUpdatedEvent"

describe("makeSubjectNameUpdatedEvent", () => {
  it("returns a subject name updated event", () => {
    const input = { aggregateId: "123", name: "Math 101", version: 1 }

    const event = makeSubjectNameUpdatedEvent(input)

    expect(event.type).toEqual(SUBJECT_NAME_UPDATED_EVENT_TYPE)
    expect(event.data.name).toEqual(input.name)
  })
})
