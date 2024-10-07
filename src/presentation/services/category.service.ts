import { CategoryModel } from "../../data";
import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExists) throw CustomError.badRequest("Category already exist");
    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await category.save();
      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`Internal server error`);
    }
  }

  async getCatgories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      const totalPages = Math.ceil(total / limit); 

      return {
        page: page,
        limit: limit,
        total: total,
        next:
          page < totalPages
            ? `/api/categories?pages=${page + 1}&limit=${limit}`
            : null,
        prev:
          page - 1 > 0
            ? `/api/categories?pages=${page - 1}&limit=${limit}`
            : null,
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer(`Internal server error`);
    }
  }
}
