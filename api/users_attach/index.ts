import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { assignAuthToUser, unassignAuthFromUser } from "../dao/user-service";
import { Identity } from "../models/identity";
import { authHasRole, FailDueToAuth, ValidateAuth } from "../utils/validate-auth";

function finishEmptyContextWithStatus(context: Context, status: number): void {
  context.res = {
    headers: {
        'Content-Type': 'application/json'
    },
    status: status,
    body: null,
    isRaw: true,
  };
  
}


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const auth = ValidateAuth(req);
    if (!auth || !authHasRole(auth, ['ao_admin', 'ao_assignable'])) {
      FailDueToAuth(context);
      return;
    }

    const id = context.bindingData.id ? String(context.bindingData.id) : null;
    const _type = context.bindingData.type ? String(context.bindingData.type) : null;

    if (!id || (req.method === "DELETE" && !_type)) {
      finishEmptyContextWithStatus(context, 404);
      context.done();
      return;
    }

    let rtnStatus = 400;
    switch (req.method) {
      case "DELETE":
        if (!authHasRole(auth, ['ao_admin'])) {
          finishEmptyContextWithStatus(context, 400);
          context.done();
          return;
        }
        if (await unassignAuthFromUser(id, _type)) {
          rtnStatus = 410;
        }
        break;
      case "PUT":
        if (await assignAuthToUser(id, auth)) {
          rtnStatus = 204
        }
        break;
      default:
        throw `Unknown method ${req.method}`;
    }

    finishEmptyContextWithStatus(context, rtnStatus);
    
};

export default httpTrigger;