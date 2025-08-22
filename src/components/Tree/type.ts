export interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  defaultExpandAll?: boolean;
  selectable?: boolean;
}
