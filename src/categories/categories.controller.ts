import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { manageException } from 'src/errors';

@Controller('categories')
@ApiTags('Categorie')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  public static notFoundErrorDescription =
    'La categoria richiesta non è stata trovata';

  /**
   * Crea una nuova categoria
   * @param createCategoryDto I dati della nuova categoria
   * @returns L'ID della categoria appena creata
   */
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<number> {
    return await this.categoriesService.create(createCategoryDto);
  }

  /**
   * Reperisce tutte le categorie
   * @returns Tutte le categorie
   */
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  /**
   * Reperisce una categoria specifica
   * @param id L'ID della categoria da reperire
   * @returns La categoria reperita
   */
  @ApiNotFoundResponse({
    description: CategoriesController.notFoundErrorDescription,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    try {
      return await this.categoriesService.findOne(+id);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Aggiorna una categoria specifica
   * @param id L'ID della categoria da aggiornare
   * @param updateCategoryDto I dati da aggiornare della categoria
   * @returns La categoria modificata
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      return await this.categoriesService.update(+id, updateCategoryDto);
    } catch (e) {
      manageException(e);
    }
  }

  /**
   * Rimuove una categoria specifica
   * @param id L'ID della categoria da rimuovere
   * @returns Nulla
   */
  @ApiNotFoundResponse({
    description: CategoriesController.notFoundErrorDescription,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.categoriesService.remove(+id);
    } catch (e) {
      manageException(e);
    }
  }
}
