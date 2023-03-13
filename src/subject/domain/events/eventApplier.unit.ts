import { buildEventApplier } from "./eventApplier"
import { SUBJECT_CREATED_EVENT_TYPE, SubjectCreatedEvent } from "./subjectCreated/subjectCreatedEvent"
import { SUBJECT_NAME_UPDATED_EVENT_TYPE, SubjectNameUpdatedEvent } from "./subjectUpdated/subjectNameUpdatedEvent"
import { subjectMock } from "../subject.mock"

describe("buildEventApplier", () => {
  it("should apply the create event if it receives the create event", () => {
    const applySubjectCreatedEvent = jest.fn()
    const eventApplier = buildEventApplier({
      applySubjectCreatedEvent,
      applySubjectUpdatedEvent: jest.fn(),
    })
    const event = { type: SUBJECT_CREATED_EVENT_TYPE } as SubjectCreatedEvent

    eventApplier([event])

    expect(applySubjectCreatedEvent).toHaveBeenCalledWith(event)
  })
  it("should apply the update event if it receives the update event", () => {
    const applySubjectUpdatedEvent = jest.fn()
    const eventApplier = buildEventApplier({
      applySubjectCreatedEvent: jest.fn(),
      applySubjectUpdatedEvent,
    })
    const event = { type: SUBJECT_NAME_UPDATED_EVENT_TYPE } as SubjectNameUpdatedEvent

    eventApplier([event], subjectMock())

    expect(applySubjectUpdatedEvent).toHaveBeenCalledWith(event, expect.any(Object))
  })
  it("throws if the event type can not be handled", () => {
    const applySubjectUpdatedEvent = jest.fn()
    const eventApplier = buildEventApplier({ applySubjectCreatedEvent: jest.fn(), applySubjectUpdatedEvent })
    const event = { type: "unknown" } as SubjectCreatedEvent

    const apply = () => eventApplier([event], subjectMock())

    expect(apply).toThrow()
  })
})
