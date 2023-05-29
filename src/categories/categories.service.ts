import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return (await this.categoriesRepository.save(createCategoryDto)).id;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      relations: { spots: true },
    });
  }

  async findOne(id: number): Promise<Category> {
    let category: Category;
    const categories: Category[] = await this.categoriesRepository.find({
      relations: {
        spots: true,
      },
    });

    for (const s of categories) {
      if (s.id == id) {
        category = s;
        break;
      }
    }
    if (!category) throw new EntityNotFoundError(Category, undefined);
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoriesRepository.update({ id }, updateCategoryDto); // N.B.: Non viene eseguito alcun controllo per verificare l'esistenza dell'entità da aggiornare
    return this.categoriesRepository.findOneByOrFail({
      id,
    });
  }

  async remove(id: number): Promise<void> {
    this.categoriesRepository.remove(
      await this.categoriesRepository.findOneByOrFail({ id }),
    );
  }
}
