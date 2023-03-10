import { faker } from '@faker-js/faker';
import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    console.log("Mirage server initializing...");
    const server = createServer({
        
        serializers: {
            application: ActiveModelSerializer
        },
        models: {
            user: Model.extend<Partial<User>>({})
        },
        factories: {
            user: Factory.extend({
                name(i) {
                    return faker.name.fullName();
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10)
                },
            })
        },
        seeds(server) {
            server.createList('user', 200)
        },
        routes() {
            this.namespace = 'api';
            this.urlPrefix = 'https://dash-jordaniodev.vercel.app/';
            this.timing = 750;
            this.get('/users', function (schema, request) {
                const { page = 1, perPage: per_page = 10 } = request.queryParams;
                const total = schema.all('user').length;
                const pageStart = (Number(page) - 1) * Number(per_page)
                const pageEnd = pageStart + Number(per_page)

                const users =
                    this.serialize(schema.all('user')).users
                        .sort((userBefore, userCurrent) => userBefore.name.localeCompare(userCurrent.name))
                        .slice(pageStart, pageEnd)

                return new Response(200, {
                    'x-total-count': String(total)
                },
                    { users }
                )
            });
            this.post('/users');
            this.get('/users/:id');
            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}