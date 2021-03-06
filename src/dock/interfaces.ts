import Dock from './Dock'
import InDataDock from './InDataDock'
import InExeDock from './InExeDock'
import OutDataDock from './OutDataDock'
import OutExeDock from './OutExeDock'

export type Docks = Array<Dock>

export enum FlowType { DATA = 'data', EXE = 'exe' }

export enum DataType { INT, STR, LIST, DICT, TENSOR, MODULE }

export enum DockSide { LEFT = 'left', RIGHT = 'right' }

export interface DockDef {
    label: string
    optional?: boolean
    type?: InputType

}

export interface DockParams {
    label: string
    location: string
    type?: InputType
}

// export type DataDock = InDataDock | OutDataDock
// export type ExeDock = InExeDock | OutExeDock

export type InDock = InDataDock | InExeDock
export type OutDock = OutDataDock | OutExeDock

export function create<D extends Dock>(cstr: DockCstr<D>, defs: DockParams[]): Array<D> {
    return defs.map(d => new cstr(d))
}

export type DockCstr<D> = new (d: DockParams) => D

export enum InputType {
    INT = 'int',
    STR = 'str',
    LIST = 'list',
    DICT = 'dict',
    TENSOR = 'tensor',
    MODULE = 'module',
}