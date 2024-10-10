'use client'

import NotePopover from "./note-popover"

const NoteFilter = () => {
  return (
    <div className='flex items-center justify-start gap-1.5'>
      <NotePopover noteTrigger="A" notes={["A♭", "A", "A♯"]} title="Tonalités de A"/>
      <NotePopover noteTrigger="B" notes={["B♭", "B", "B♯"]} align='center' title="Tonalités de B"/>
      <NotePopover noteTrigger="C" notes={["C", "C♯"]} align='center' title="Tonalités de C"/>
      <NotePopover noteTrigger="D" notes={["D♭", "D", "D♯"]} align='center' title="Tonalités de D"/>
      <NotePopover noteTrigger="E" notes={["E♭", "E", "E♯"]} align='center' title="Tonalités de E"/>
      <NotePopover noteTrigger="F" notes={["F", "F♯"]} align='center' title="Tonalités de F"/>
      <NotePopover noteTrigger="G" notes={["G♭", "G", "G♯"]} align='end' title="Tonalités de G"/>
    </div>
  )
}

export default NoteFilter