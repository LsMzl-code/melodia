import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/createNote.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { Note } from 'src/entities/note.entity';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL NOTES ***//
  async findAll(): Promise<Note[]> {
    const notes = await this.prismaService.note.findMany();
    if (!notes) throw new NotFoundException('Aucune note trouvée');
    return notes;
  }

  //*** GET NOTE BY ID ***//
  async findById(id: number): Promise<Note> {
    const note = await this.prismaService.note.findUnique({
      where: { id }
    })
    if (!note) throw new NotFoundException('Note non trouvée');
    return note;
  }

  //*** CREATE NOTE ***//
  async createNote(createNoteDto: CreateNoteDto): Promise<{ message: string }> {
    const { name, type, soundUrl } = createNoteDto;

    // Verification de la non-existence de la note
    const existingNote = await this.prismaService.note.findFirst({
      where: { name, type }
    })
    if (existingNote) throw new ConflictException('Cette note existe déjà');

    // Création de la note
    await this.prismaService.note.create({
      data: {
        name,
        type,
        soundUrl,
        reference: name + "-" + type
      },
    });

    return { message: 'Note créée avec succès' };

  }

  //*** UPDATE NOTE ***//
  async updateNote(id: number, updateNoteDto: UpdateNoteDto): Promise<{ message: string }> {
    const { name, type, soundUrl } = updateNoteDto;

    // Verification de l'existence de la note
    const existingNote = await this.prismaService.note.findUnique({
      where: { id }
    })
    if (!existingNote) throw new NotFoundException('Cette note n\'existe pas');

    // Mise à jour de la note
    await this.prismaService.note.update({
      where: { id },
      data: {
        name,
        type,
        soundUrl,
        reference: name + "-" + type
      },
    });

    return { message: 'Note modifiée avec succès' };
  }

  //*** DELETE NOTE ***//
  async removeNote(id: number): Promise<{ message: string }> {
    await this.prismaService.note.delete({
      where: { id }
    })
    return { message: 'Note supprimée avec succès' };
  }
}
