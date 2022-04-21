type userID = {
  avatar: string,
billingID: string
city: string,
cloudinary_id:string,
date: string,
discipline: Array<string>,
email:string,
endDate: string,
firstName:string,
lastName: string,
password: string,
plan: string,
postalCode: string,
_id: string

}

export default interface getTeamsTypes {
  clubName: string,
  discipline:Array<string>,
  description: {
    type: string,
    required: true,
    min: 3,
    max: 100,
  },
  emailContact:string,
  logo: string,
  city:string,
  latitude: string,
  longitude: string,
  address:string,
  postalCode: string,
  county:string,
  number:string,
  kids: boolean,
  userId: Array<userID>,
  slug: string,
  cloudinary_id: string,
  schedule: string,
  price:string,
}
