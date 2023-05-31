import { Controller, Get, Param, Query } from '@nestjs/common';
import { RouteService } from './route.service';
import { manageException } from 'src/errors';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Route } from './entities/route.entity';

@Controller('route')
@ApiTags('Percorsi')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  /**
   * Calcola un percorso tra due nodi
   * @param nodeA Nodo di partenza
   * @param nodeB Nodo di arrivo
   * @returns Il percorso da eseguire, rappresentato da un vettore di nodi, assieme alla sua lunghezza
   */
  @ApiQuery({
    name: 'excludedLinkTypes',
    required: false,
    description:
      'Tipi di collegamenti da escludere, separati da una virgola (es. `abc,xyz,foobar`)',
  })
  @Get(':nodeA/:nodeB')
  async findOne(
    @Param('nodeA') nodeA: string,
    @Param('nodeB') nodeB: string,
    @Query('excludedLinkTypes') excludedLinkTypes?: string,
  ): Promise<Route> {
    try {
      return await this.routeService.calculate(
        +nodeA,
        +nodeB,
        excludedLinkTypes ? excludedLinkTypes.split(',') : [],
      );
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Calcola un percorso da un nodo al nodo più vicino di un determinato spot
   * @param node Nodo di partenza
   * @param spot Spot desiderato
   * @returns Il percorso da eseguire, rappresentato da un vettore di nodi, assieme alla sua lunghezza
   */
  @ApiQuery({
    name: 'excludedLinkTypes',
    required: false,
    description:
      'Tipi di collegamenti da escludere, separati da una virgola (es. `abc,xyz,foobar`)',
  })
  @Get(':node/spot/:spot')
  async findOneBySpot(
    @Param('node') node: string,
    @Param('spot') spot: string,
    @Query('excludedLinkTypes') excludedLinkTypes?: string,
  ): Promise<Route> {
    try {
      return await this.routeService.calculateToSpot(
        +node,
        +spot,
        excludedLinkTypes ? excludedLinkTypes.split(',') : [],
      );
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Calcola un percorso da un nodo al nodo più vicino di una determinata categoria
   * @param node Nodo di partenza
   * @param spot Categoria desiderata
   * @returns Il percorso da eseguire, rappresentato da un vettore di nodi, assieme alla sua lunghezza
   */
  @ApiQuery({
    name: 'excludedSpots',
    required: false,
    description: 'Spot da escludere, separati da una virgola (es. `1,3,69`)',
  })
  @ApiQuery({
    name: 'excludedLinkTypes',
    required: false,
    description:
      'Tipi di collegamenti da escludere, separati da una virgola (es. `abc,xyz,foobar`)',
  })
  @Get(':node/category/:category')
  async findOneByCategory(
    @Param('node') node: string,
    @Param('category') category: string,
    @Query('excludedSpots') excludedSpots?: string,
    @Query('excludedLinkTypes') excludedLinkTypes?: string,
  ): Promise<Route> {
    try {
      return await this.routeService.calculateToCategory(
        +node,
        +category,
        excludedSpots ? excludedSpots.split(',').map(Number) : [],
        excludedLinkTypes ? excludedLinkTypes.split(',') : [],
      );
    } catch (e) {
      manageException(e);
    }
  }
}
