import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScaleFamilyDto } from './dto/createScaleFamily.dto';
import { UpdateScaleFamilyDto } from './dto/updateScaleFamily.dto';
import { ScaleFamily } from 'src/entities/scale-family.entity';

@Injectable()
export class ScaleFamilyService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL SCALE FAMILIES ***//
  async findAll(): Promise<ScaleFamily[]> {
    const scaleFamilies = await this.prismaService.scaleFamily.findMany();
    if (!scaleFamilies) throw new NotFoundException('Aucune famille de gamme trouvée');
    return scaleFamilies as ScaleFamily[];
  }

  //*** GET SCALE FAMILY BY ID ***//
  async findById(id: number): Promise<ScaleFamily> {
    const scaleFamily = await this.prismaService.scaleFamily.findUnique({
      where: { id }
    })
    if (!scaleFamily) throw new NotFoundException('Famille de gamme non trouvée');
    return scaleFamily as ScaleFamily;
  }

  //*** CREATE SCALE FAMILY ***//
  async createScaleFamily(createScaleFamilyDto: CreateScaleFamilyDto): Promise<{ message: string }> {
    const { name } = createScaleFamilyDto;

    // Verification de la non-existence de la famille de gamme
    const existingScaleFamily = await this.prismaService.scaleFamily.findFirst({
      where: { name }
    })
    if (existingScaleFamily) throw new ConflictException('Cette famille de gamme existe déjà');

    // Création de la famille de gamme
    await this.prismaService.scaleFamily.create({
      data: {
        name
      },
    });

    return { message: 'Famille de gamme créée avec succès' };

  }

  //*** UPDATE SCALE FAMILY ***//
  async updateScaleFamily(id: number, updateScaleFamilyDto: UpdateScaleFamilyDto): Promise<{ message: string }> {
    const { name } = updateScaleFamilyDto;

    // Verification de l'existence de la famille d'accord
    const existingScaleFamily = await this.prismaService.scaleFamily.findUnique({
      where: { id }
    })
    if (!existingScaleFamily) throw new NotFoundException('Cette famille de gamme n\'existe pas');

    // Mise à jour de la famille de gamme
    await this.prismaService.scaleFamily.update({
      where: { id },
      data: { name },
    });

    return { message: 'Famille de gamme modifiée avec succès' };
  }

  //*** DELETE SCALE FAMILY ***//
  async removeScaleFamily(id: number): Promise<{ message: string }> {
    await this.prismaService.scaleFamily.delete({
      where: { id }
    })
    return { message: 'Famille de gamme supprimée avec succès' };
  }
}
