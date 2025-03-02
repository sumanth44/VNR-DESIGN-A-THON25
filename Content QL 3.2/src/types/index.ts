export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdThemes: Theme[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  components: Component[];
  createdBy: string;
  published: boolean;
  downloads: number;
  revenue: number;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface Component {
  id: string;
  type: string;
  content: any;
  style: any;
}

export interface DraggableComponent extends Component {
  position: { x: number; y: number };
}