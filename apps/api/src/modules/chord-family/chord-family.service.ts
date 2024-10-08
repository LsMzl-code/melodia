import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChordFamilyDto } from './dto/createChordFamily.dto';
import { UpdateChordFamilyDto } from './dto/updateChordFamily.dto';
import { ChordFamily } from 'src/entities/chord-family.entity';

@Injectable()
export class ChordFamilyService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL CHORD FAMILIES ***//
  async findAll(): Promise<ChordFamily[]> {
    const chordFamilies = await this.prismaService.chordFamily.findMany();
    if (!chordFamilies) throw new NotFoundException('Aucune note trouvée');
    return chordFamilies as ChordFamily[];
  }

  //*** GET CHORD FAMILY BY ID ***//
  async findById(id: number): Promise<ChordFamily> {
    const chordFamily = await this.prismaService.chordFamily.findUnique({
      where: { id }
    })
    if (!chordFamily) throw new NotFoundException('Note non trouvée');
    return chordFamily as ChordFamily;
  }

  //*** CREATE CHORD FAMILY ***//
  async createChordFamily(createChordFamilyDto: CreateChordFamilyDto): Promise<{ message: string }> {
    const { name } = createChordFamilyDto;

    // Verification de la non-existence de la note
    const existingChordFamily = await this.prismaService.chordFamily.findFirst({
      where: { name }
    })
    if (existingChordFamily) throw new ConflictException('Cette famille d\'accord existe déjà');

    // Création de la famille d'accord
    await this.prismaService.chordFamily.create({
      data: {
        name
      },
    });

    return { message: 'Famille d\'accord créée avec succès' };

  }

  //*** UPDATE CHORD FAMILY ***//
  async updateChordFamily(id: number, updateChordFamilyDto: UpdateChordFamilyDto): Promise<{ message: string }> {
    const { name } = updateChordFamilyDto;

    // Verification de l'existence de la famille d'accord
    const existingChordFamily = await this.prismaService.chordFamily.findUnique({
      where: { id }
    })
    if (!existingChordFamily) throw new NotFoundException('Cette note n\'existe pas');

    // Mise à jour de la famille d'accord
    await this.prismaService.chordFamily.update({
      where: { id },
      data: { name },
    });

    return { message: 'Famille d\'accord modifiée avec succès' };
  }

  //*** DELETE CHORD FAMILY ***//
  async removeChordFamily(id: number): Promise<{ message: string }> {
    await this.prismaService.chordFamily.delete({
      where: { id }
    })
    return { message: 'Famille d\'accord supprimée avec succès' };
  }
}
