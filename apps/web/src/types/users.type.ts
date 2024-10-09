export type User = {
  id: string;
  email: string;
  username: string;
  currentAvatar: string;
  instrument: string | null;
  avatar: {
    imgUrl: string;
    name: string;
    createdAt: string;
  }[]
}