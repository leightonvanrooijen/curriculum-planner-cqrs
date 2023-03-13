import { buildMakeSubject } from "../../subject"
import { buildApplySubjectNameUpdatedEvent } from "./subjectNameUpdatedEvent.apply"
import { subjectNameUpdatedEventMock } from "./subjectNameUpdatedEvent.mock"
import { subjectMock } from "../../subject.mock"

describe("buildApplySubjectUpdatedEvent", () => {
  it("returns a subject with the updated name applied", () => {
    const makeSubject = buildMakeSubject({ uuid: () => "123" })
    const subject = subjectMock()
    const applier = buildApplySubjectNameUpdatedEvent({ makeSubject })
    const event = subjectNameUpdatedEventMock()

    const updatedSubject = applier(event, subject)

    expect(updatedSubject.name).toEqual(event.data.name)
  })
})
