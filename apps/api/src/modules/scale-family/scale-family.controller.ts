import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScaleFamilyService } from './scale-family.service';
import { UpdateScaleFamilyDto } from './dto/updateScaleFamily.dto';
import { CreateScaleFamilyDto } from './dto/createScaleFamily.dto';

@ApiBearerAuth()
@ApiTags('Familles de gamme')
@Controller('scale-families')
export class ScaleFamilyController {
  constructor(private readonly scaleFamilyService: ScaleFamilyService) { }

  //*** GET ALL SCALE FAMILIES ***//
  @Get()
  getAllScaleFamilies() {
    return this.scaleFamilyService.findAll();
  }

  //*** GET SCALE FAMILY BY ID ***//
  @Get('/:id')
  getScaleFamilyById(@Param('id', ParseIntPipe) id: number) {
    return this.scaleFamilyService.findById(id);
  }

  //*** CREATE SCALE FAMILY ***//
  @Post('/create')
  createScaleFamily(@Body() createScaleFamilyDto: CreateScaleFamilyDto) {
    return this.scaleFamilyService.createScaleFamily(createScaleFamilyDto);
  }

  //*** UPDATE SCALE FAMILY ***//
  @Put('/update/:id')
  updateScaleFamily(@Param('id', ParseIntPipe) id: number, @Body() updateScaleFamilyDto: UpdateScaleFamilyDto) {
    return this.scaleFamilyService.updateScaleFamily(id, updateScaleFamilyDto);
  }

  //*** DELETE SCALE FAMILY ***//
  @Delete('/delete/:id')
  deleteScaleFamily(@Param('id', ParseIntPipe) id: number) {
    return this.scaleFamilyService.removeScaleFamily(id);
  }
}
