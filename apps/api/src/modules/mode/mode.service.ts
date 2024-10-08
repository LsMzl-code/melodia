import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModeDto } from './dto/createMode.dto';

import { UpdateModeDto } from './dto/updateMode.dto';
import { Mode } from 'src/entities/mode.entity';

@Injectable()
export class ModeService {
  constructor(private readonly prismaService: PrismaService) { }

   //*** GET ALL MODES ***//
   async findAll(): Promise<Mode[]> {
    const modes = await this.prismaService.mode.findMany();
    if (!modes) throw new NotFoundException('Aucun mode trouvé');
    return modes as Mode[];
  }

  //*** GET MODE BY ID ***//
  async findById(id: number): Promise<Mode> {
    const mode = await this.prismaService.mode.findUnique({
      where: { id }
    })
    if (!mode) throw new NotFoundException('Mode non trouvé');
    return mode as Mode;
  }

  //*** CREATE MODE ***//
  async createMode(createModeDto: CreateModeDto): Promise<{ message: string }> {
    const { name } = createModeDto;

    // Verification de la non-existence de la tonalité
    const existingMode = await this.prismaService.mode.findUnique({
      where: { name }
    })
    if (existingMode) throw new ConflictException('Ce mode existe déjà');

    // Création de la tonalité
    await this.prismaService.mode.create({
      data: { name }
    })

    return { message: 'Mode créé avec succès' };

  }

  //*** UPDATE MODE ***//
  async updateMode(id: number, updateModeDto: UpdateModeDto): Promise<{ message: string }> {
    const { name } = updateModeDto;

    // Verification de l'existence de la tonalité
    const existingMode = await this.prismaService.mode.findUnique({
      where: { id }
    })
    if (!existingMode) throw new NotFoundException('Ce mode n\'existe pas');

    // Mise à jour de la tonalité
    await this.prismaService.mode.update({
      where: { id },
      data: { name }
    })

    return { message: 'Mode modifié avec succès' };
  }

  //*** DELETE MODE ***//
  async removeMode(id: number): Promise<{ message: string }> {
    await this.prismaService.mode.delete({
      where: { id }
    })

    return { message: 'Mode supprimé avec succès' };
  }
}
