import t from 'tcomb'

const NonEmptyString = t.refinement(t.String, s => s.length > 0, 'NonEmptyString')

const ID = t.refinement(t.Number, n => n > 0, 'ID')

const Note = t.struct({
  id: ID,
  text: NonEmptyString,
  tags: t.maybe(t.list(NonEmptyString)),
  done: t.maybe(t.Boolean)
})

const Notes = t.list(Note)

export default {
  ID, Note, Notes
}

export const validate = (type, value) => {
  try {
    type(value)
    return Promise.resolve(value)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const checkError = (type, value) => {
  try {
    type(value)
  } catch (error) {
    return error
  }
}
