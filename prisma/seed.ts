import prisma from "../src/config/prisma";
import { pool } from "../src/config/prisma";
const CRUD_ACTIONS = ["create","read","update","delete"];
const RESOURCES = [
    "users",
    "roles",
    "permissions",
    "role_permissions",
    "bus_operators",
    "crews",
    "buses",
    "seat_configs",
    "locations",
    "routes",
    "route_stops",
    "trips",
    "trip_fares",
    "seat_inventory",
    "bookings",
    "booking_seats",
    "booking_passengers",
    "payment_modes",
    "payments",
    "refunds",
    "cancellation_policies",
    "tickets",
    "current_bus_locations",
    "reviews",
];
const ROLE_NAMES= ["admin", "passenger", "operator", "crew"] as const;

function crud(resource:string, actions=CRUD_ACTIONS){
    return actions.map(
        action => `${resource}:${action}`
    );
}


      
async function seedRolePermissions() {

    const roles = await prisma.roles.findMany();
    const permissions = await prisma.permissions.findMany();
  
    const roleMap = new Map(
      roles.map(role => [role.name, role.id])
    );
  
    const permissionMap = new Map(
      permissions.map(permission => [permission.name, permission.id])
    );
  
    const rolePermissions = [];
  //Admin Permission
    for (const permission of permissions) {
      rolePermissions.push({
        role_id: roleMap.get("admin")!,
        permission_id: permission.id,
      });
    }
  
    // Passenger permissions
    const passengerPermissions = [
      "users:read",
      "users:update",
      "locations:read",
      "routes:read",
      "route_stops:read",
      "trips:read",
      "trip_fares:read",
      "seat_inventory:read",
      "buses:read",
      "payment_modes:read",
      "cancellation_policies:read",
      "bookings:create",
      "bookings:read",
      "bookings:update",
      "booking_seats:create",
      "booking_seats:read",
      "booking_seats:update",
      "booking_passengers:create",
      "booking_passengers:read",
      "booking_passengers:update",
      "payments:create",
      "payments:read",
      "refunds:create",
      "refunds:read",
      "tickets:read",
      "reviews:create",
      "reviews:read",
      "reviews:update",
    ];
  
    for (const permission of passengerPermissions) {
      rolePermissions.push({
        role_id: roleMap.get("passenger")!,
        permission_id: permissionMap.get(permission)!,
      });
    }
  
    // Operator permissions
    const operatorPermissions = [
      "bus_operators:read",
      "bus_operators:update",
      "buses:create",
      "buses:read",
      "buses:update",
      "buses:delete",
      "seat_configs:create",
      "seat_configs:read",
      "seat_configs:update",
      "seat_configs:delete",
      "crews:create",
      "crews:read",
      "crews:update",
      "crews:delete",
      "trips:create",
      "trips:read",
      "trips:update",
      "trips:delete",
      "trip_fares:create",
      "trip_fares:read",
      "trip_fares:update",
      "trip_fares:delete",
      "seat_inventory:create",
      "seat_inventory:read",
      "seat_inventory:update",
      "seat_inventory:delete",
      "routes:create",
      "routes:read",
      "routes:update",
      "routes:delete",
      "route_stops:create",
      "route_stops:read",
      "route_stops:update",
      "route_stops:delete",
      "cancellation_policies:create",
      "cancellation_policies:read",
      "cancellation_policies:update",
      "cancellation_policies:delete",
      "current_bus_locations:create",
      "current_bus_locations:read",
      "current_bus_locations:update",
      "locations:read",
      "users:read",
      "payment_modes:read",
      "bookings:read",
      "bookings:update",
      "booking_seats:read",
      "booking_seats:update",
      "booking_passengers:read",
      "booking_passengers:update",
      "payments:read",
      "payments:update",
      "refunds:read",
      "refunds:update",
      "tickets:read",
      "reviews:read",
    ];
  
    for (const permission of operatorPermissions) {
      rolePermissions.push({
        role_id: roleMap.get("operator")!,
        permission_id: permissionMap.get(permission)!,
      });
    }
  
    // Crew permissions
    const crewPermissions = [
      "trips:read",
      "trips:update",
      "bookings:read",
      "booking_seats:read",
      "booking_passengers:read",
      "seat_inventory:read",
      "current_bus_locations:read",
      "current_bus_locations:update",
    ];
  
    for (const permission of crewPermissions) {
      rolePermissions.push({
        role_id: roleMap.get("crew")!,
        permission_id: permissionMap.get(permission)!,
      });
    }
  
    await prisma.role_permissions.createMany({
      data: rolePermissions,
      skipDuplicates: true,
    });
  
    console.log(
      `Created ${rolePermissions.length} role permissions`
    );
  }


async function createPermissions(){
    
    const permissiondata = RESOURCES.flatMap((resource)=>crud(resource)).map(name=>({name}));
    const permissions = await prisma.permissions.createMany({
       data:permissiondata,
       skipDuplicates:true
    })
}

async function createRoles(){
    const roles = await prisma.roles.createMany({
        data:ROLE_NAMES.map(name=>({name}))
    })
}
async function main(){
    await createRoles();
    await createPermissions();
    await seedRolePermissions();


}

main()
.then(async()=>{
    console.log(`Seeding done`)
    await prisma.$disconnect();
    await pool.end();
})
.catch(async(e)=>{
    console.log(`Seeding failed Error : ${e}`)
    await prisma.$disconnect();
    await pool.end();
    process.exit(1)
})