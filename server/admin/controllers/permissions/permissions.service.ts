import { Permissions } from "admin/models";
import {
    TListFilters,
} from "admin/controllers/permissions/permissions.types";

export default class PermissionsService {
    static async getPermissions(data: TListFilters) {
        const obj = new Permissions();
        const response = await obj.getPermissions(data);
        return response;
    }
}
