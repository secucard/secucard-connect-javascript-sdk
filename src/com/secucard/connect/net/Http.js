import Request from 'superagent'
import _ from 'lodash'
export class Http {
  constructor() {
    this.request = Request
  }
  post(url, options={send:{}}) {
    var request = this.request
      .post(url)
      .type("json")
      .set('Accept', 'application/json')
      .send(options.send)

    _.forEach(options.set, (set) =>  {
      request.set(set.label, set.value)
    })
   return new Promise((resolve, reject) => {
        request.end( (err, res) =>{
          if (err) {
            reject(err.response)
          } else {
            resolve(res.body)
          }
        })
      }
    )
  }
}