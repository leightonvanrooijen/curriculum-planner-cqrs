import { buildMakeSubject } from "../domain/subject"
import { buildTestEventDb } from "../../packages/eventSourcing/testEventDb"
import { buildSubjectRepo } from "../repo/subjectRepo"
import { buildUpdateSubjectName } from "./updateSubjectName"
import { SubjectEvents } from "../domain/events/subjectCreated/subjectEvent.types"
import { buildEventApplier } from "../domain/events/eventApplier"
import { buildApplySubjectCreatedEvent } from "../domain/events/subjectCreated/subjectCreatedEvent.apply"
import { buildApplySubjectNameUpdatedEvent } from "../domain/events/subjectUpdated/subjectNameUpdatedEvent.apply"
import {
  makeSubjectNameUpdatedEvent,
  SUBJECT_NAME_UPDATED_EVENT_TYPE,
} from "../domain/events/subjectUpdated/subjectNameUpdatedEvent"
import { subjectCreatedEventMock } from "../domain/events/subjectCreated/subjectCreatedEvent.mock"
import { subjectNameUpdatedEventMock } from "../domain/events/subjectUpdated/subjectNameUpdatedEvent.mock"

const setUp = () => {
  // mocks
  const createEvent = subjectCreatedEventMock()
  const events = [createEvent, subjectNameUpdatedEventMock({ version: 2 })]
  const aggregateId = createEvent.aggregateId

  // Domain events
  const makeSubject = buildMakeSubject({ uuid: () => createEvent.aggregateId })
  const applySubjectCreatedEvent = buildApplySubjectCreatedEvent({ makeSubject })
  const applySubjectUpdatedEvent = buildApplySubjectNameUpdatedEvent({ makeSubject })
  const eventApplier = buildEventApplier({ applySubjectCreatedEvent, applySubjectUpdatedEvent })

  // Repo
  const dbData = { [aggregateId]: events }
  const db = buildTestEventDb<SubjectEvents>(dbData)
  const subjectRepo = buildSubjectRepo({ db })

  const updateSubject = buildUpdateSubjectName({ makeSubjectNameUpdatedEvent, subjectRepo, eventApplier })

  return { dbData, updateSubject, aggregateId }
}

describe("buildUpdateSubject", () => {
  it("updates the subject", async () => {
    const { dbData, updateSubject, aggregateId } = setUp()
    const update = { name: "Math 101", version: 3 }

    await updateSubject(aggregateId, update)

    expect(dbData[aggregateId][2]).toEqual(
      expect.objectContaining({
        type: SUBJECT_NAME_UPDATED_EVENT_TYPE,
        version: update.version,
        data: {
          name: update.name,
        },
      }),
    )
  })
  it("throws if the version is not incremental", async () => {
    const { updateSubject, aggregateId } = setUp()
    const updateData = { name: "Math 101", version: 4 }

    const update = async () => updateSubject(aggregateId, updateData)

    await expect(update).rejects.toThrow()
  })
})
