//*** MODULE ***//
import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { ChordFamilyModule } from "./modules/chord-family/chord-family.module";
import { ChordIntervalModule } from "./modules/chord-interval/chord-interval.module";
import { ChordNameModule } from "./modules/chord-name/chord-name.module";
import { ChordModule } from "./modules/chord/chord.module";
import { DegreeModule } from "./modules/degree/degree.module";
import { ModeModule } from "./modules/mode/mode.module";
import { NoteModule } from "./modules/note/note.module";
import { ScaleFamilyModule } from "./modules/scale-family/scale-family.module";
import { ScaleIntervalModule } from "./modules/scale-interval/scale-interval.module";
import { ScaleNameModule } from "./modules/scale-name/scale-name.module";
import { ScaleModule } from "./modules/scale/scale.module";
import { TonalityModule } from "./modules/tonality/tonality.module";
import { UserModule } from "./modules/user/user.module";
import { PrismaModule } from "./prisma/prisma.module";


//*** CONTROLLER ***//
import { AppController } from "./app.controller";
import { NoteController } from "./modules/note/note.controller";
import { ChordController } from "./modules/chord/chord.controller";
import { TonalityController } from "./modules/tonality/tonality.controller";
import { ScaleNameController } from "./modules/scale-name/scale-name.controller";
import { ChordNameController } from "./modules/chord-name/chord-name.controller";
import { ChordFamilyController } from "./modules/chord-family/chord-family.controller";
import { ScaleIntervalController } from "./modules/scale-interval/scale-interval.controller";


//*** SERVICE ***//
import { AppService } from "./app.service";
import { ScaleService } from "./modules/scale/scale.service";
import { NoteService } from "./modules/note/note.service";
import { ChordService } from "./modules/chord/chord.service";
import { TonalityService } from "./modules/tonality/tonality.service";
import { ScaleNameService } from "./modules/scale-name/scale-name.service";
import { ChordNameService } from "./modules/chord-name/chord-name.service";
import { ScaleFamilyService } from "./modules/scale-family/scale-family.service";
import { ChordFamilyService } from "./modules/chord-family/chord-family.service";
import { ScaleIntervalService } from "./modules/scale-interval/scale-interval.service";
import { CloudinaryModule } from "./modules/cloudinary/cloudinary.module";
import { CloudinaryService } from "./modules/cloudinary/cloudinary.service";
import { CloudinaryController } from './modules/cloudinary/cloudinary.controller';
import { ConfigModule } from "@nestjs/config";
import { UserService } from "./modules/user/user.service";




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NoteModule,
    ScaleModule,
    ChordModule,
    PrismaModule,
    TonalityModule,
    ModeModule,
    ScaleNameModule,
    ChordNameModule,
    ScaleFamilyModule,
    ChordFamilyModule,
    DegreeModule,
    ScaleIntervalModule,
    ChordIntervalModule,
    AuthModule,
    UserModule,
    CloudinaryModule,
  // UserModule
],
  controllers: [AppController, NoteController, ChordController, TonalityController, ScaleNameController, ChordNameController, ChordFamilyController, ScaleIntervalController, CloudinaryController],
  providers: [AppService, ScaleService, NoteService, ChordService, TonalityService, ScaleNameService, ChordNameService, ScaleFamilyService, ChordFamilyService, ScaleIntervalService, CloudinaryService, UserService],
})
export class AppModule { }
