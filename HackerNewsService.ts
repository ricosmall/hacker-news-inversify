import {injectable} from 'inversify';
import axios from 'axios';
import {IStory, IHackerNewsService} from './interfaces';

@injectable()
export class HackerNewsService implements IHackerNewsService {
  private readonly BASE_URL = 'https://hacker-news.firebaseio.com/v0';

  async getTopStories(): Promise<IStory[]> {
    const response = await axios.get<number[]>(
      `${this.BASE_URL}/topstories.json`,
    );
    const storyIds = response.data.slice(0, 20);
    const stories = await Promise.all(
      storyIds.map(id => this.getStoryById(id)),
    );
    return stories.filter(s => s !== null) as IStory[];
  }

  private async getStoryById(id: number): Promise<IStory | null> {
    const response = await axios.get<{title: string; url: string}>(
      `${this.BASE_URL}/item/${id}.json`,
    );
    const {title, url} = response.data;
    if (!title || !url) {
      return null;
    }
    return {id, title, url};
  }
}
