export interface IStory {
  id: number;
  title: string;
  url: string;
}

export interface IHackerNewsService {
  getTopStories(): Promise<IStory[]>;
}
