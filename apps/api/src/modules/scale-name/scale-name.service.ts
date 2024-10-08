import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScaleNameDto } from './dto/createScaleName.dto';
import { UpdateScaleNameDto } from './dto/updateScaleName.dto';
import { ScaleName } from 'src/entities/scale-name.entity';

@Injectable()
export class ScaleNameService {
  constructor(private readonly prismaService: PrismaService) { }

   //*** GET ALL SCALE NAMES ***//
   async findAll(): Promise<ScaleName[]> {
    const scaleNames = await this.prismaService.scaleName.findMany();
    if (!scaleNames) throw new NotFoundException('Aucun nom de gamme trouvé');
    return scaleNames;
  }

  //*** GET SCALE NAME BY ID ***//
  async findById(id: number): Promise<ScaleName> {
    const scaleName = await this.prismaService.scaleName.findUnique({
      where: { id }
    })
    if (!scaleName) throw new NotFoundException('Nom de gamme non trouvé');
    return scaleName;
  }

  //*** CREATE SCALE NAME ***//
  async createScaleName(createScaleNameDto: CreateScaleNameDto): Promise<{ message: string }> {
    const { name } = createScaleNameDto;

    // Vérification de la non-existence du nom de gamme
    const existingScaleName = await this.prismaService.scaleName.findUnique({
      where: { name }
    })
    if (existingScaleName) throw new ConflictException('Ce nom de gamme existe déjà');

    // Création du nom de gamme
    await this.prismaService.scaleName.create({
      data: { name }
    })

    return { message: 'Nom de gamme créé avec succès' };

  }

  //*** UPDATE SCALE NAME ***//
  async updateScaleName(id: number, updateScaleNameDto: UpdateScaleNameDto): Promise<{ message: string }> {
    const { name } = updateScaleNameDto;

    // Verification de l'existence du nom de gamme
    const existingScaleName = await this.prismaService.scaleName.findUnique({
      where: { id }
    })
    if (!existingScaleName) throw new ConflictException('Ce nom de gamme n\'existe pas');

    // Mise à jour du nom de gamme
    await this.prismaService.scaleName.update({
      where: { id },
      data: { name }
    })

    return { message: 'Nom de gamme modifié avec succès' };
  }

  //*** DELETE SCALE NAME ***//
  async removeScaleName(id: number): Promise<{ message: string }> {
    await this.prismaService.scaleName.delete({
      where: { id }
    })

    return { message: 'Nom de gamme supprimé avec succès' };
  }
}
