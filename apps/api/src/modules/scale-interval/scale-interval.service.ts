import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

//*** SERVICE ***//
import { PrismaService } from 'src/prisma/prisma.service';

//*** ENTITY ***//

//*** DTO ***//
import { CreateScaleIntervalDto } from './dto/createScaleInterval.dto';
import { UpdateScaleIntervalDto } from './dto/updateScaleInterval.dto';
import { ScaleInterval } from 'src/entities/scale-interval.entity';


@Injectable()
export class ScaleIntervalService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL SCALE INTERVALS ***//
  async findAll(): Promise<ScaleInterval[]> {
    const scaleIntervals = await this.prismaService.scaleInterval.findMany();
    if (!scaleIntervals) throw new NotFoundException('Aucune interval de gamme trouvé');
    return scaleIntervals as ScaleInterval[];
  }

  //*** GET SCALE INTERVAL BY ID ***//
  async findById(id: number): Promise<ScaleInterval> {
    const scaleInterval = await this.prismaService.scaleInterval.findUnique({ where: { id }})
    if (!scaleInterval) throw new NotFoundException('Interval de gamme non trouvé');
    return scaleInterval as ScaleInterval;
  }

  //*** CREATE SCALE INTERVAL ***//
  async createScaleInterval(createScaleIntervalDto: CreateScaleIntervalDto): Promise<{ message: string }> {
    const { name, details } = createScaleIntervalDto;

    // Verification de la non-existence de l'intervalle de gamme
    const existingScaleInterval = await this.prismaService.scaleInterval.findFirst({
      where: { name }
    })
    if (existingScaleInterval) throw new ConflictException('Cet interval de gamme existe déjà');

    // Création de l'interval de gamme
    await this.prismaService.scaleInterval.create({
      data: {
        name,
        details
      },
    });

    return { message: 'Interval de gamme créé avec succès' };

  }

  //*** UPDATE SCALE INTERVAL ***//
  async updateScaleInterval(id: number, updateScaleIntervalDto: UpdateScaleIntervalDto): Promise<{ message: string }> {
    const { name, details } = updateScaleIntervalDto;

    // Verification de l'existence de la famille d'accord
    const existingScaleInterval = await this.prismaService.scaleInterval.findUnique({
      where: { id }
    })
    if (!existingScaleInterval) throw new NotFoundException('Cet interval de gamme n\'existe pas');

    // Mise à jour de l'intervalle de gamme
    await this.prismaService.scaleInterval.update({
      where: { id },
      data: { name, details },
    });

    return { message: 'Interval de gamme modifié avec succès' };
  }

  //*** DELETE SCALE INTERVAL ***//
  async removeScaleInterval(id: number): Promise<{ message: string }> {
    await this.prismaService.scaleInterval.delete({
      where: { id }
    })
    return { message: 'Interval de gamme supprimé avec succès' };
  }
}
