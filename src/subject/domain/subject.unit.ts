import { buildMakeSubject } from "./subject"
import { subjectMock } from "./subject.mock"
import mock = jest.mock

const setUp = (id: string = "1") => {
  const makeSubject = buildMakeSubject({ uuid: jest.fn(() => id) })

  return { makeSubject }
}

describe("buildMakeSubject", () => {
  it("should return a Subject", () => {
    const mockSubject = subjectMock()
    const { makeSubject } = setUp(mockSubject.id)

    const subject = makeSubject(mockSubject)

    expect(subject).toEqual(mockSubject)
  })
  it("creates an ID if one is not provided", () => {
    const mockSubject = subjectMock()
    const { makeSubject } = setUp(mockSubject.id)

    const subject = makeSubject({ name: mockSubject.name })

    expect(subject.id).toEqual(mockSubject.id)
  })
  it("must have a name", () => {
    const { makeSubject } = setUp()

    const subject = () => makeSubject({ name: "" })

    expect(subject).toThrow()
  })
})
