import { Injectable } from '@nestjs/common';
import { NodesService } from 'src/nodes/nodes.service';
import { Node } from 'src/nodes/entities/node.entity';
import Graph from 'node-dijkstra';
import { SpotsService } from 'src/spots/spots.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Route } from './entities/route.entity';
import { Spot } from 'src/spots/entities/spot.entity';

@Injectable()
export class RouteService {
  constructor(
    private nodesService: NodesService,
    private spotsService: SpotsService,
    private categoriesService: CategoriesService,
  ) {}

  static noPathFoundError = new Error('No path found');

  async calculate(nodeA: number, nodeB: number): Promise<Route> {
    const allNodes: Node[] = await this.nodesService.findAll();
    const graph: Graph = new Graph();

    for (const node of allNodes) {
      let neighbors = {};
      for (const link of node.linksWithNodeAsStart) {
        neighbors[link.nodeB] = link.weight;
      }
      for (const link of node.linksWithNodeAsEnd) {
        neighbors[link.nodeA] = link.weight;
      }

      graph.addNode(node.id.toString(), neighbors);
    }

    let path = graph.path(nodeA.toString(), nodeB.toString(), {
      cost: true,
    }) as { path: string[]; cost: number }; // Dato che abbiamo dato l'opzione «cost» sopra, il tipo sarà sempre questo, ma TypeScript non lo sa

    if (!path.path) {
      throw RouteService.noPathFoundError;
    }

    return {
      nodes: path.path.map(Number),
      lenght: path.cost,
    };
  }

  async calculateToSpot(node: number, spot: number): Promise<Route> {
    const nodes: Node[] = (await this.spotsService.findOne(spot)).nodes;
    let route: Route;

    for (const currentNode of nodes) {
      let currentRoute = await this.calculate(node, currentNode.id);
      if (!route || route.lenght < currentRoute.lenght) route = currentRoute;
    }
    if (!route) {
      throw RouteService.noPathFoundError;
    }

    return route;
  }

  async calculateToCategory(node: number, category: number): Promise<Route> {
    const spots: Spot[] = (await this.categoriesService.findOne(category))
      .spots;
    let route: Route;

    for (const currentSpot of spots) {
      let currentRoute = await this.calculateToSpot(node, currentSpot.id);
      if (!route || route.lenght < currentRoute.lenght) route = currentRoute;
    }
    if (!route) {
      throw RouteService.noPathFoundError;
    }

    return route;
  }
}
