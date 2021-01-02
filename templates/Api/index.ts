import ApiBase from 'Api/base/apiBase'
import * as Params from './params'
import * as Response from './responses'

export default class {{ApiName}} extends ApiBase {
  getData = (params: Params.TypeA) => {
    return this.post<Response.GetData>('/getdata', params)
  }
}
