import BusinessException from './business.exception';

class PageOverflowException extends BusinessException {
  constructor() {
    const message = '요청한 페이지 형식이 잘못되었습니다';
    const status = 404;

    super(message, status);
  }
}

export default PageOverflowException;
