import { useHistory } from '../lib/router';
import optionStore from '../stores/optionStore';
import { ProductListOrder } from '../types/product';

type UseOption = {
  changeCategory: (categoryId: number) => void;
  changeSortOption: (sortOption: ProductListOrder) => void;
  changePageNum: (pageNum: number) => void;
  changeSearchTerm: (searchTerm: string) => void;
};

const useOption = (): UseOption => {
  const history = useHistory();

  const handleChange = () => {
    history.push(`/products${optionStore.optionQuery}`);
  };

  const handleChangeCategory = (categoryId: number) => {
    optionStore.changeCategory(categoryId);
    handleChange();
  };

  const handleChangeSortOption = (sortOption: ProductListOrder) => {
    optionStore.changeSortOption(sortOption);
    handleChange();
  };

  const handleChangePageNum = (pageNum: number) => {
    optionStore.changePageNum(pageNum);
    handleChange();
  };

  const handleChangeSearchTerm = (searchTerm: string) => {
    optionStore.changeSearchTerm(searchTerm);
    handleChange();
  };

  return {
    changeCategory: handleChangeCategory,
    changeSortOption: handleChangeSortOption,
    changePageNum: handleChangePageNum,
    changeSearchTerm: handleChangeSearchTerm,
  };
};

export default useOption;
