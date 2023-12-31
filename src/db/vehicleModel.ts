'use server'

import {Vehicle, vehicles} from "./schema";
import db from "./dbSetup";
import {inArray} from "drizzle-orm";

//index by group?
export default function findAllVehicles(): Promise<Vehicle[]> {
    return db.select().from(vehicles)
}