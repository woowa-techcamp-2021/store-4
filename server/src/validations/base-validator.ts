import { validate } from 'class-validator';
import InvalidInputException from '../exceptions/invalid-input-exception';

class BaseValidator {
  async validate(): Promise<boolean> {
    const errors = await validate(this);
    if (errors.length === 0) {
      return true;
    }

    const message = errors.map((error) => error.toString()).join('\n');

    throw new InvalidInputException(message);
  }
}

export default BaseValidator;
