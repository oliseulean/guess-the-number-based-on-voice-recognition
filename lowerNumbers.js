const lowNumbersMap = new Map();

lowNumbersMap.set('unu', 1);
lowNumbersMap.set('doi', 2);
lowNumbersMap.set('trei', 3);
lowNumbersMap.set('patru', 4);
lowNumbersMap.set('cinci', 5);
lowNumbersMap.set('șase', 6);
lowNumbersMap.set('șapte', 7);
lowNumbersMap.set('opt', 8);
lowNumbersMap.set('nouă', 9);
lowNumbersMap.set('zece', 10);

export { lowNumbersMap };

/*  
    we need this because the recognition API for the Romanian language 
    isn't working all the time with these values
*/