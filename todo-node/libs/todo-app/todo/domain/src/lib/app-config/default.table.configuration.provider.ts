//Angular imports
import { ValueProvider } from '@angular/core';

//libs imports
import { DEFAULT_TABLE_CONFIG } from '@todo-node/todo-app/todo/domain';


export const getDefaultTableConfiguration = (): ValueProvider => ({
    provide: DEFAULT_TABLE_CONFIG,
    useValue: {
        lazy: true,
        paginator: true,
        rows: 10,
        selectionMode: 'single',
        dataKey: 'id',
    }
});
