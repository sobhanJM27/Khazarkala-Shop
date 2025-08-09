import { Server } from './src/server';
import * as dot from 'dotenv';

dot.config();
new Server(3000);
