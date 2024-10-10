import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChordIntervalService } from './chord-interval.service';
import { CreateChordIntervalDto } from './dto/createChordInterval.dto';
import { UpdateChordIntervalDto } from './dto/updateChordInterval.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role.type';

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
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  createChordInterval(@Body() createChordIntervalDto: CreateChordIntervalDto) {
    return this.chordIntervalService.createChordInterval(createChordIntervalDto);
  }

  //*** UPDATE CHORD INTERVAL ***//
  @Put('/update/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateChordInterval(@Param('id', ParseIntPipe) id: number, @Body() updateChordIntervalDto: UpdateChordIntervalDto) {
    return this.chordIntervalService.updateChordInterval(id, updateChordIntervalDto);
  }

  //*** DELETE CHORD INTERVAL ***//
  @Delete('/delete/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteChordInterval(@Param('id', ParseIntPipe) id: number) {
    return this.chordIntervalService.removeChordInterval(id);
  }

}
