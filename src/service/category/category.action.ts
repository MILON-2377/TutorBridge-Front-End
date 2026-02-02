import { CategoryService } from "./category.service";

/**
 * Category Action
 */
export const getCategoriesAction = async () => {
  return await CategoryService.getCategories();
};
