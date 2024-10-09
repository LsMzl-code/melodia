import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChordIntervalService } from './chord-interval.service';
import { CreateChordIntervalDto } from './dto/createChordInterval.dto';
import { UpdateChordIntervalDto } from './dto/updateChordInterval.dto';

@ApiBearerAuth()
@ApiTags('Intervalles d\'accords')
@Controller('chord-intervals')
export class ChordIntervalController {
  constructor(private readonly chordIntervalService: ChordIntervalService) { }

  //*** GET ALL CHORDS INTERVAL ***//
  @Get()
  getAllChordIntervals() {
    return this.chordIntervalService.findAll();
  }

  //*** GET CHORD INTERVAL BY ID ***//
  @Get('/:id')
  getChordIntervalById(@Param('id', ParseIntPipe) id: number) {
    return this.chordIntervalService.findById(id);
  }

  //*** CREATE CHORD INTERVAL ***//
  @Post('/create')
  createChordInterval(@Body() createChordIntervalDto: CreateChordIntervalDto) {
    return this.chordIntervalService.createChordInterval(createChordIntervalDto);
  }

  //*** UPDATE CHORD INTERVAL ***//
  @Put('/update/:id')
  updateChordInterval(@Param('id', ParseIntPipe) id: number, @Body() updateChordIntervalDto: UpdateChordIntervalDto) {
    return this.chordIntervalService.updateChordInterval(id, updateChordIntervalDto);
  }

  //*** DELETE CHORD INTERVAL ***//
  @Delete('/delete/:id')
  deleteChordInterval(@Param('id', ParseIntPipe) id: number) {
    return this.chordIntervalService.removeChordInterval(id);
  }

}
