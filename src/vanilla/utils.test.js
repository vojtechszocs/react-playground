/* eslint-env jest */

import { filterNotes, nextNoteId } from './utils'

const notes = [
  {
    id: 1,
    text: 'First note',
    tags: ['foo']
  }, {
    id: 3,
    text: 'Second note',
    tags: ['foo', 'bar']
  }
]

describe('filterNotes', () => {

  test('filter single element', () => {
    expect(filterNotes(notes, 'Fir')).toEqual([ notes[0] ])
    expect(filterNotes(notes, 'bar')).toEqual([ notes[1] ])
  })

  test('filter multiple elements', () => {
    expect(filterNotes(notes, 'note')).toEqual(notes)
    expect(filterNotes(notes, 'oo')).toEqual(notes)
  })

  test('filtered array !== input array if filter parameter is truthy', () => {
    expect(filterNotes(notes, 'note')).not.toBe(notes)
  })

  test('filtered array === input array if filter parameter is falsy', () => {
    for (const val of [false, '', null, undefined]) {
      expect(filterNotes(notes, val)).toBe(notes)
    }
  })

  test('fail if elements are missing text property', () => {
    expect(() => {
      filterNotes([{}], 'note')
    }).toThrow()
  })

  test('pass if elements have only text property', () => {
    expect(() => {
      filterNotes([{ text: 'Test note' }], 'note')
    }).not.toThrow()
  })

})

describe('nextNoteId', () => {

  test('passing empty array', () => {
    expect(nextNoteId([])).toBe(1)
  })

  test('passing non-empty array', () => {
    expect(nextNoteId(notes)).toBe(4)
  })

  test('fail if notes parameter is not an array', () => {
    expect(() => {
      nextNoteId({})
    }).toThrow()
  })

  test('pass if elements are missing id property', () => {
    expect(nextNoteId([{ text: 'Test note' }])).toBe(1)
  })

})
