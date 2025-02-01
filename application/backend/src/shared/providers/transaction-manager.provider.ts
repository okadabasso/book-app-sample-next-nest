import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class TransactionManagerProvider {
    private _manager: EntityManager;

    set manager(manager: EntityManager) {
        this._manager = manager;
    }

    get manager(): EntityManager {
        return this._manager;
    }
}