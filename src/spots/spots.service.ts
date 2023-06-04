import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Spot } from './entities/spot.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { NodesService } from 'src/nodes/nodes.service';
import { Node } from 'src/nodes/entities/node.entity';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private spotsRepository: Repository<Spot>,
    private categoriesService: CategoriesService,
    private nodesService: NodesService,
  ) {}

  async create(createSpotDto: CreateSpotDto) {
    let nodes: Node[] = [];
    for (const nodeId of createSpotDto.nodes) {
      nodes.push(await this.nodesService.findOne(nodeId));
    }

    // Non si può passare direttamente il DTO dato che non è possibile inserire direttamente un oggetto nel database come colonna
    const spot = {
      ...createSpotDto,
      data: JSON.stringify(createSpotDto.data), // È necessario serializzare questa proprietà (un generico oggetto) in una stringa
      category: await this.categoriesService.findOne(createSpotDto.category),
      nodes,
    };
    return (await this.spotsRepository.save(spot)).id;
  }

  async findAll(): Promise<Spot[]> {
    let spots: Spot[] = await this.spotsRepository.find({
      relations: { category: true, nodes: true },
    });
    spots.forEach((spot) => {
      // TODO: Forse questo non è il metodo migliore, si sta effettivamente abusando del tipo di ritorno di `JSON.parse` (`any`) per inserire un oggetto dove in verità la classe spot definisce una stringa
      spot.data = JSON.parse(spot.data); // È necessario deserializzare la proprietà `data`, serializzata in modo da poter essere salvata come colonna nel database
    });
    return spots;
  }

  async findOne(id: number): Promise<Spot> {
    let spot: Spot;
    const spots: Spot[] = await this.spotsRepository.find({
      relations: {
        category: true,
        nodes: true,
      },
    });

    for (const s of spots) {
      if (s.id == id) {
        spot = s;
        break;
      }
    }
    if (!spot) throw new EntityNotFoundError(Category, undefined);
    // TODO: Forse questo non è il metodo migliore, si sta effettivamente abusando del tipo di ritorno di `JSON.parse` (`any`) per inserire un oggetto dove in verità la classe spot definisce una stringa
    spot.data = JSON.parse(spot.data);
    return spot;
  }

  // TODO: Attialmente inutilizzata, forse da rimuovere?
  async findOneByCategory(id: number): Promise<Spot> {
    let spot: Spot;
    const spots: Spot[] = await this.spotsRepository.find({
      relations: {
        category: true,
        nodes: true,
      },
    });

    for (const s of spots) {
      if (s.category && s.category.id == id) {
        spot = s;
        break;
      }
    }
    if (!spot) throw new EntityNotFoundError(Category, undefined);
    // TODO: Forse questo non è il metodo migliore, si sta effettivamente abusando del tipo di ritorno di `JSON.parse` (`any`) per inserire un oggetto dove in verità la classe spot definisce una stringa
    spot.data = JSON.parse(spot.data);
    return spot;
  }

  async update(id: number, updateSpotDto: UpdateSpotDto): Promise<Spot> {
    let nodes: Node[] = [];
    for (const nodeId of updateSpotDto.nodes) {
      nodes.push(await this.nodesService.findOne(nodeId));
    }

    // await this.spotsRepository.update({ id }, spot); // N.B.: Purtroppo questo non funziona, segue codice per rimediare, abbastanza «brutto». Vedi `https://github.com/typeorm/typeorm/issues/8404#issuecomment-1320199819` ed altri issue per "Cannot query across one-to-many for property [...]"

    const entity = await this.findOne(id);

    // Non si può passare direttamente il DTO dato che non è possibile inserire direttamente un oggetto nel database come colonna
    const spot = {
      ...entity,
      ...updateSpotDto,
      data: JSON.stringify(updateSpotDto.data), // È necessario serializzare questa proprietà (un generico oggetto) in una stringa
      category: updateSpotDto.category
        ? await this.categoriesService.findOne(updateSpotDto.category)
        : undefined,
      nodes: nodes.concat(entity.nodes),
    };

    Object.assign(entity, spot);
    await this.spotsRepository.save(entity);

    return this.spotsRepository.findOneByOrFail({
      id,
    });
  }

  async remove(id: number): Promise<void> {
    this.spotsRepository.remove(
      await this.spotsRepository.findOneByOrFail({ id }),
    );
  }
}
