import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChordDto } from './dto/createChord.dto';
import { UpdateChordDto } from './dto/updateChord.dto';
import { Note } from '@prisma/client';
import { Chord } from 'src/entities/chord.entity';


@Injectable()
export class ChordService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL CHORDS ***//
  async findAll(): Promise<Chord[]> {
    const chords = await this.prismaService.chord.findMany();
    if (!chords) throw new NotFoundException('Aucun accord trouvé');
    return chords;
  }

  //*** GET CHORD BY ID ***//
  async findById(id: number): Promise<Chord> {
    const chord = await this.prismaService.chord.findUnique({
      where: { id }
    })
    if (!chord) throw new NotFoundException('Accord non trouvé');
    return chord;
  }

  //*** CREATE CHORD ***//
  async createChord(createChordDto: CreateChordDto): Promise<{ message: string }> {
    const { name, notes, mode, tonality, interval, chordFamily } = createChordDto;

    // Verification de la non-existence de la note
    const existingChord = await this.prismaService.chord.findFirst({
      where: {
        name: { name },
        tonalityId: tonality
      }
    })
    if (existingChord) throw new ConflictException('Cet accord existe déjà');

    // Création de l'accord
    const chord = this.prismaService.chord.create({
      data: {
        name: {
          connect: {
            id: Number(name)
          }
        },
        tonality: {
          connect: {
            id: tonality,
          },
        },
        mode: {
          connect: {
            id: mode,
          },
        },
        chordInterval: {
          connect: {
            id: interval,
          },
        },
        chordFamily: {
          connect: {
            id: chordFamily,
          }
        }
      }
    })

    //TODO: Faire avec CreateMany
    // Ajout des notes dans l'accord' crée
    notes.map(
      async (note, index) => await this.prismaService.notesOnChords.create({
        data: {
          note: {
            connect: {
              reference: note
            }
          },
          chord: {
            connect: {
              id: (await chord).id,
            },
          },
          orderNumber: index,
        }
      }))

    return { message: 'Accord créé avec succès' };

  }

  //*** UPDATE CHORD ***//
  async updateChord(id: number, updateChordDto: UpdateChordDto): Promise<{ message: string }> {
    // const { name } = updateChordDto;

    // Verification de l'existence de la note'
    // const existingNote = await this.prismaService.note.findUnique({
    //   where: { id }
    // })
    // if (!existingNote) throw new NotFoundException('Cette note n\'existe pas');

    // // Mise à jour de la note
    // await this.prismaService.note.update({
    //   where: { id },
    //   data: {
    //     name,
    //     reference,
    //     type,
    //     soundUrl,
    //   },
    // });

    return { message: 'Note modifiée avec succès' };
  }

  //*** DELETE CHORD ***//
  async removeChord(id: number): Promise<{ message: string }> {
    await this.prismaService.note.delete({
      where: { id }
    })
    return { message: 'Note supprimée avec succès' };
  }
}
