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
    const rtnData = await getUserAccountByAuth(auth);
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