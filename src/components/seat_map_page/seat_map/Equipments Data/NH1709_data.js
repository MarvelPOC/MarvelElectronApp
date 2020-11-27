export default
    {
       
        flightInfo:{
            model: "A320-200N/146",
            listCount: 74,
            flightNumber: "NH1709",
            flightDate: "09OCT20",
        },
        seatAttributes: {
            economy: {
                seats: {
                    front: { window:{ count: 8, total: 8 }, aisle: { count: 8, total: 10 }, others:{ count: 10, total: 10 }},
                    middle: { window:{ count: 8, total: 8 }, aisle: { count: 10, total: 10 }, others:{ count: 10, total: 10 }},
                    back:{ window:{ count: 0, total: 0 }, aisle: { count: 0, total:0 }, others:{ count: 0, total: 0 }},
                },
                blocks: {
                   gtBlk: {  count: 57, total: 57 },
                   nopBlk: { count: 25, total: 25 },
                   ckiBlK: { count: 0, total: 0 },
                   wbBlk: { count: 0, total: 0 },
                }
            },
            premium: {
                seats: {
                    front: { window:{ count: 4, total: 4 }, aisle: { count: 4, total: 4 }, others:{ count: 0, total: 0 }},
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