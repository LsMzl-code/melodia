import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DegreeService } from './degree.service';
import { CreateDegreeDto } from './dto/createDegree.dto';
import { UpdateDegreeDto } from './dto/updateDegree.dto';

@ApiBearerAuth()
@ApiTags('Degrés')
@Controller('degree')
export class DegreeController {
  constructor(private readonly degreeService: DegreeService) { }

  //*** GET ALL DEGREES ***//
  @Get()
  getAllDegrees() {
    return this.degreeService.findAll();
  }

  //*** GET DEGREE BY ID ***//
  @Get('/:id')
  getDegreeById(@Param('id', ParseIntPipe) id: number) {
    return this.degreeService.findById(id);
  }

  //*** CREATE DEGREE ***//
  @Post('/create')
  createDegree(@Body() createDegreeDto: CreateDegreeDto) {
    return this.degreeService.createDegree(createDegreeDto);
  }

  //*** UPDATE DEGREE ***//
  @Put('/update/:id')
  updateDegree(@Param('id', ParseIntPipe) id: number, @Body() updateDegreeDto: UpdateDegreeDto) {
    return this.degreeService.updateDegree(id, updateDegreeDto);
  }

  //*** DELETE DEGREE ***//
  @Delete('/delete/:id')
  deleteDegree(@Param('id', ParseIntPipe) id: number) {
    return this.degreeService.removeDegree(id);
  }

}
