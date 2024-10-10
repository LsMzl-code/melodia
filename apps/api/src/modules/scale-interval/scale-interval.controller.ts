import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'; import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScaleIntervalService } from './scale-interval.service';
import { CreateScaleIntervalDto } from './dto/createScaleInterval.dto';
import { UpdateScaleIntervalDto } from './dto/updateScaleInterval.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role.type';


@ApiBearerAuth()
@ApiTags('Intervalles de gamme')
@Controller('scale-intervals')
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
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  createScaleInterval(@Body() createScaleIntervalDto: CreateScaleIntervalDto) {
    return this.scaleIntervalService.createScaleInterval(createScaleIntervalDto);
  }

  //*** UPDATE SCALE INTERVAL ***//
  @Put('/update/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateScaleInterval(@Param('id', ParseIntPipe) id: number, @Body() updateScaleIntervalDto: UpdateScaleIntervalDto) {
    return this.scaleIntervalService.updateScaleInterval(id, updateScaleIntervalDto);
  }

  //*** DELETE SCALE INTERVAL ***//
  @Delete('/delete/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteScaleInterval(@Param('id', ParseIntPipe) id: number) {
    return this.scaleIntervalService.removeScaleInterval(id);
  }
}
