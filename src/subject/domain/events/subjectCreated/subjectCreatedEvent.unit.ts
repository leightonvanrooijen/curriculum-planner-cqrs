import { SUBJECT_CREATED_EVENT_TYPE, makeSubjectCreatedEvent } from "./subjectCreatedEvent"

describe("subjectCreatedEvent", () => {
  it("returns a subject created event", () => {
    const input = { aggregateId: "123", name: "Math 101" }

    const event = makeSubjectCreatedEvent(input)

    expect(event.type).toEqual(SUBJECT_CREATED_EVENT_TYPE)
  })
})
