import BusinessException from './business.exception';

class InvaildPageException extends BusinessException {
  constructor() {
    const message = '요청한 페이지가 총 페이지 수를 초과했습니다';
    const status = 400;

    super(message, status);
  }
}

export default InvaildPageException;
