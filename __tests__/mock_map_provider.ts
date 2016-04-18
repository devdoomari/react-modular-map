import {
  Promise,
} from 'q';

class MockMapProvider extends BaseMapProvider {
  // pass.
  constructor() {

  }
  init = () => {
    return Promise<any>((resolve, reject)=> {
      resolve('wow');
    })
  }
}
