import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ChordNameService } from './chord-name.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateChordNameDto } from './dto/createChordName.dto';
import { UpdateChordNameDto } from './dto/updateChordName.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@ApiBearerAuth()
@ApiTags('Noms d\'accord')
@Controller('chord-names')
export class ChordNameController {
  constructor(private readonly chordNameService: ChordNameService) { }

  //*** GET ALL CHORD NAMES ***//
  @Get()
  getAllChordNames() {
    return this.chordNameService.findAll();
  }

  //*** GET CHORD NAME BY ID ***//
  @Get('/:id')
  getChordNameById(@Param('id', ParseIntPipe) id: number) {
    return this.chordNameService.findById(id);
  }

  //*** CREATE CHORD NAME ***//
  @Post('/create')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  createChordName(@Body() createChordNameDto: CreateChordNameDto) {
    return this.chordNameService.createChordName(createChordNameDto);
  }

  //*** UPDATE CHORD NAME ***//
  @Put('/update/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateChordName(@Param('id', ParseIntPipe) id: number, @Body() updateChordNameDto: UpdateChordNameDto) {
    return this.chordNameService.updateChordName(id, updateChordNameDto);
  }

  //*** DELETE CHORD NAME ***//
  @Delete('/delete/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteChordName(@Param('id', ParseIntPipe) id: number) {
    return this.chordNameService.removeChordName(id);
  }
}
