import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateChordFamilyDto } from './dto/createChordFamily.dto';
import { UpdateChordFamilyDto } from './dto/updateChordFamily.dto';
import { ChordFamilyService } from './chord-family.service';

@ApiBearerAuth()
@ApiTags('Familles d\'accord')
@Controller('chord-families')
export class ChordFamilyController {
  constructor(private readonly chordFamilyService: ChordFamilyService) { }

  //*** GET ALL CHORD FAMILIES ***//
  @Get()
  getAllChordFamilies() {
    return this.chordFamilyService.findAll();
  }

  //*** GET CHORD FAMILY BY ID ***//
  @Get('/:id')
  getChordFamilyById(@Param('id', ParseIntPipe) id: number) {
    return this.chordFamilyService.findById(id);
  }

  //*** CREATE CHORD FAMILY ***//
  @Post('/create')
  createChordFamily(@Body() createChordFamilyDto: CreateChordFamilyDto) {
    return this.chordFamilyService.createChordFamily(createChordFamilyDto);
  }

  //*** UPDATE CHORD FAMILY ***//
  @Put('/update/:id')
  updateChordFamily(@Param('id', ParseIntPipe) id: number, @Body() updateChordFamilyDto: UpdateChordFamilyDto) {
    return this.chordFamilyService.updateChordFamily(id, updateChordFamilyDto);
  }

  //*** DELETE CHORD FAMILY ***//
  @Delete('/delete/:id')
  deleteChordFamily(@Param('id', ParseIntPipe) id: number) {
    return this.chordFamilyService.removeChordFamily(id);
  }
}
