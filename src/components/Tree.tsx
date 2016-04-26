import * as React from 'react';

//var nodes = generateNodes('', 6, 5);
var nodes = generateNodes('', 6, 5);

interface ITreeNode {
    key: string;
    label: string;
    children: ITreeNode[];
}

function generateNodes(path: string, count: number, depth: number): ITreeNode[] {
    var nodes: ITreeNode[] = [];
    
    if (depth > 0) {
        for (var index = 0; index < count; index++) {
            var label = String.fromCharCode(65 + index);
            var nodePath = path == '' ? label : path + '-' + label;
            
            nodes.push({
                key: '' + index,
                label: nodePath,
                children: generateNodes(nodePath, count, depth - 1)
            });
        }
    }
    
    return nodes;
}

export class Tree extends React.Component<any, {}> {
    render() {
        console.time('Tree.render');
        var result = nodes.length ? 
            <ul>
                {nodes.map((n, i) => <TreeNode key={i} node={n}></TreeNode>)}
            </ul>
            : null;
        console.timeEnd();
        return result;
    }
}

interface ITreeNodeProps {
    node: ITreeNode;
}

export class TreeNode extends React.Component<ITreeNodeProps, {}> {
    render(): JSX.Element {
        return (
            <li>
                {this.props.node.label}
                {this.props.node.children.length ? 
                <ul>
                    {this.props.node.children.map((n, i) => <TreeNode key={i} node={n}></TreeNode>)}
                </ul>
                : null}
            </li>
        );
    }
}