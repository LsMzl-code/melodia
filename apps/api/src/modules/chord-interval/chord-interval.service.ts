import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

//*** SERVICE ***//
import { PrismaService } from 'src/prisma/prisma.service';

//*** ENTITY ***//
import { ChordInterval } from 'src/entities/chord-interval.entity';


//*** DTO ***//
import { CreateChordIntervalDto } from './dto/createChordInterval.dto';
import { UpdateChordIntervalDto } from './dto/updateChordInterval.dto';


@Injectable()
export class ChordIntervalService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL CHORD INTERVALS ***//
  async findAll(): Promise<ChordInterval[]> {
    const chordIntervals = await this.prismaService.chordInterval.findMany();
    if (!chordIntervals) throw new NotFoundException('Aucune interval d\'accord trouvé');
    return chordIntervals as ChordInterval[];
  }

  //*** GET CHORD INTERVAL BY ID ***//
  async findById(id: number): Promise<ChordInterval> {
    const chordInterval = await this.prismaService.chordInterval.findUnique({ where: { id } })
    if (!chordInterval) throw new NotFoundException('Interval d\'accord non trouvé');
    return chordInterval as ChordInterval;
  }

  //*** CREATE CHORD INTERVAL ***//
  async createChordInterval(createChordIntervalDto: CreateChordIntervalDto): Promise<{ message: string }> {
    const { name, details } = createChordIntervalDto;

    // Verification de la non-existence de l'intervalle d\'accord
    const existingChordInterval = await this.prismaService.chordInterval.findFirst({
      where: { name }
    })
    if (existingChordInterval) throw new ConflictException('Cet interval d\'accord existe déjà');

    // Création de l'interval d\'accord
    await this.prismaService.chordInterval.create({
      data: {
        name,
        details
      },
    });

    return { message: 'Interval d\'accord créé avec succès' };

  }

  //*** UPDATE CHORD INTERVAL ***//
  async updateChordInterval(id: number, updateChordIntervalDto: UpdateChordIntervalDto): Promise<{ message: string }> {
    const { name, details } = updateChordIntervalDto;

    // Verification de l'existence de la famille d'accord
    const existingChordInterval = await this.prismaService.chordInterval.findUnique({
      where: { id }
    })
    if (!existingChordInterval) throw new NotFoundException('Cet interval d\'accord n\'existe pas');

    // Mise à jour de l'intervalle d\'accord
    await this.prismaService.chordInterval.update({
      where: { id },
      data: { name, details },
    });

    return { message: 'Interval d\'accord modifié avec succès' };
  }

  //*** DELETE CHORD INTERVAL ***//
  async removeChordInterval(id: number): Promise<{ message: string }> {
    await this.prismaService.chordInterval.delete({
      where: { id }
    })
    return { message: 'Interval d\'accord supprimé avec succès' };
  }
}
