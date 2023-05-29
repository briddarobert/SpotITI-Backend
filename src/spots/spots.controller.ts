import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Spot } from './entities/spot.entity';
import { CategoriesController } from 'src/categories/categories.controller';
import { manageException } from 'src/errors';
import { EntityNotFoundError } from 'typeorm';
import { NodesController } from 'src/nodes/nodes.controller';

@Controller('spots')
@ApiTags('Spot')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}
  static notFoundErrorDescription = 'Lo spot richiesto non è stato trovato';

  /**
   * Crea un nuovo spot
   * @param createSpotDto I dati del nuovo spot
   * @returns L'ID dello spot appena creato
   */
  @ApiNotFoundResponse({
    description: CategoriesController.notFoundErrorDescription, // Quando viene restituito un 404 significa che almeno una delle categorie specificate non è stata trovata...
  })
  @ApiNotFoundResponse({
    description: NodesController.notFoundErrorDescription, // ...oppure che uno dei nodi specificati non è stato trovato
  })
  @Post()
  async create(@Body() createSpotDto: CreateSpotDto): Promise<number> {
    try {
      return await this.spotsService.create(createSpotDto);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        if (e.message.includes('Category')) {
          throw new HttpException(
            CategoriesController.notFoundErrorDescription,
            HttpStatus.NOT_FOUND,
          );
        }
        if (e.message.includes('Node')) {
          throw new HttpException(
            NodesController.notFoundErrorDescription,
            HttpStatus.NOT_FOUND,
          );
        }
      }
      manageException(e);
    }
  }

  /**
   * Reperisce tutti gli spot
   * @returns Tutti gli spot
   */
  @Get()
  async findAll(): Promise<Spot[]> {
    return await this.spotsService.findAll();
  }

  /**
   * Reperisce uno spot specifico
   * @param id L'ID dello spot da reperire
   * @returns Lo spot reperito
   */
  @ApiNotFoundResponse({
    description: SpotsController.notFoundErrorDescription,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Spot> {
    try {
      return await this.spotsService.findOne(+id);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Aggiorna uno spot specifico
   * @param id L'ID dello spot da aggiornare
   * @param updateSpotDto I dati da aggiornare dello spot
   * @returns Lo spot modificato
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpotDto: UpdateSpotDto,
  ): Promise<Spot> {
    try {
      return await this.spotsService.update(+id, updateSpotDto);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Rimuove uno spot specifico
   * @param id L'ID dello spot da rimuovere
   * @returns Nulla
   */
  @ApiNotFoundResponse({
    description: SpotsController.notFoundErrorDescription,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.spotsService.remove(+id);
    } catch (e) {
      manageException(e);
    }
  }
}
