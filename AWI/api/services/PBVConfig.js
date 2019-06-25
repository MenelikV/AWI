module.exports ={
    DATA: {
        FLEX:{
            id: "FLEX_MODE1",
            time: {
                minutes: +1
            },
            type: "float",
            refs: {
                "LDG": ["VC_att"],
                "TO": ["VC_dec"],
                "RTO": ["VC_dec"]
            },
        },
        RUNWAY: {
            id: "RUNWAY_NAME",
            time: {
                minutes: +1
            },
            type: "string",
            refs: {
                "LDG": ["VC_att"],
                "TO": ["VC_dec"],
                "RTO": ["VC_dec"]
            }
        },
        SLAT: {
            id: {
                '6464': "22E11270G-",
                '6101': '22E11270G-',
                '6673': '22E11270G-',
                '6839': '22E11270G-',
                '1795': '277112401-',
                '1813': '277112401-',
                '1888': '277112401-',
                '1824': '27P112401C',
                '0001': '27710118T4',
                '0059': '27710118T4'
            },
            time: {
                minutes: +1
            },
            type: "float",
            refs: {
                "LDG": ["VC_att"],
                "TO": ["VC_dec"],
                "RTO": ["VC_dec"]
            },
            format: "0.00"
        },
        FLAP: {
            id: {
                '6464': '22E11370G-',
                '6101': '22E11370G-',
                '6673': '22E11370G-',
                '6839': '22E11370G-',
                '1795': '277113402-',
                '1813': '277113402-',
                '1888': '277113402-',
                '1824': '27P113401C',
            },
            time: {
                minutes: +1
            },
            type: "float",
            refs: {
                "LDG": ["VC_att"],
                "TO": ["VC_dec"],
                "RTO": ["VC_dec"]
            },
            format: "0.00"
        },
        FLAPI: {
            id: {
                "0001": "27U-M189--",
                "0059": "27U-M189--"
            },
            time: {
                minutes: +1
            },
            type: "float",
            refs: {
                "LDG": ["VC_att"],
                "TO": ["VC_dec"],
                "RTO": ["VC_dec"]
            },
            format: "0.00"
        },
        FLAPOR: {
            id: {
                "0001": "27U-M193--",
                "0059": "27U-M193--"
            },
            time: {
                minutes: +1
            },
            type: "float",
            refs: {
                "LDG": ["VC_att"],
                "TO": ["VC_dec"],
                "RTO": ["VC_dec"]
            }
        },
        FLAPOL: {
            id: {
                "0001": "27U-M195--",
                "0059": "27U-M195--"
            },
            time: {
                minutes: +1
            },
            type: "float",
            refs: {
                "LDG": ["VC_att"],
                "TO": ["VC_dec"],
                "RTO": ["VC_dec"]
            },
            format: "0.00"
        }
    }
}