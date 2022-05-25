import createMessage from '@/hooks/createMessage'
// 通用的东西
interface Checkcondiction {
  format?: string[],
  size?: number
}
type ImgStatus = 'format' | 'size' | 'null'
const beforeUpload = (file: File, condiction: Checkcondiction) => {
  const { format, size } = condiction
  const isValidateFormat = format ? format.includes(file.type) : true
  const isValidateSize = size ? (file.size / 1024 / 1024) < size : true
  let errorType: ImgStatus = 'null'
  if(!isValidateFormat) {
    errorType = 'format'
  } else if(!isValidateSize) {
    errorType = 'size'
  }
  return {
    passed: isValidateFormat && isValidateSize,
    errorType
  }
}
export default beforeUpload
