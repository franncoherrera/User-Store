import { CategoryModel, ProductModel } from "../../data";
import {
  CreateCategoryDto,
  CreateProductDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExists) throw CustomError.badRequest("Product already exist");
    try {
      const product = new ProductModel(createProductDto);
      await product.save();
      return product;
    } catch (error) {
      throw CustomError.internalServer(`Internal server error`);
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user", "name email")
          .populate("category"),
      ]);
      const totalPages = Math.ceil(total / limit);

      return {
        page: page,
        limit: limit,
        total: total,
        next:
          page < totalPages
            ? `/api/products?pages=${page + 1}&limit=${limit}`
            : null,
        prev:
          page - 1 > 0
            ? `/api/products?pages=${page - 1}&limit=${limit}`
            : null,
        products: products,
      };
    } catch (error) {
      throw CustomError.internalServer(`Internal server error`);
    }
  }
}
