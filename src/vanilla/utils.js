export const filterNotes = (notes, filter) => {
  if (!filter) {
    return notes
  }

  return notes.filter(note => {
    const text = note.text
    const tags = note.tags || []

    return text.toLowerCase().includes(filter.toLowerCase()) ||
      tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  })
}

export const nextNoteId = (notes) => {
  return notes.reduce((acc, note) => Math.max(acc, note.id || 0), 0) + 1
}
