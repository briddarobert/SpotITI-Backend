import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { NodesService } from 'src/nodes/nodes.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
    private nodesService: NodesService,
  ) {}

  async create(createLinkDto: CreateLinkDto) {
    if (!createLinkDto.weight) {
      const nodeA = await this.nodesService.findOne(createLinkDto.nodeA);
      const nodeB = await this.nodesService.findOne(createLinkDto.nodeB);

      createLinkDto.weight = Math.sqrt(
        Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2), // Teorema di Pitagora
      );
    }
    const link: Link = await this.linksRepository.save(createLinkDto);

    return [link.nodeA, link.nodeB];
  }

  async findAll(): Promise<Link[]> {
    return await this.linksRepository.find();
  }

  async findOne(nodeA: number, nodeB: number): Promise<Link> {
    try {
      return await this.linksRepository.findOneByOrFail({ nodeA, nodeB });
    } catch {
      return await this.linksRepository.findOneByOrFail({
        nodeA: nodeB,
        nodeB: nodeA,
      });
    }
  }

  async update(
    nodeA: number,
    nodeB: number,
    updateLinkDto: UpdateLinkDto,
  ): Promise<Link> {
    try {
      await this.linksRepository.update({ nodeA, nodeB }, updateLinkDto); // N.B.: Non viene eseguito alcun controllo per verificare l'esistenza dell'entità da aggiornare
    } catch {
      await this.linksRepository.update(
        { nodeA: nodeB, nodeB: nodeA },
        updateLinkDto,
      ); // N.B.: Non viene eseguito alcun controllo per verificare l'esistenza dell'entità da aggiornare
    }
    return this.findOne(nodeA, nodeB);
  }

  async remove(nodeA: number, nodeB: number): Promise<void> {
    this.linksRepository.remove(await this.findOne(nodeA, nodeB));
  }
}
