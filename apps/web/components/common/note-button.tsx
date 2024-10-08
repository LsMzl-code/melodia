import React from 'react'
import { Button } from '../ui/button'
import clsx from 'clsx'
import { cn } from '@/lib/utils';

interface NoteButtonProps {
  className?: string;
  note: string;
  onClick?: () => void;
}

const NoteButton: React.FC<NoteButtonProps> = ({ className, note, onClick }) => {
  return (
    <Button className={cn(
      note == "C"
        ? "bg-red-400"
        : note == "C♯"
          ? "bg-red-500"
          : note == "C♯♯"
            ? "bg-red-600"
            : note == "C♭"
              ? "bg-red-400/70"
              : note == "D"
                ? "bg-orange-400"
                : note == "D♯"
                  ? "bg-orange-500"
                  : note == "D♭"
                    ? "bg-orange-400/80"
                    : note == "E"
                      ? "bg-yellow-400"
                      : note == "E♯"
                        ? "bg-yellow-500"
                        : note == "E♭"
                          ? "bg-yellow-300/80"
                          : note == "F"
                            ? "bg-green-400"
                            : note == "F♯"
                              ? "bg-green-500"
                              : note == "F♯♯"
                                ? "bg-green-600"
                                : note == "F♭"
                                  ? "bg-green-400/80"
                                  : note == "G"
                                    ? "bg-blue-400"
                                    : note == "G♯"
                                      ? "bg-blue-500"
                                      : note == "G♯♯"
                                        ? "bg-blue-600"
                                        : note == "G♭"
                                          ? "bg-blue-400/80"
                                          : note == "A"
                                            ? "bg-indigo-400"
                                            : note == "A♯"
                                              ? "bg-indigo-500"
                                              : note == "A♭"
                                                ? "bg-indigo-400/80"
                                                : note == "B"
                                                  ? "bg-violet-400"
                                                  : note == "B♯"
                                                    ? "bg-violet-500"
                                                    : note == "B♭"
                                                      ? "bg-violet-400/80"
                                                      : note == "B♭♭"
                                                        ? "bg-violet-400/50"
                                                        : "bg-background",
      "border border-foreground/30 text-background", className
    )} onClick={onClick}>{note}</Button>
  )
}

export default NoteButton