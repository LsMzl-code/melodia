import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChordService } from './chord.service';
import { CreateChordDto } from './dto/createChord.dto';
import { UpdateChordDto } from './dto/updateChord.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@ApiBearerAuth()
@ApiTags('Accords')
@Controller('chords')
export class ChordController {
  constructor(private readonly chordService: ChordService) { }

  //*** GET ALL CHORDS ***//
  @Get()
  getAllChords() {
    return this.chordService.findAll();
  }

  //*** GET CHORD BY ID ***//
  @Get('/:id')
  getChordById(@Param('id', ParseIntPipe) id: number) {
    return this.chordService.findById(id);
  }

  //*** CREATE CHORD ***//
  @Post('/create')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  createChord(@Body() createChordDto: CreateChordDto) {
    return this.chordService.createChord(createChordDto);
  }

  //*** UPDATE CHORD ***//
  @Put('/update/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateChord(@Param('id', ParseIntPipe) id: number, @Body() updateChordDto: UpdateChordDto) {
    return this.chordService.updateChord(id, updateChordDto);
  }

  //*** DELETE CHORD ***//
  @Delete('/delete/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteChord(@Param('id', ParseIntPipe) id: number) {
    return this.chordService.removeChord(id);
  }

}
