import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ScaleNameService } from './scale-name.service';
import { CreateScaleNameDto } from './dto/createScaleName.dto';
import { UpdateScaleNameDto } from './dto/updateScaleName.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Noms de gamme')
@Controller('scale-names')
export class ScaleNameController {
  constructor(private readonly scaleNameService: ScaleNameService) { }

  //*** GET ALL SCALE NAMES ***//
  @Get()
  getAllScaleNames() {
    return this.scaleNameService.findAll();
  }

  //*** GET SCALE NAME BY ID ***//
  @Get('/:id')
  getScaleNameById(@Param('id', ParseIntPipe) id: number) {
    return this.scaleNameService.findById(id);
  }

  //*** CREATE SCALE NAME ***//
  @Post('/create')
  createScaleName(@Body() createScaleNameDto: CreateScaleNameDto) {
    return this.scaleNameService.createScaleName(createScaleNameDto);
  }

  //*** UPDATE SCALE NAME ***//
  @Put('/update/:id')
  updateScaleName(@Param('id', ParseIntPipe) id: number, @Body() updateScaleNameDto: UpdateScaleNameDto) {
    return this.scaleNameService.updateScaleName(id, updateScaleNameDto);
  }

  //*** DELETE SCALE NAME ***//
  @Delete('/delete/:id')
  deleteScaleName(@Param('id', ParseIntPipe) id: number) {
    return this.scaleNameService.removeScaleName(id);
  }
}
