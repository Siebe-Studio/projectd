
import VehicleTable from "~/components/voertuigen/VehicleTables";
import { CreateVehicle } from "~/components/voertuigen/CreateVehicle";
import { RemoveVehicle } from "~/components/voertuigen/RemoveVehicle";
import { EditVehicle } from "~/components/voertuigen/EditVehicle";
export default async function Voertuigen() {
    return (
        <div className="w-full flex-col flex gap-4 px-3">
            <div className="w-full flex gap-2">
            <CreateVehicle/>
            <RemoveVehicle/>
            <EditVehicle/>
            </div>
            <VehicleTable/>
        </div>
    );
}