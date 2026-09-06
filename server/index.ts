import express from 'express';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { SHOES } from '../src/data/shoes';
import { Shoe } from '../src/types';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(serverDirectory, 'data');
const shoesFile = path.join(dataDirectory, 'shoes.json');
const adminTokens = new Set<string>();

app.use(express.json({ limit: '1mb' }));

app.get('/', (_request, response) => {
  response.json({
    name: 'Sunitha ShoeMart API',
    status: 'ok',
    endpoints: {
      health: '/api/health',
      shoes: '/api/shoes',
    },
  });
});

async function readShoes(): Promise<Shoe[]> {
  try {
    return JSON.parse(await fs.readFile(shoesFile, 'utf8')) as Shoe[];
  } catch {
    await fs.mkdir(dataDirectory, { recursive: true });
    await fs.writeFile(shoesFile, JSON.stringify(SHOES, null, 2));
    return SHOES;
  }
}

async function writeShoes(shoes: Shoe[]) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(shoesFile, JSON.stringify(shoes, null, 2));
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/auth/login', (request, response) => {
  const { email, password } = request.body as { email?: string; password?: string };
  const accounts = [
    { email: 'admin@sunitha.com', password: 'admin123', name: 'Sunitha Admin', role: 'admin' as const },
    { email: 'user@sunitha.com', password: 'user123', name: 'ShoeMart Customer', role: 'user' as const },
  ];
  const account = accounts.find((item) => item.email === email && item.password === password);

  if (!account) {
    response.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = randomUUID();
  if (account.role === 'admin') {
    adminTokens.add(token);
  }
  response.json({ user: { name: account.name, email: account.email, role: account.role, token } });
});

function requireAdmin(request: express.Request, response: express.Response, next: express.NextFunction) {
  const authorization = request.header('authorization');
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token || !adminTokens.has(token)) {
    response.status(403).json({ error: 'Admin login required' });
    return;
  }
  next();
}

app.get('/api/shoes', async (_request, response) => {
  response.json(await readShoes());
});

app.post('/api/shoes', requireAdmin, async (request, response) => {
  const shoe = request.body as Shoe;
  if (!shoe?.id || !shoe?.name || !shoe?.price || !shoe?.image) {
    response.status(400).json({ error: 'id, name, price, and image are required' });
    return;
  }

  const shoes = await readShoes();
  if (shoes.some((item) => item.id === shoe.id)) {
    response.status(409).json({ error: 'A shoe with this id already exists' });
    return;
  }

  shoes.push(shoe);
  await writeShoes(shoes);
  response.status(201).json(shoe);
});

app.put('/api/shoes/:id', requireAdmin, async (request, response) => {
  const shoes = await readShoes();
  const shoeIndex = shoes.findIndex((shoe) => shoe.id === request.params.id);
  if (shoeIndex === -1) {
    response.status(404).json({ error: 'Shoe not found' });
    return;
  }

  const updatedShoe = { ...shoes[shoeIndex], ...request.body, id: request.params.id } as Shoe;
  shoes[shoeIndex] = updatedShoe;
  await writeShoes(shoes);
  response.json(updatedShoe);
});

app.delete('/api/shoes/:id', requireAdmin, async (request, response) => {
  const shoes = await readShoes();
  const remainingShoes = shoes.filter((shoe) => shoe.id !== request.params.id);
  if (remainingShoes.length === shoes.length) {
    response.status(404).json({ error: 'Shoe not found' });
    return;
  }

  await writeShoes(remainingShoes);
  response.status(204).send();
});

app.listen(port, () => {
  console.log(`ShoeMart API running at http://localhost:${port}`);
});
