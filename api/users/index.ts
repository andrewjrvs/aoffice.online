import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUsers } from "../dao/user-service";
import { authHasRole, FailDueToAuth, ValidateAuth } from "../utils/validate-auth";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const auth = ValidateAuth(req);
    if (!auth || !authHasRole(auth, 'ao_admin')) {
      FailDueToAuth(context);
      return;
    }

    const rtnData = await getUsers(auth);
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