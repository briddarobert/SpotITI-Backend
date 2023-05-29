import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { manageException } from 'src/errors';
import { Link } from './entities/link.entity';

@Controller('links')
@ApiTags('Collegamenti')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  public static notFoundErrorDescription =
    'Il collegamento richiesto non è stata trovato';

  /**
   * Crea un nuovo collegamento
   * @param createLinkDto I dati del nuovo collegamento
   * @returns L'ID del collegamento appena creato
   */
  @Post()
  async create(@Body() createLinkDto: CreateLinkDto): Promise<number[]> {
    try {
      return await this.linksService.create(createLinkDto);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Reperisce tutti i collegamenti
   * @returns Tutti i collegamenti
   */
  @Get()
  async findAll(): Promise<Link[]> {
    return await this.linksService.findAll();
  }

  /**
   * Reperisce un collegamento specifico
   * @param id L'ID del collegamento da reperire
   * @returns Il collegamento reperita
   */
  @ApiNotFoundResponse({
    description: LinksController.notFoundErrorDescription,
  })
  @Get(':nodeA/nodeB')
  async findOne(
    @Param('nodeA') nodeA: string,
    @Param('nodeB') nodeB: string,
  ): Promise<Link> {
    try {
      return await this.linksService.findOne(+nodeA, +nodeB);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Aggiorna un collegamento specifico
   * @param id L'ID del collegamento da aggiornare
   * @param updateLinkDto I dati da aggiornare del collegamento
   * @returns Il collegamento modificato
   */
  @Patch(':nodeA/:nodeB')
  async update(
    @Param('nodeA') nodeA: string,
    @Param('nodeB') nodeB: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<Link> {
    try {
      return await this.linksService.update(+nodeA, +nodeB, updateLinkDto);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Rimuove un collegamento specifico
   * @param id L'ID del collegamento da rimuovere
   * @returns Nulla
   */
  @ApiNotFoundResponse({
    description: LinksController.notFoundErrorDescription,
  })
  @Delete(':nodeA/:nodeB')
  async remove(
    @Param('nodeA') nodeA: string,
    @Param('nodeB') nodeB: string,
  ): Promise<void> {
    try {
      return await this.linksService.remove(+nodeA, +nodeB);
    } catch (e) {
      manageException(e);
    }
  }
}
