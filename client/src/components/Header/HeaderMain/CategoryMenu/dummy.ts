export const categories = [
  {
    id: 1,
    name: '문구',
    parentCategory: null,
    childCategories: [
      {
        id: 2,
        name: '책',
        parentCategory: {
          id: 1,
          name: '문구',
        },
      },
      {
        id: 3,
        name: '지우개',
        parentCategory: {
          id: 1,
          name: '문구',
        },
      },
    ],
  },
  {
    id: 4,
    name: '리빙',
    parentCategory: null,
    childCategories: [
      {
        id: 5,
        name: '가구',
        parentCategory: {
          id: 4,
          name: '리빙',
        },
      },
    ],
  },
];
