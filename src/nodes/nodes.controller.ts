import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Node } from './entities/node.entity';
import { manageException, notFoundException } from 'src/errors';

@Controller('nodes')
@ApiTags('Nodi')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  static notFoundErrorDescription = 'Il nodo richiesto non è stato trovato';

  /**
   * Crea un nuovo nodo
   * @param createNodeDto I dati del nuovo nodo
   * @returns L'ID del nodo appena creato
   */
  @Post()
  async create(@Body() createNodeDto: CreateNodeDto): Promise<number> {
    return await this.nodesService.create(createNodeDto);
  }

  /**
   * Reperisce tutti i nodi
   * @returns Tutti i nodi
   */
  @Get()
  async findAll(): Promise<Node[]> {
    return await this.nodesService.findAll();
  }

  /**
   * Reperisce un nodo specifico
   * @param id L'ID del nodo da reperire
   * @returns Il nodo reperito
   */
  @ApiNotFoundResponse({
    description: NodesController.notFoundErrorDescription,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Node> {
    try {
      return await this.nodesService.findOne(+id);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Aggiorna un nodo specifico
   * @param id L'ID del nodo da aggiornare
   * @param updateNodeDto I dati da aggiornare del nodo
   * @returns Il nodo modificato
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNodeDto: UpdateNodeDto,
  ): Promise<Node> {
    try {
      return await this.nodesService.update(+id, updateNodeDto);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Rimuove un nodo specifico
   * @param id L'ID del nodo da rimuovere
   * @returns Nulla
   */
  @ApiNotFoundResponse({
    description: NodesController.notFoundErrorDescription,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.nodesService.remove(+id);
    } catch (e) {
      manageException(e);
    }
  }
}
