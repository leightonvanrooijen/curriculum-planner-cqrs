import { buildCreateSubject } from "./createSubject"
import { buildMakeSubject } from "../domain/subject"
import { buildTestEventDb } from "../../packages/eventSourcing/testEventDb"
import { makeSubjectCreatedEvent } from "../domain/events/subjectCreated/subjectCreatedEvent"
import { buildSubjectRepo } from "../repo/subjectRepo"
import { SubjectEvents } from "../domain/events/subjectCreated/subjectEvent.types"

describe("buildCreateSubject", () => {
  it("creates a subject", async () => {
    const aggregateId = "123"
    const name = "Math 101"
    const makeSubject = buildMakeSubject({ uuid: () => aggregateId })
    const dbData = {}
    const db = buildTestEventDb<SubjectEvents>(dbData)
    const subjectRepo = buildSubjectRepo({ db })
    const createSubject = buildCreateSubject({ makeSubject, makeSubjectCreatedEvent, subjectRepo })

    await createSubject({ name })

    expect(dbData[aggregateId][0]).toEqual(
      expect.objectContaining({
        type: "subjectCreated",
        data: {
          id: aggregateId,
          name,
        },
      }),
    )
  })
})
