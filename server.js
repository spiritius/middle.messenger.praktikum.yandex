import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static('./dist'));
app.get('*', (_req, res) => {
  res.sendFile(path.join(dirname, 'dist/index.html'));
});
server.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`App listening on port ${PORT}!`);
});
