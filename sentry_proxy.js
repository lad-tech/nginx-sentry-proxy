async function proxyQuery(r) {
  try{

    if (r.method !== "POST"){
      r.headersOut['Content-Type'] = "text/plain";
      r.return(400, `${r.method} not allowed`);
      return;
    }
    if(!r.requestText ||!r.requestText.length){
      r.headersOut['Content-Type'] = "text/plain";
      r.return(400, `Payload required`);
      return;
    }
    const reqData = r.requestText.split('\n');
    const reqSentryHeaders = JSON.parse(reqData[0])
    if ('dsn' in reqSentryHeaders) {
      r.headersOut['Content-Type'] = "application/json";
      const protocol = reqSentryHeaders.dsn.split('://')[0];
      const domain = reqSentryHeaders.dsn.split('@')[1];
      const data = domain.split('/');

      if (protocol.length && data[0].length & data[1].length){
        const sentryIngestURL = `${protocol}://${data[0]}/api/${data[1]}/envelope/`;

        let backend_reply = await ngx.fetch(sentryIngestURL, {
          method:'POST',
          body:r.requestText
        });
        let body = await backend_reply.text().catch(err=>{
          r.return(200,'2-->'+JSON.stringify(err));
        });

        return  r.return(backend_reply.status,body );
      }




    }
    r.headersOut['Content-Type'] = "text/plain";
    r.return(200,'empty or undefined dsn field ');

  }catch (e) {
    r.headersOut['Content-Type'] = "text/plain";
    r.return(500,e.message || 'unknown error');
  }

}

export default { proxyQuery };
