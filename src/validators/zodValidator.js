import { StatusCodes } from 'http-status-codes';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log('Validation error from zod validator', error.errors);

      let message = [];
      let explanation = '';

      error.errors.forEach((key) => {
        message.push(key.path[0] + ' ' + key.message);
        explanation += ' : ' + key.path[0] + ' ' + key.message;
      });

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: message,
        explanation: explanation
      });
    }
  };
};
