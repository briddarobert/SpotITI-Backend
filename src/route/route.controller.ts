import { Controller, Get, Param } from '@nestjs/common';
import { RouteService } from './route.service';
import { manageException } from 'src/errors';
import { ApiTags } from '@nestjs/swagger';
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
  @Get(':nodeA/:nodeB')
  async findOne(
    @Param('nodeA') nodeA: string,
    @Param('nodeB') nodeB: string,
  ): Promise<Route> {
    try {
      return await this.routeService.calculate(+nodeA, +nodeB);
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
  @Get(':node/spot/:spot')
  async findOneBySpot(
    @Param('node') node: string,
    @Param('spot') spot: string,
  ): Promise<Route> {
    try {
      return await this.routeService.calculateToSpot(+node, +spot);
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
  @Get(':node/category/:category')
  async findOneByCategory(
    @Param('node') node: string,
    @Param('category') category: string,
  ): Promise<Route> {
    try {
      return await this.routeService.calculateToCategory(+node, +category);
    } catch (e) {
      manageException(e);
    }
  }
}
