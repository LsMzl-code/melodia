import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChordNameDto } from './dto/createChordName.dto';
import { UpdateChordNameDto } from './dto/updateChordName.dto';
import { ChordName } from 'src/entities/chord-name.entity';

@Injectable()
export class ChordNameService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL CHORD NAMES ***//
  async findAll(): Promise<ChordName[]> {
    const chordNames = await this.prismaService.chordName.findMany();
    if (!chordNames) throw new NotFoundException('Aucun nom d\'accord trouvé');
    return chordNames as ChordName[];
  }

  //*** GET CHORD NAME BY ID ***//
  async findById(id: number): Promise<ChordName> {
    const chordName = await this.prismaService.chordName.findUnique({
      where: { id }
    })
    if (!chordName) throw new NotFoundException('Nom d\'accord non trouvé');
    return chordName as ChordName;
  }

  //*** CREATE CHORD NAME ***//
  async createChordName(createChordNameDto: CreateChordNameDto): Promise<{ message: string }> {
    const { name } = createChordNameDto;

    // Vérification de la non-existence du nom d'accord
    const existingChordName = await this.prismaService.chordName.findUnique({
      where: { name }
    })
    if (existingChordName) throw new ConflictException('Ce nom d\'accord existe déjà');

    // Création du nom d'accord'
    await this.prismaService.chordName.create({
      data: { name }
    })

    return { message: 'Nom d\'accord créé avec succès' };

  }

  //*** UPDATE CHORD NAME ***//
  async updateChordName(id: number, updateChordNameDto: UpdateChordNameDto): Promise<{ message: string }> {
    const { name } = updateChordNameDto;

    // Verification de l'existence du nom de gamme
    const existingChordName = await this.prismaService.chordName.findUnique({
      where: { id }
    })
    if (!existingChordName) throw new NotFoundException('Ce nom d\'accord n\'existe pas');

    // Mise à jour du nom de gamme
    await this.prismaService.chordName.update({
      where: { id },
      data: { name }
    })

    return { message: 'Nom d\'accord modifié avec succès' };
  }

  //*** DELETE CHORD NAME ***//
  async removeChordName(id: number): Promise<{ message: string }> {
    await this.prismaService.chordName.delete({
      where: { id }
    })

    return { message: 'Nom d\'accord supprimé avec succès' };
  }
}
