import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModeService } from './mode.service';
import { UpdateModeDto } from './dto/updateMode.dto';
import { CreateModeDto } from './dto/createMode.dto';

@ApiBearerAuth()
@ApiTags('Modes')
@Controller('modes')
export class ModeController {
  constructor(private readonly modeService: ModeService) { }

  //*** GET ALL MODES ***//
  @Get()
  getAllModes() {
    return this.modeService.findAll();
  }

  //*** GET MODE BY ID ***//
  @Get('/:id')
  getModeById(@Param('id', ParseIntPipe) id: number) {
    return this.modeService.findById(id);
  }

  //*** CREATE MODE ***//
  @Post('/create')
  createMode(@Body() createModeDto: CreateModeDto) {
    return this.modeService.createMode(createModeDto);
  }

  //*** UPDATE MODE ***//
  @Put('/update/:id')
  updateMode(@Param('id', ParseIntPipe) id: number, @Body() updateModeDto: UpdateModeDto) {
    return this.modeService.updateMode(id, updateModeDto);
  }

  //*** DELETE MODE ***//
  @Delete('/delete/:id')
  deleteMode(@Param('id', ParseIntPipe) id: number) {
    return this.modeService.removeMode(id);
  }
}
