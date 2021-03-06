declare namespace jsmodels {


    interface IGraphData extends dbmodels.IGraph {
        macroList: any[]
        macros: {[s: string]: any}
        removeComponent(component: any)
    }

    interface IComponent extends dbmodels.IComponent {
        title: string
        position: IPoint
        exec: string
    }
}