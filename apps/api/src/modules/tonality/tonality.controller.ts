import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TonalityService } from './tonality.service';
import { CreateTonalityDto } from './dto/createTonality.dto';
import { UpdateTonalityDto } from './dto/updateTonality.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/types/role.type';

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
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  createTonality(@Body() createTonalityDto: CreateTonalityDto) {
    return this.tonalityService.createTonality(createTonalityDto);
  }

  //*** UPDATE TONALITY ***//
  @Put('/update/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateTonality(@Param('id', ParseIntPipe) id: number, @Body() updateTonalityDto: UpdateTonalityDto) {
    return this.tonalityService.updateTonality(id, updateTonalityDto);
  }

  //*** DELETE TONALITY ***//
  @Delete('/delete/:id')
  @Roles(Role.ADMIN) // Route reservées aux admin
  @UseGuards(JwtAuthGuard, RoleGuard)
  deleteTonality(@Param('id', ParseIntPipe) id: number) {
    return this.tonalityService.removeTonality(id);
  }
}
