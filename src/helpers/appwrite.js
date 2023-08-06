import { Account, Client, Databases, ID } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("64cd07380dc5e583fa57"); // Your project ID

const account = new Account(client); //creating account
const databases=new Databases(client);
const getCurrentUser=async()=>{
   const promise=account.get();
   const result= promise
   .then((user)=>{
    return user;
   }).catch(()=>{
    return null
  });
  return result;
}
const addcodeDropToDB=async(codeDropData)=>{
  const user=await getCurrentUser();
  if(!user){
    return null;
  }
  //as per appwrite documentation
  const promise=databases.createDocument('64ce4b1f184498131289', //database id
   '64ce4b27947a60b741b5',  //collections id
   ID.unique(),   //document id, since every document will be different
    {
      ...codeDropData,
      owner:user.$id,
    }
  );
 const result= promise.then(response=>response).catch(()=>null);
 return result;
};
export { client, account, addcodeDropToDB, databases, getCurrentUser};
