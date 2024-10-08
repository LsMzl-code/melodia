import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TonalityService } from './tonality.service';
import { CreateTonalityDto } from './dto/createTonality.dto';
import { UpdateTonalityDto } from './dto/updateTonality.dto';

@ApiBearerAuth()
@ApiTags('Tonalité')
@Controller('tonalities')
export class TonalityController {
  constructor(private readonly tonalityService: TonalityService) { }

    //*** GET ALL TONALITY ***//
    @Get()
    getAllTonalities() {
      return this.tonalityService.findAll();
    }
  
    //*** GET TONALITY BY ID ***//
    @Get('/:id')
    getTonalityById(@Param('id', ParseIntPipe) id: number) {
      return this.tonalityService.findById(id);
    }
  
    //*** CREATE TONALITY ***//
    @Post('/create')
    createTonality(@Body() createTonalityDto: CreateTonalityDto) {
      return this.tonalityService.createTonality(createTonalityDto);
    }
  
    //*** UPDATE TONALITY ***//
    @Put('/update/:id')
    updateTonality(@Param('id', ParseIntPipe) id: number, @Body() updateTonalityDto: UpdateTonalityDto) {
      return this.tonalityService.updateTonality(id, updateTonalityDto);
    }
  
    //*** DELETE TONALITY ***//
    @Delete('/delete/:id')
    deleteTonality(@Param('id', ParseIntPipe) id: number) {
      return this.tonalityService.removeTonality(id);
    }
}
