export default class SuccessResponse<T = any> {

  statusCode = 200
  message = 'success'
  data: T
  constructor(data: T, message = 'success') {
    this.data = data
    this.message = message
  }
}