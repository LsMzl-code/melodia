'use client'

import NotePopover from "./note-popover"

const NoteFilter = () => {
  return (
    <div className='flex items-center justify-start gap-2'>
      <NotePopover noteTrigger="A" notes={["A♭", "A", "A♯"]} />
      <NotePopover noteTrigger="B" notes={["B♭", "B", "B♯"]} align='center' />
      <NotePopover noteTrigger="C" notes={["C", "C♯"]} align='center' />
      <NotePopover noteTrigger="D" notes={["D♭", "D", "D♯"]} align='center' />
      <NotePopover noteTrigger="E" notes={["E♭", "E", "E♯"]} align='center' />
      <NotePopover noteTrigger="F" notes={["F♭", "F", "F♯"]} align='center' />
      <NotePopover noteTrigger="G" notes={["G♭", "G", "G♯"]} align='end' />
    </div>
  )
}

export default NoteFilter