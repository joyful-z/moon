import {onRequest} from './functions/api/[endpoint].js';

export default {
  async fetch(request,env){
    const pathname=new URL(request.url).pathname;
    if(pathname.startsWith('/api/'))return onRequest({request,env});
    return env.ASSETS.fetch(request);
  }
};
