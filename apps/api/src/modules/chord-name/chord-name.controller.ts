import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ChordNameService } from './chord-name.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateChordNameDto } from './dto/createChordName.dto';
import { UpdateChordNameDto } from './dto/updateChordName.dto';

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
  createChordName(@Body() createChordNameDto: CreateChordNameDto) {
    return this.chordNameService.createChordName(createChordNameDto);
  }

  //*** UPDATE CHORD NAME ***//
  @Put('/update/:id')
  updateChordName(@Param('id', ParseIntPipe) id: number, @Body() updateChordNameDto: UpdateChordNameDto) {
    return this.chordNameService.updateChordName(id, updateChordNameDto);
  }

  //*** DELETE CHORD NAME ***//
  @Delete('/delete/:id')
  deleteChordName(@Param('id', ParseIntPipe) id: number) {
    return this.chordNameService.removeChordName(id);
  }
}
