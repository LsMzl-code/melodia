import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTonalityDto } from './dto/createTonality.dto';
import { UpdateTonalityDto } from './dto/updateTonality.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tonality } from 'src/entities/tonality.entity';


@Injectable()
export class TonalityService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL TONALITIES ***//
  async findAll(): Promise<Tonality[]> {
    const tonalities = await this.prismaService.tonality.findMany();
    if (!tonalities) throw new NotFoundException('Aucune tonalité trouvée');
    return tonalities as Tonality[];
  }

  //*** GET TONALITY BY ID ***//
  async findById(id: number): Promise<Tonality> {
    const tonality = await this.prismaService.tonality.findUnique({
      where: { id }
    })
    if (!tonality) throw new NotFoundException('Tonalité non trouvée');
    return tonality as Tonality;
  }

  //*** CREATE TONALITY ***//
  async createTonality(createTonalityDto: CreateTonalityDto): Promise<{ message: string }> {
    const { name } = createTonalityDto;

    // Verification de la non-existence de la tonalité
    const existingTonality = await this.prismaService.tonality.findUnique({
      where: { name }
    })
    if (existingTonality) throw new ConflictException('Cette tonalité existe déjà');

    // Création de la tonalité
    await this.prismaService.tonality.create({
      data: { name }
    })

    return { message: 'Tonalité créée avec succès' };

  }

  //*** UPDATE TONALITY ***//
  async updateTonality(id: number, updateTonalityDto: UpdateTonalityDto): Promise<{ message: string }> {
    const { name } = updateTonalityDto;

    // Verification de l'existence de la tonalité
    const existingTonality = await this.prismaService.tonality.findUnique({
      where: { id }
    })
    if (!existingTonality) throw new NotFoundException('Cette tonalité n\'existe pas');

    // Mise à jour de la tonalité
    await this.prismaService.tonality.update({
      where: { id },
      data: { name }
    })

    return { message: 'Tonalité modifiée avec succès' };
  }

  //*** DELETE TONALITY ***//
  async removeTonality(id: number): Promise<{ message: string }> {
    await this.prismaService.tonality.delete({
      where: { id }
    })

    return { message: 'Tonalité supprimée avec succès' };
  }
}
