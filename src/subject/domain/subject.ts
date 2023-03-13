export type MakeSubjectProps = {
  id?: string
  name: string
}

export type Subject = {
  id: string
  name: string
}

export type MakeSubject = ReturnType<typeof buildMakeSubject>

export const buildMakeSubject = ({ uuid }: { uuid: () => string }) => {
  return function makeSubject({ id, name }: MakeSubjectProps): Subject {
    if (!name) throw new Error("Subject name must be provided")

    return {
      id: id || uuid(),
      name,
    }
  }
}
