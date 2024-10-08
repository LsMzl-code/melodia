import { Controller, Get } from '@nestjs/common';
import { ScaleService } from './scale.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Gammes')
@Controller('scales')
export class ScaleController {
  constructor(private readonly scaleService: ScaleService) {}


}
