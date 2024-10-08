import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDegreeDto } from './dto/createDegree.dto';
import { UpdateDegreeDto } from './dto/updateDegree.dto';
import { Degree } from 'src/entities/degree.entity';

@Injectable()
export class DegreeService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL DEGREES ***//
  async findAll(): Promise<Degree[]> {
    const degrees = await this.prismaService.degree.findMany();
    if (!degrees) throw new NotFoundException('Aucun degrés trouvé');
    return degrees as Degree[];
  }

  //*** GET DEGREE BY ID ***//
  async findById(id: number): Promise<Degree> {
    const degree = await this.prismaService.degree.findUnique({
      where: { id }
    })
    if (!degree) throw new NotFoundException('Degrés non trouvé');
    return degree as Degree;
  }

  //*** CREATE DEGREE ***//
  async createDegree(createDegreeDto: CreateDegreeDto): Promise<{ message: string }> {
    const { content } = createDegreeDto;

    // Verification de la non-existence de la note
    const existingDegree = await this.prismaService.degree.findFirst({
      where: { content }
    })
    if (existingDegree) throw new ConflictException('Ce degrés existe déjà');

    // Création du degré
    await this.prismaService.degree.create({
      data: {
        content
      },
    });

    return { message: 'Degrés créé avec succès' };

  }

  //*** UPDATE DEGREE ***//
  async updateDegree(id: number, updateDegreeDto: UpdateDegreeDto): Promise<{ message: string }> {
    const { content } = updateDegreeDto;

    // Verification de l'existence de la note
    const existingDegree = await this.prismaService.degree.findUnique({
      where: { id }
    })
    if (!existingDegree) throw new NotFoundException('Ce degré n\'existe pas');

    // Mise à jour du degré
    await this.prismaService.degree.update({
      where: { id },
      data: {
        content
      },
    });

    return { message: 'Degré modifié avec succès' };
  }

  //*** DELETE DEGREE ***//
  async removeDegree(id: number): Promise<{ message: string }> {
    await this.prismaService.degree.delete({
      where: { id }
    })
    return { message: 'Degrés supprimée avec succès' };
  }
}
