import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const header = req.headers["x-ms-client-principal"];
    
    if (!header) {
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 400,
            body: null,
            isRaw: true,
            };
        return;
    }
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.toString("ascii");
  
    const headerID = req.headers["x-ms-client-principal-id"];
    const headerName = req.headers["x-ms-client-principal-name"];

    context.res = {
      body: {
        clientPrincipal: JSON.parse(decoded)
        , id: headerID
        , name: headerName
      }
    };

    
    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    // };

};

export default httpTrigger;