import {Container} from 'inversify';
import {HackerNewsService} from './HackerNewsService';
import {IHackerNewsService} from './interfaces';

export const container = new Container();
// 注册服务
container.bind<IHackerNewsService>('IHackerNewsService').to(HackerNewsService);
