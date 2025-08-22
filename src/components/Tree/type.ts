export interface TreeNodeType {
  id: string | number;
  label: string;
  children?: TreeNodeType[];
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNodeType[];
  defaultExpandAll?: boolean;
  selectable?: boolean;
}
