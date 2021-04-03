import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUserById, getUsers } from "../dao/user-service";
import { Identity } from "../models/identity";
import { authHasRole, FailDueToAuth, ValidateAuth } from "../utils/validate-auth";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const auth = ValidateAuth(req);
    if (!auth || !authHasRole(auth, 'ao_admin')) {
      FailDueToAuth(context);
      return;
    }

    let rtnData: Identity | Identity[] = null;
    const id = context.bindingData.id ? String(context.bindingData.id) : null;

    if (id) {
      rtnData = await getUserById(id);
    } else {
      rtnData = await getUsers();
    }
        
    context.res = {
      headers: {
          'Content-Type': 'application/json'
      },
      status: 200,
      body: rtnData,
      isRaw: true,
    };
    
    
};

export default httpTrigger;