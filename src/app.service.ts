import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return 'Benvenuto, puoi trovare la documentazione su «/docs»';
  }
}
