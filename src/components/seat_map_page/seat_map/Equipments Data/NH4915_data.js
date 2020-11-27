export default
    {
       
        flightInfo:{
            model: "DHC8-Q400/74",
            listCount: 6,
            flightNumber: "NH4915",
            flightDate: "08OCT20",
        },
        seatAttributes: {
            economy: {
                seats: {
                    front: { window:{ count: 12, total: 12 }, aisle: { count: 27, total: 28 }, others:{ count: 28, total: 28 }},
                    middle: { window:{ count: 23, total: 23 }, aisle: { count: 57, total: 57 }, others:{ count: 56, total: 56 }},
                    back:{ window:{ count: 5, total: 5 }, aisle: { count: 13, total:13 }, others:{ count: 13, total: 13 }},
                },
                blocks: {
                   gtBlk: {  count: 101, total: 101 },
                   nopBlk: { count: 28, total: 28 },
                   ckiBlK: { count: 0, total: 0 },
                   wbBlk: { count: 0, total: 0 },
                }
            },
            premium: {
                seats: {
                    front: { window:{ count: 6, total: 6 }, aisle: { count: 6, total: 6 }, others:{ count: 0, total: 0 }},
                    middle: '',
                    back:{ window:{ count: 16, total: 16 }, aisle: { count: 16, total:16 }, others:{ count: 0, total: 0 }},
                },
                blocks: {
                   gtBlk: '',
                   nopBlk: { count: 30, total: 30 },
                   ckiBlK: '',
                   wbBlk: '',
                }
            },

        }


    }
    ; 