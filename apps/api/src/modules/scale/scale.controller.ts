import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ScaleService } from './scale.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateScaleDto } from './dto/createScale.dto';

@ApiBearerAuth()
@ApiTags('Gammes')
@Controller('scales')
export class ScaleController {
  constructor(private readonly scaleService: ScaleService) {}

   //*** GET ALL SCALES ***//
   @Get()
   getAllNotes() {
     return this.scaleService.findAll();
   }
 
   //*** GET SCALE BY ID ***//
   @Get('/:id')
   getNoteById(@Param('id', ParseIntPipe) id: number) {
     return this.scaleService.findById(id);
   }
 
   //*** CREATE SCALE ***//
   @Post('/create')
   @Roles(Role.ADMIN) // Route reservées aux admin
   @UseGuards(JwtAuthGuard, RoleGuard)
   createNote(@Body() createScaleDto: CreateScaleDto) {
     return this.scaleService.createScale(createScaleDto);
   }
 
  //  //*** UPDATE SCALE ***//
  //  @Put('/update/:id')
  //  @Roles(Role.ADMIN) // Route reservées aux admin
  //  @UseGuards(JwtAuthGuard, RoleGuard)
  //  updateNote(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto) {
  //    return this.scaleService.updateScale(id, updateNoteDto);
  //  }
 
  //  //*** DELETE SCALE ***//
  //  @Delete('/delete/:id')
  //  @Roles(Role.ADMIN) // Route reservées aux admin
  //  @UseGuards(JwtAuthGuard, RoleGuard)
  //  deleteNote(@Param('id', ParseIntPipe) id: number) {
  //    return this.scaleService.removeScale(id);
  //  }


}
