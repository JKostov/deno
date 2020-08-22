import { Router } from '../deps.ts';

const books = new Map<string, any>();
books.set('1', {
    id: '1',
    title: 'Frankenstein',
    author: 'Mary Shelley',
});

const router = new Router();

router.get('/', (context) => {
    context.response.body = {test: 'asd'}
});

router.get('/book', (context) => {
    context.response.body = Array.from(books.values());
});

router.get('/book/:id', (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
        context.response.body = books.get(context.params.id);
    }
});

export default router;
