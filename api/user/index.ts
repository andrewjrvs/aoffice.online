import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUserAccountByAuth } from "../dao/user-service";
import { FailDueToAuth, ValidateAuth } from "../utils/validate-auth";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const auth = ValidateAuth(req);
    if (!auth) {
      FailDueToAuth(context);
      return;
    }

    // get user details from database
    context.res = getUserAccountByAuth(auth);
};

export default httpTrigger;