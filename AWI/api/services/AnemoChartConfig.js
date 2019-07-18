module.exports = {
    Config: {
        PS0_TYPE_DETECT: {
            id: "PS0_TYPE_DETECT",
            min: 0,
            max: 2
        },
        PSREF:{
            id: ["ZG0","PSREF0","RHO_0"],
            formula: {
                expr: 'return {x: d.x, y:d["ZG0"] < 9998 ? (d["PSREF0"] + (((d["RHO_0"]+1.225)/2)*9.80665*d["ZG0"])/100) : 1013.25}',
                x: "ZG0",
                y: "PSREF0",
                z: "RHO_0"
            }
        },
        TSREF0: {
            id: "TSREF0",
            min: 0,
            max: 400
        },
        ZG0: {
            id: "ZG0",
            min: 0,
            max: 400
        },
        PS0_DETECT: {
            id: "PS0_DETECT"
        },
        ZRA: {
            id: {
                "N6464": "ZRA1_S",
                "F6101": "ZRA1_S",
                "M6637": "ZRA1_S",
                "M6839": "ZRA1_S",
                "U1824": "ZRA1_S",
                "P1888": "ZRA1_S",
                "P1795": "ZRA1_S",
                "P1813": "ZRA1_S",
                "V0001": "346100011-",
                "V0059": "346100011-"
            }
        }
    }
}