export default
    {
       
        flightInfo:{
            model: "B777-300/514",
            listCount: 74,
            flightNumber: "NH51",
            flightDate: "09OCT20",
        },
        seatAttributes: {
            economy: {
                seats: {
                    front: { window:{ count: 22, total: 23 }, aisle: { count: 52, total: 52 }, others:{ count: 52, total: 52 }},
                    middle: { window:{ count: 36, total: 36 }, aisle: { count: 78, total: 78 }, others:{ count: 78, total: 78 }},
                    back:{ window:{ count: 6, total: 6 }, aisle: { count: 17, total:19 }, others:{ count: 17, total: 19 }},
                },
                blocks: {
                   gtBlk: {  count: 100, total: 100 },
                   nopBlk: { count: 30, total: 30 },
                   ckiBlK: { count: 0, total: 0 },
                   wbBlk: { count: 0, total: 0 },
                }
            },
            premium: {
                seats: {
                    front: { window:{ count: 6, total: 6 }, aisle: { count: 12, total: 12 }, others:{ count: 3, total: 3 }},
                    middle: '',
                    back: '',
                },
                blocks: {
                   gtBlk: '',
                   nopBlk: '',
                   ckiBlK: '',
                   wbBlk: '',
                }
            },

        }


    }
    ; 