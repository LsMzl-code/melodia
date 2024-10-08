import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'; import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScaleIntervalService } from './scale-interval.service';
import { CreateScaleIntervalDto } from './dto/createScaleInterval.dto';
import { UpdateScaleIntervalDto } from './dto/updateScaleInterval.dto';

@ApiBearerAuth()
@ApiTags('Intervalles de gamme')
@Controller('scale-interval')
export class ScaleIntervalController {
  constructor(private readonly scaleIntervalService: ScaleIntervalService) { }

  //*** GET ALL SCALE INTERVALS ***//
  @Get()
  getAllScaleIntervals() {
    return this.scaleIntervalService.findAll();
  }

  //*** GET SCALE INTERVAL BY ID ***//
  @Get('/:id')
  getScaleIntervalById(@Param('id', ParseIntPipe) id: number) {
    return this.scaleIntervalService.findById(id);
  }

  //*** CREATE SCALE INTERVAL ***//
  @Post('/create')
  createScaleInterval(@Body() createScaleIntervalDto: CreateScaleIntervalDto) {
    return this.scaleIntervalService.createScaleInterval(createScaleIntervalDto);
  }

  //*** UPDATE SCALE INTERVAL ***//
  @Put('/update/:id')
  updateScaleInterval(@Param('id', ParseIntPipe) id: number, @Body() updateScaleIntervalDto: UpdateScaleIntervalDto) {
    return this.scaleIntervalService.updateScaleInterval(id, updateScaleIntervalDto);
  }

  //*** DELETE SCALE INTERVAL ***//
  @Delete('/delete/:id')
  deleteScaleInterval(@Param('id', ParseIntPipe) id: number) {
    return this.scaleIntervalService.removeScaleInterval(id);
  }
}
