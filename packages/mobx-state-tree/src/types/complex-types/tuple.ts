import {
    SnapshotIn,
    SnapshotOut,
    Instance,
    IAnyType,
    ComplexType,
    ExtractC,
    ExtractS
} from "../../core/type/type"
import { IStateTreeNode } from "../../core/node/node-utils"
import { IArrayType } from "./array"
import { ArrayType } from "typedoc/dist/lib/models"

type UnboxSnapshotIn<T> = { [P in keyof T]: SnapshotIn<T[P]> }
type UnboxSnapshotOut<T> = { [P in keyof T]: SnapshotOut<T[P]> }
type UnboxInstance<T> = { [P in keyof T]: Instance<T[P]> }

/** @hidden */
type MSTTuple<IT extends any[]> = UnboxInstance<IT> &
    IStateTreeNode<UnboxSnapshotIn<IT>> &
    UnboxSnapshotOut<IT> & {
        // Methods exclusive to ObservableArray
    }

export interface ITupleType<IT extends IAnyType> extends IArrayType<IT> {}

export class TupleType<IT extends IAnyType[]> extends ComplexType<
    ExtractC<IT>[] | undefined,
    ExtractS<IT>[],
    MSTTuple<IT>
> {
    constructor(name: string, private readonly _subType: IT) {
        super(name)
    }
}
