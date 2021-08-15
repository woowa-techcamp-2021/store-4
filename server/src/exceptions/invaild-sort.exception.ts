import BusinessException from './business.exception';

class InvalidSortException extends BusinessException {
  constructor() {
    const message = '요청한 정렬 방식이 잘못되었습니다';
    const status = 400;

    super(message, status);
  }
}

export default InvalidSortException;
