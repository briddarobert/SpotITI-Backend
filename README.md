# SpotITI-Backend

## Funzionamento

### Utilizzo base

1. Creazione di più nodi
2. Utilizzo dell'endpoint `/routes/{nodeA}/{nodeB}` per ottenere un percorso

### Utilizzo avanzato

1. Creazione di più nodi
2. Collegamento dei nodi
3. Creazione di più categorie
4. Creazione di più spot
5. Utilizzo dell'endpoint `/routes/{node}/spot/{spot}` per ottenere un percorso
6. Utilizzo dell'endpoint `/routes/{node}/category/{category}` per ottenere un percorso

## Particolarità

I seguenti punti informano chi utilizza l'API di alcuni funzionamenti che potrebbero sembrare strani o controintuitivi

Il funzionamento di alcuni metodi HTTP potrebbe non essere quello che ci si aspetta:

- Nonostante il metodo POST serva, in teoria, solo per creare una nuova risorsa, in pratica se usato riferendosi ad un entità già esistente essa verrà aggiornata
- Nonostante il metodo PATCH serva, in teoria, solo per aggiornare una nuova risorsa, in pratica se usato riferendosi ad un entità già esistente non ancora esistente essa verrà creata

Il sistema funziona in questo modo per evitare di aggiungere complessità non necessarie e seguire il funzionamento del database sottostante, si consiglia comunque di usare i metodi in modo idiomatico
