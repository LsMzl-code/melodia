import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScaleDto } from './dto/createScale.dto';
import { Scale } from 'src/entities/scale.entity';

@Injectable()
export class ScaleService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL SCALES ***//
  async findAll(): Promise<Scale[]> {
    const scales = await this.prismaService.scale.findMany();
    if (!scales) throw new NotFoundException('Aucune gamme trouvée');
    return scales as Scale[];
  }

  //*** GET SCALE BY ID ***//
  async findById(id: number): Promise<Scale> {
    const scale = await this.prismaService.scale.findUnique({
      where: { id }
    })
    if (!scale) throw new NotFoundException('Gamme non trouvée');
    return scale as Scale;
  }

  //*** CREATE SCALE ***//
  async createScale(createScaleDto: CreateScaleDto): Promise<{ message: string }> {
    const { name, tonality } = createScaleDto;

    // Vérification de la non-existence de la note
    const existingScale = await this.prismaService.scale.findFirst({
      where: { name, tonality }
    })
    if (existingScale) throw new ConflictException('Cette gamme existe déjà');

    // Création de la gamme
    await this.prismaService.scale.create({
      data: {
        ...createScaleDto
      }
    })

    return { message: 'Gamme créée avec succès' };

  }

  //*** UPDATE SCALE ***//
  // async updateScale(id: number, updateChordDto: UpdateChordDto): Promise<{ message: string }> {
  //   // const { name } = updateChordDto;

  //   // Verification de l'existence de la note'
  //   // const existingNote = await this.prismaService.note.findUnique({
  //   //   where: { id }
  //   // })
  //   // if (!existingNote) throw new NotFoundException('Cette note n\'existe pas');

  //   // // Mise à jour de la note
  //   // await this.prismaService.note.update({
  //   //   where: { id },
  //   //   data: {
  //   //     name,
  //   //     reference,
  //   //     type,
  //   //     soundUrl,
  //   //   },
  //   // });

  //   return { message: 'Note modifiée avec succès' };
  // }

  //*** DELETE SCALE ***//
  async removeScale(id: number): Promise<{ message: string }> {
    await this.prismaService.note.delete({
      where: { id }
    })
    return { message: 'Note supprimée avec succès' };
  }
}
