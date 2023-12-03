export interface IFormData {
  name: string,
  age: number,
  email: string,
  firstPassword: string,
  secondPassword: string,
  gender: string,
  country: string,
  accept?: boolean,
  image?: FileList,
  imageBase64?: string,
  imageName?: string,
}