module.exports.permits = {
    in_out: [
        {
            resources: "/contents",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        { 
            resources: "/hours",
            methods: ['GET']
        },

        {
            resources: "/workers",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },

        {
            resources: "/login",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/calendars",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },

        {
            resources: "/histories",
            methods: ['POST', 'GET', 'PUT']
        },

        {
            resources: "/reports",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
        

    ],
    mana_construction: [
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/calendars",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },

        {
            resources: "/reports",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET', 'PUT', 'POST', 'DELETE']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    sort_user: [
        {
            resources: "/constructions",
            methods: ['GET', 'PUT']
        },
        {
            resources: "/calendars",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },

        {
            resources: "/reports",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    mana_user: [
        {
            resources: "/users",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/areas",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/positions",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/roles",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        
        {
            resources: "/calendars",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/reports",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    setting_time: [
        {
            resources: "/setting",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        }
    ],
    history: [
        {
            resources: "/histories",
            methods: ['GET']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    mana_money: [
        {
            resources: "/labors",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    mana_timekeeping: [
        {
            resources: "/hours",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/myhour",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/timekeepings",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    mana_holiday: [
        {
            resources: "/dayoffs",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    allow_level_1: [
        {
            resources: "/workers",
            methods: ['POST', 'GET']
        },
        {
            resources: "/dayoffs",
            methods: ['POST']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/login",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/calendars",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },

        {
            resources: "/histories",
            methods: ['POST', 'GET', 'PUT']
        },
        {
            resources: "/reports",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET', 'PUT']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },

    ],
    allow_level_2: [
        {
            resources: "/workers",
            methods: ['POST', 'GET']
        },
        {
            resources: "/dayoffs",
            methods: ['POST']
        },
        {
            resources: "/users",
            methods: ['GET', 'PUT']
        },
        {
            resources: "/requests",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/login",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/calendars",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },

        {
            resources: "/histories",
            methods: ['POST', 'GET', 'PUT']
        },
        {
            resources: "/reports",
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        },
        {
            resources: "/permissions",
            methods: ['GET']
        },
        {
            resources: "/constructions",
            methods: ['GET', 'PUT']
        },
        {
            resources: "/users",
            methods: ['GET']
        },
        {
            resources: "/areas",
            methods: ['GET']
        },
        {
            resources: "/positions",
            methods: ['GET']
        },
        {
            resources: "/roles",
            methods: ['GET']
        },
    ],
    profit: [
        {
            resources: "/constructions",
            methods: ['POST', 'GET', 'PUT']
        }
    ],
}

