module.exports = {
    Config: {
        PS0_TYPE_DETECT: {
            id: "PS0_TYPE_DETECT",
            min: 0,
            max: 2
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
        H_PTAN_M:{
            id: "H_PTAN_M"
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
        },
        EPRN1:{
            id: {
                "U1824": "EPRN1",
                "P1795": "EPRN1",
                "P1813": "EPRN1",
                "P1888": "EPRN1_comp",
                "V0059": "EPRN1_S",
                "V0001": "EPRN1_S",
                "N6464": "EPRN1_S",
                "F6101": "EPRN1_computed",
                "M6673": "EPRN1_S",
                "M6839": "EPRN1_S"
            }
        },
        EPRN2: {
            id: {
                "U1824": "EPRN2",
                "P1795": "EPRN2",
                "P1813": "EPRN2",
                "P1888": "EPRN2_comp",
                "V0059": "EPRN2_S",
                "V0001": "EPRN2_s",
                "N6464": "EPRN2_S",
                "F6101": "EPRN2_ computed",
                "M6673": "EPRN2_S",
                "M6839": "EPRN2_S"
            }
        },
        VE: {
            id: {
                "U1824": "VE_ANCG_M",
                "P1795": "VE_ANCG_M",
                "P1888": "VE_ANCG_M",
                "P1813": "VE_ANCG_M",
                "V0059": "VE_CGM_M",
                "V0001": "VE_CGM_M",
                "N6464": "VE_CG25_M",
                "F6101": "VE_CG25_M",
                "M6673": "VE_CG25_M",
                "M6839": "VE_CG25_M"
            }
        },
        VN: {
            id:{
                "U1824": "VN_ANCG_M",
                "P1795": "VN_ANCG_M",
                "P1888": "VN_ANCG_M",
                "P1813": "VN_ANCG_M",
                "V0059": "VN_CGM_M",
                "V0001": "VN_CGM_M",
                "N6464": "VN_CG25_M",
                "F6101": "VN_CG25_M",
                "M6673": "VN_CG25_M",
                "M6839": "VN_CG25_M"
            }
        },
        TS: {
            id: {
                "P1795": "341121301-",
                "P1813": "341121301-",
                "P1888": "341121301-",
                "N6464": "341121301-",
                "M6673": "341121301-",
                "M6389": "341121301-",
                "F6101": "341121301-",
                "U1824": "341121301-",
                "V0059": "34110015A-",
                "V0001": "34110015A-"
            }
        },
        PS: {
            id: {
                "P1795": "341124601-",
                "P1813": "341124601-",
                "P1888": "341124601-",
                "N6464": "341124601-",
                "M6673": "341124601-",
                "M6839": "341124601-",
                "F6101": "341124601-",
                "U1824": "341124601-",
                "V0001": "34110006A-",
                "V0059": "34110006A-"
            }
        },
        PSREF:{
            id: ["ZG0", "PSREF0","RHO_0"],
            formula: {
                expr: 'return d["ZG0"] < 9998 ? (d["PSREF0"] + (((d["RHO_0"]+1.225)/2)*9.80665*d["ZG0"])/100) : 1013.25',

            }
        },
        EPRN_MEAN: {
            id: ["EPRN1", "EPRN2"],
            formula: {
                expr: 'return ((d["EPRN1"]+d["EPRN2"])/2)',

            }
        },
        SPEED_NORM:{
            id: ["VE", "VN"],
            formula: {
                expr: 'return Math.sqrt(d["VE"]**2+d["VN"]**2)',
            }
        }
    }
}