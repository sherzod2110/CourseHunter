import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Course Hunter project')
  .setVersion('1.0')
  .build();
