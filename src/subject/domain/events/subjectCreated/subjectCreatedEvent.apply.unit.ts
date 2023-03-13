import { buildApplySubjectCreatedEvent } from "./subjectCreatedEvent.apply"
import { buildMakeSubject } from "../../subject"
import { subjectCreatedEventMock } from "./subjectCreatedEvent.mock"

describe("buildApplySubjectCreatedEvent", () => {
  it("returns a subject with the event applied", () => {
    const makeSubject = buildMakeSubject({ uuid: () => "123" })
    const applier = buildApplySubjectCreatedEvent({ makeSubject })
    const event = subjectCreatedEventMock()

    const subject = applier(event)

    expect(subject.id).toEqual(event.data.id)
    expect(subject.name).toEqual(event.data.name)
  })
})
