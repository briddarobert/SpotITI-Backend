// Questo file contiene funzioni e variabili relativi alla gestione delle eccezioni

import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

/**
 * «Converte» le eccezioni generate durante l'accesso al database a eccezioni `HttpException` gestite da NestJS
 *
 * `e` è di tipo any perché, almeno per ora, TypeScript non permette la tipizzazione delle eccezioni
 * @param e Eccezione
 */
export function manageException(e: any): void {
  if (e instanceof EntityNotFoundError) {
    throw notFoundException;
  }
  if (e instanceof QueryFailedError) {
    if (e.driverError.errno == 1062) {
      throw duplicateEntryException;
    }
    if (e.driverError.errno == 1451) {
      throw foreignKeyConstraintFailOnUpdate;
    }
    if (e.driverError.errno == 1452) {
      throw foreignKeyConstraintFailOnCreate;
    }
  }

  throw e;
}

export const notFoundException = new HttpException(
  "L'entità richiesta non è stata trovata",
  HttpStatus.NOT_FOUND,
);

export const duplicateEntryException = new HttpException(
  "Non è possibile creare questa entità in quanto la sua chiave primaria entra in conflitto con quella di un'altra entità",
  HttpStatus.CONFLICT,
);

export const foreignKeyConstraintFailOnCreate = new HttpException(
  'Non è possibile creare questa entità in quanto fa riferimento ad una chiave esterna per cui non si sono verificati tutti i requisiti necessari. Controllare che tutte le entità a qui si fa riferimento esistano',
  HttpStatus.BAD_REQUEST,
);

export const foreignKeyConstraintFailOnUpdate = new HttpException(
  'Non è possibile modificare questa entità in quanto fa riferimento ad una chiave esterna per cui non si sono verificati tutti i requisiti necessari. Controllare che tutte le entità a qui si fa riferimento non siano collegate ad altre',
  HttpStatus.CONFLICT,
);
