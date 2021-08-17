import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repositories/category-repository';

type CategoryData = {
  id: number;
  name: string;
  parentCategory: number | null;
};

export const insertDummyCategoryData = async (): Promise<void> => {
  const categoryRepository = getCustomRepository(CategoryRepository);

  const rootCategories = data.filter(({ parentCategory }) => parentCategory === null);
  await Promise.all(
    rootCategories.map((category) => {
      const Category = categoryRepository.create({
        id: category.id,
        name: category.name,
        parentCategory: null,
      });

      return categoryRepository.save(Category);
    })
  );

  const childCategories = data.filter(({ parentCategory }) => parentCategory !== null);
  const parentCategories = await Promise.all(
    childCategories.map(({ parentCategory }) =>
      categoryRepository.findOne(parentCategory as number)
    )
  );

  await Promise.all(
    childCategories.map((category, index) => {
      const Category = categoryRepository.create({
        id: category.id,
        name: category.name,
        parentCategory: parentCategories[index],
      });

      return categoryRepository.save(Category);
    })
  );
};

const data: CategoryData[] = [
  {
    id: 8,
    name: '문구',
    parentCategory: null,
  },
  {
    id: 9,
    name: '리빙',
    parentCategory: null,
  },
  {
    id: 11,
    name: 'ㅋㅋ에디션',
    parentCategory: 9,
  },
  {
    id: 14,
    name: '책',
    parentCategory: 8,
  },
  {
    id: 19,
    name: '배민그린',
    parentCategory: 8,
  },
];
