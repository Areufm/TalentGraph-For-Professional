export interface GraphSourceNode {
  m: {
    title: string;
  };
  n: {
    id: string;
    title: string;
  };
  "type(r)": string;
}

export interface GraphNode {
  id: string;
  text: string;
  data: {
    isGoodMan: boolean;
    typeCount: string[];
  };
  color?: string;
  borderColor?: string;
  type?: string;
}

export interface GraphLine {
  from: string;
  to: string;
  text: string;
  color?: string;
  fontColor?: string;
  data: {
    type: string;
  };
}
