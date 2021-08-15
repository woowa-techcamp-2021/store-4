import BusinessException from './business.exception';

class InvalidCategoryException extends BusinessException {
  constructor() {
    const message = '카테고리가 존재하지 않습니다';
    const status = 404;

    super(message, status);
  }
}

export default InvalidCategoryException;
