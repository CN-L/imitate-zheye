export interface TestProps {
  _id: string;
  name: string
}
const testData: TestProps[] = [
  {
    _id: '1',
    name: 'a'
  },
  {
    _id: '2',
    name: 'b'
  }
]
export const arrToObj = <T extends {_id?: string}>(arr: Array<T>) => arr.reduce((pre, current) => {
  if(current._id) {
    pre[current._id] = current
  }
  return pre
}, {} as {[
    val: string
  ]: T})
// 以下写法key是可变的类型
export const objToarr = <T>(obj: {[key: string] : T}) => Object.keys(obj).map(key => obj[key])

/*
 * const testData2: {[key: string]: TestProps]} = {
 *   1: {_id: '1', name: 'a'},
 *   2: {_id: '2', name: 'b'}
 * }
 */
