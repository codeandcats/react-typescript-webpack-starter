/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import { Tree, ITreeNode } from './Tree';

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

interface IMainState {
    nodes: ITreeNode[];
}

export class Main extends React.Component<any, IMainState> {
    public state: IMainState = { nodes: [] };
    
    update() {
        console.time('Main.Update');
        this.setState({
            nodes: generateNodes('', 6, 5) 
        });
        console.timeEnd('Main.Update');
    }
    
    render() {
        return (
            <div>
                Click button to Update: 
                <button onClick={this.update.bind(this)}>Update</button>
                <Tree nodes={this.state.nodes} />
            </div>
        );
    }
}