/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';

//var nodes = generateNodes('', 6, 5);
//var nodes = generateNodes('', 6, 5);

export interface ITreeNode {
    key: string;
    label: string;
    children: ITreeNode[];
}

interface ITreeProps {
    nodes: ITreeNode[];
}

export class Tree extends React.Component<ITreeProps, {}> {
    render() {
        console.time('Tree.render');
        var result = this.props.nodes.length ? 
            <ul>
                {this.props.nodes.map((n, i) => <TreeNode key={i} node={n}></TreeNode>)}
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