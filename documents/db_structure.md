# Bucket details
## global_static  -- all app level config

### appointment : 
{
  "name": "Appointment",
  "app": "registration",
  "type": "menu",
  "icon": "fa fa-desktop",
  "display_order": 3,
  "state": "menu.appointment.history",
  "active": true,
  "user_type": [
    "admin",
    "vet"
  ],
  "user_role": [
    "admin",
    "user",
    "staff"
  ],
  "submenus": [
    {
      "name": "History",
      "state": "menu.appointment.history",
      "user_role": [
        "admin",
        "user",
        "staff"
      ]
    },
    {
      "name": "Register",
      "state": "menu.appointment.register",
      "user_role": [
        "admin",
        "user",
        "staff"
      ]
    }
  ]
}

### calendar :
{
  "name": "Calendar",
  "app": "registration",
  "type": "menu",
  "state": "menu.calendar",
  "icon": "fa fa-calendar",
  "display_order": 4,
  "active": true,
  "user_type": [
    "admin",
    "vet"
  ],
  "user_role": [
    "admin",
    "user",
    "staff"
  ],
  "label": "Coming Soon"
}

### description :
{
  "description": "This bucket contains all the static information that the app needs",
  "types_available": [
    {
      "menu": "All the menus available, permission based on the user_type and user_role"
    }
  ]
}

### home :
{
  "name": "Home",
  "app": "registration",
  "type": "menu",
  "state": "menu.home",
  "icon": "fa fa-home",
  "display_order": 1,
  "active": true,
  "user_type": [
    "admin",
    "vet"
  ],
  "user_role": [
    "admin",
    "user",
    "staff"
  ]
}

### profile : 
{
  "name": "Profile",
  "app": "registration",
  "type": "menu",
  "state": "menu.profile_management.step1",
  "icon": "fa fa-user",
  "display_order": 2,
  "active": true,
  "user_type": [
    "admin",
    "vet"
  ],
  "user_role": [
    "admin",
    "user",
    "staff"
  ]
}


