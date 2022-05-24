const rulesForm: RulesGlobal = {
  emailRules: [
    {
      type: 'required', message: '电子邮箱不能为空'
    },
    {
      type: 'email', message: '请输入正确的电子邮箱格式'
    },
    { type: 'range', min: { message: '你的邮箱至少包括六位，不能含有空格', length: 6 }, max: { message: '你的邮箱最多包括20位，不能含有空格', length: 20 } }
  ],
  psdWordRules: [
    { type: 'required', message: '密码不为空' },
    { type: 'range', min: { message: '你的密码至少包括六位，不能含有空格', length: 6 } }
  ],
  nameRules: [
    {
      type: 'range', min: { message: '请至少输入三位字符', length: 3 }
    },
    { type: 'required', message: '密码不为空' }
  ],
}
type Optional = {
  message: string,
  length: number
}
export interface RulesGlobal {
  emailRules: RulesProps,
  psdWordRules: RulesProps,
  nameRules: RulesProps
}
interface RuleProp {
  type: 'required' | 'email' | 'range' | 'custom';
  message?: string,
  min?: Optional
  max?: Optional,
  vaildator?: () => boolean
}
export type RulesProps = RuleProp[]
export type TagType = 'input' | 'textarea'
export default rulesForm
