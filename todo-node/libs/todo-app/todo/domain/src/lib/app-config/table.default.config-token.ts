//Angular imports
import { InjectionToken } from '@angular/core';

//local imports
import { TableConfig } from '../interfaces/table.config';


export const DEFAULT_TABLE_CONFIG = new InjectionToken<TableConfig>('default-table-config');