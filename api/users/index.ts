import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUserById, getUsers, insertUser, removeUser } from "../dao/user-service";
import { Identity } from "../models/identity";
import { Person } from "../models/person";
import { authHasRole, FailDueToAuth, ValidateAuth } from "../utils/validate-auth";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const auth = ValidateAuth(req);
    if (!auth || !authHasRole(auth, 'ao_admin')) {
      FailDueToAuth(context);
      return;
    }
    let statusCode = 500;
    let rspBody: any = null;
    
    switch(req.method) {
      case 'GET':
        [statusCode, rspBody] = await get(context);
        break;
      case 'POST':
        [statusCode, rspBody] = await post(context, req);
        break;
      case 'DELETE':
        [statusCode, rspBody] = await deleteUser(context);
        break;
      default: 
        throw `unknown method ${req.method} - how the heck did you get here?`
    }

    context.res = {
      headers: {
          'Content-Type': 'application/json'
      },
      status: statusCode,
      body: rspBody,
      isRaw: true,
    };
    
    
};

async function get(context: Context): Promise<[number, any]> {
  const id = context.bindingData.id ? String(context.bindingData.id) : null;

  let rtnData: Identity | Identity[] = null;
  if (id) {
    rtnData = await getUserById(id);
  } else {
    rtnData = await getUsers();
  }
  return [200, rtnData];
}

async function post(_: Context, req: HttpRequest): Promise<[number, any]> {
  const body: Person = req.body;
  
  const newID = await insertUser(body);
  body._id = newID;
  return [201, body];
}

async function deleteUser(context: Context): Promise<[number, any]> {
  const id = context.bindingData.id ? String(context.bindingData.id) : null;
  if (!id) {
    return [404, null];
  }
  const status = await removeUser(id);
  return [(status ? 410 : 500), null];
}

export default httpTrigger;